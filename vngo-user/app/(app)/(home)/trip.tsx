import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SOCKET_URL } from "@/view-model/AuthContext";

const DriverArrivalScreen = () => {

  const router = useRouter();

  const { userId, tripDetails, driver_name, driver_phone, licence_plate } = useLocalSearchParams();

  const [countdown, setCountdown] = useState(5);
  const [driverCome, setDriverCome] = useState(false);

  const [finish, setFinish] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Dừng bộ đếm khi hết giờ
          setDriverCome(true); // Đặt trạng thái driverFound thành true
        }
        return prev - 1;
      });
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(interval);
  }, []);

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
      client.subscribe("/topic/user/" + userId + "/booking-finished", (message: IMessage) => {
        console.log("Booking confirmation received:", message.body);

        // const confirmation: BookingConfirmation = JSON.parse(message.body);
        const finish_mgs = JSON.parse(message.body);

        console.log("finish_mgs", finish_mgs);
        setFinish(true);

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
    if(finish) {
      router.push('/home');
    }
    
  }, [finish]);


  return (
    <SafeAreaView style={styles.container}>
      {/* Map View */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 10.762622, // Mock latitude
          longitude: 106.660172,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* User Location Marker */}
        <Marker
          coordinate={{
            latitude: 10.762622,
            longitude: 106.660172,
          }}
          title="Your Location"
        >
          <View style={styles.userMarker}>
            <Icon name="map-marker" size={24} color="#fff" />
          </View>
        </Marker>

        {/* Driver Marker */}
        <Marker
          coordinate={{
            latitude: 10.7629,
            longitude: 106.661,
          }}
          title="Driver"
        >
          <View style={styles.driverMarker}>
            <Icon name="car" size={24} color="#fff" />
          </View>
        </Marker>

        {/* Route Polyline */}
        <Polyline
          coordinates={[
            { latitude: 10.762622, longitude: 106.660172 },
            { latitude: 10.7629, longitude: 106.661 },
          ]}
          strokeColor="#00BFA6"
          strokeWidth={4}
        />
      </MapView>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {/* Safety Tag */}
        {/* <View style={styles.safeTag}>
          <Icon name="shield-check" size={18} color="#00BFA6" />
          <Text style={styles.safeText}>Safety Center</Text>
        </View> */}

        {/* Status Text */}
        {!driverCome &&
        <Text style={styles.arrivalText}>Bác tài dự kiến sẽ đến trong 5 phút</Text> }
        {driverCome &&
        <Text style={styles.driverArrivedText}>Bác tài đã đến</Text> }

        {/* Additional Details Button */}
        <TouchableOpacity
          style={styles.moreDetailsButton}
          onPress={() => router.push('../(activities)/ongoing/1')}
        >
          <Text style={styles.moreDetailsText}>View Details</Text>
        </TouchableOpacity>

        {/* Destination Info */}
        <Text style={styles.destination}>Van Hanh Mall</Text>

        {/* Driver Info */}
        <View style={styles.driverInfo}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.driverImage}
          />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>{driver_name}</Text>
            <Text style={styles.driverRating}>
              5.0 <Icon name="star" size={14} color="#FFD700" />
            </Text>
          </View>
          <View style={styles.vehicleInfo}>
            <Text style={styles.vehicleNumber}>51G-123.45</Text>
            <Text style={styles.vehicleDetails}>Red • Honda Stream</Text>
          </View>
        </View>

        {/* Price Info */}
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Trip Price</Text>
          <Text style={styles.priceValue}>₫150,000</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}
            onPress={() => {
              console.log("da bam");
              router.push('./chat/1');
            }}
          >
            <Icon name="chat-outline" size={24} color="#000" />
            <Text style={styles.actionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}
          onPress={() => router.push({ pathname: './call/1', 
          params: { driverName: driver_name, driverPhone: driver_phone } })}>
            <Icon name="phone" size={24} color="#000" />
            <Text style={styles.actionText}>Call</Text>
          </TouchableOpacity>
          {!driverCome &&
          <TouchableOpacity
            style={[styles.actionButton, styles.cancelButton]}
            onPress={() => alert("Trip Cancelled")}
          >
            <Icon name="close" size={24} color="#fff" />
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity> }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  userMarker: {
    backgroundColor: "#007AFF",
    padding: 8,
    borderRadius: 20,
  },
  driverMarker: {
    backgroundColor: "#FF3B30",
    padding: 8,
    borderRadius: 20,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  safeTag: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  safeText: {
    marginLeft: 8,
    color: "#00BFA6",
    fontWeight: "bold",
  },
  arrivalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  driverArrivedText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "green",
  },
  destination: {
    color: "#888",
    marginBottom: 16,
  },
  moreDetailsButton: {
    marginBottom: 8,
  },
  moreDetailsText: {
    color: "#007AFF",
    fontWeight: "bold",
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  driverRating: {
    color: "#FFD700",
    fontSize: 14,
  },
  vehicleInfo: {
    alignItems: "flex-end",
  },
  vehicleNumber: {
    fontWeight: "bold",
  },
  vehicleDetails: {
    color: "#888",
  },
  priceInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00BFA6",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
  },
  actionText: {
    marginLeft: 8,
    color: "#000",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#FF3B30",
  },
  cancelText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default DriverArrivalScreen;
