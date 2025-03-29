import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, Platform, PermissionsAndroid, Alert } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Icon } from 'react-native-elements';
import { useRouter, useLocalSearchParams, router } from 'expo-router';
import * as Location from 'expo-location';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "@/view-model/AuthContext";

interface Location {
  latitude: number;
  longitude: number;
}

interface TripDetails {
  bookingId: string;
  departureId: string;
  destinationId: string;
  departureName: string;
  destinationName: string;
  ride: string;
}

// hooks/useCurrentLocation.ts
const useCurrentLocation = () => {
  const [location, setLocation] = useState<Location>({
    latitude: 10.7382,
    longitude: 106.6654,
  });

  const getCurrentLocation = async () => {
    try {
      // Xin quyền
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Lỗi', 'Ứng dụng cần quyền truy cập vị trí để hoạt động!');
        return;
      }
  
      // Lấy vị trí
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
  
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
  
    } catch (err) {
      console.error('Error getting location:', err);
      Alert.alert('Lỗi', 'Không thể lấy vị trí của bạn.');
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  return location;
};

// components/Map.tsx
interface MapProps {
  location: Location;
}

const Map: React.FC<MapProps> = ({ location }) => {
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    mapRef.current?.animateToRegion(
      {
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  }, [location]);

  return (
    <MapView
      ref={mapRef}
      style={styles.map}
      showsUserLocation={true}
      // initialRegion={{
      //   ...location,
      //   latitudeDelta: 0.02,
      //   longitudeDelta: 0.02,
      // }}
      region = {{
        ...location,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
    
      <Marker 
      coordinate={location} 
      title="Vị trí của bạn">
        <Icon name="my-location" color="red" size={24} />
      </Marker>
      <Circle
        center={location}
        radius={50}
        fillColor="rgba(0, 150, 255, 0.2)"
        strokeColor="rgba(0, 150, 255, 0.5)"
      />
    </MapView>
  );
};

// components/TripInfo.tsx
interface TripInfoProps {
  tripDetails: TripDetails;
}

const TripInfo: React.FC<TripInfoProps> = ({ tripDetails }) => {
  const { departureName, destinationName, bookingId } = tripDetails;

  console.log("bookingId ", bookingId);
  
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Đang tìm tài xế</Text>
        <Text style={styles.statusSubText}>
          Đang kết nối với tài xế xung quanh...
        </Text>
        <ActivityIndicator size="large" color="#007AFF" style={styles.loading} />
      </View>

      <View style={styles.tripDetails}>
        <Text style={styles.tripTitle}>Chuyến đi</Text>
        <Text style={styles.tripTime}>30/12/2024 - 03:13</Text>
        <Text style={styles.tripId}>
          Mã chuyến đi: <Text style={styles.tripIdHighlight}>{bookingId}</Text>
        </Text>

        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <Icon name="location-on" size={20} color="#000" />
            <Text style={styles.locationText}>{departureName}</Text>
          </View>
          <View style={styles.locationRow}>
            <Icon name="place" size={20} color="#f4a460" />
            <Text style={styles.locationText}>{destinationName}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// screens/FindingDriverScreen.tsx
const FindingDriverScreen: React.FC = () => {
  const params = useLocalSearchParams();
  const location = useCurrentLocation();

  const [countdown, setCountdown] = useState(5);
  const [driverFound, setDriverFound] = useState(false);
  const [BookingConfirmation, setBookingConfirmation] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const bookingId = params.bookingId;
  const userId = params.userId;
  
  const tripDetails: TripDetails = {
    bookingId: bookingId,
    departureId: params.departure_id,
    destinationId: params.destination_id,
    departureName: params.departure_name,
    destinationName: params.destination_name,
    ride: params.ride,
  };


  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCountdown((prev) => {
  //       if (prev === 1) {
  //         clearInterval(interval); // Dừng bộ đếm khi hết giờ
  //         setDriverFound(true); // Đặt trạng thái driverFound thành true
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   // Dọn dẹp interval khi component unmount
  //   return () => clearInterval(interval);
  // }, []);

  const connectWebSocket = () => {
    console.log("Connecting to WebSocket...");

    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("WebSocket Debug:", str),
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      // Subscribe to the topic for booking confirmation
      client.subscribe("/topic/user/" + userId + "/booking-accepted", (message: IMessage) => {
        console.log("Booking confirmation received:", message.body);

        // const confirmation: BookingConfirmation = JSON.parse(message.body);
        const confirmation = JSON.parse(message.body);

        console.log("confirmation", confirmation);
        setDriverFound(true);

        // Save booking confirmation and show modal
        setBookingConfirmation(confirmation);
        setIsModalVisible(true);
      });
    };

    client.onStompError = (frame) => {
      console.error("WebSocket Error:", frame.headers["message"]);
    };

    client.onWebSocketClose = (event) => {
      console.log("WebSocket Closed:", event);
    };

    client.onWebSocketError = (event) => {
      console.log("WebSocket Error Event:", event);
    };

    client.activate();
  };

  useEffect(() => {
    console.log("sap connectWebSocket ")
    if (userId) {
    connectWebSocket();
    }
    return () => {
      // Cleanup WebSocket connection when component unmounts
      // client.deactivate(); // Nếu cần giữ client ở ngoài useEffect
    };
    
  }, []);

  useEffect(() => {
    if (driverFound) {
      router.push({
        pathname: "/trip",
        params: {
          userId: userId,
          tripDetails: JSON.stringify(tripDetails),
          driver_name: 'Nguyen Phuc',
          driver_phone: '0123456789',
          licence_plate: '51A-12345',
        },
      });
    }
  }, [driverFound]);

  return (
    <View style={styles.container}>
      <Map location={location} />
      <TripInfo tripDetails={tripDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  statusSubText: {
    fontSize: 14,
    color: 'gray',
  },
  loading: {
    marginTop: 10,
  },
  tripDetails: {
    paddingHorizontal: 10,
  },
  tripTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  tripTime: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  tripId: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  tripIdHighlight: {
    fontWeight: 'bold',
    color: 'black',
  },
  locationContainer: {
    marginTop: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default FindingDriverScreen;