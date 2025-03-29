import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { API_URL, useAuth } from "../../../context/AuthContext";
import PolylineDecoder from "@mapbox/polyline";

export const API_KEY = "AlzaSyyvH1149qgeoo1Xyvr6B3uhES5cYbQWfPv";

const PickupRouteScreen = () => {
  const params = useLocalSearchParams();
  const bookingId = Array.isArray(params.bookingId)
    ? params.bookingId[0]
    : params.bookingId;

  const [currentBooking, setCurrentBooking] = useState(null);
  const [currentLocation, setCurrentLocation] = useState<Region | null>(null);
  const [pickupLocation, setPickupLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [routePolyline, setRoutePolyline] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Quyền vị trí bị từ chối",
          "Vui lòng cấp quyền sử dụng vị trí."
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lấy vị trí hiện tại.");
    }
  };

  useEffect(() => {
    if (bookingId) {
      fetchBookingAndRoute();
    }
  }, [bookingId, currentLocation]);

  const fetchBookingAndRoute = async () => {
    try {
      const booking = await fetchBooking(bookingId);
      setCurrentBooking(booking);

      const pickup = await fetchPickupLocation(booking.pickupLocationId);
      setPickupLocation(pickup);

      if (currentLocation && pickup) {
        const polyline = await fetchRoute(
          currentLocation.latitude,
          currentLocation.longitude,
          pickup.latitude,
          pickup.longitude
        );

        const decodedPolyline = PolylineDecoder.decode(polyline).map(
          ([latitude, longitude]) => ({ latitude, longitude })
        );
        setRoutePolyline(decodedPolyline);
      }
    } catch (error) {
      console.error("Error fetching booking and route:", error);
    }
  };

  const fetchBooking = async (bookingId: string) => {
    const response = await axios.get(`${API_URL}/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${authState?.token}`,
      },
    });
    return response.data.result;
  };

  const fetchPickupLocation = async (pickupLocationId: string) => {
    const response = await axios.get(
      `${API_URL}/locations/${pickupLocationId}`
    );
    return response.data.result;
  };

  const fetchRoute = async (
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number
  ) => {
    const response = await axios.post(
      `https://routes.gomaps.pro/directions/v2:computeRoutes`,
      {
        origin: {
          location: {
            latLng: {
              latitude: latitude1,
              longitude: longitude1,
            },
          },
        },
        destination: {
          location: {
            latLng: {
              latitude: latitude2,
              longitude: longitude2,
            },
          },
        },
        travelMode: "DRIVE",
        routingPreference: "TRAFFIC_AWARE",
        computeAlternativeRoutes: false,
        routeModifiers: {
          avoidTolls: false,
          avoidHighways: false,
          avoidFerries: false,
        },
        languageCode: "en-US",
        units: "IMPERIAL",
      },
      {
        headers: {
          "x-goog-api-key": API_KEY,
        },
      }
    );
    return response.data.routes[0].polyline.encodedPolyline;
  };

  const handleConfirmArrival = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/bookings/${bookingId}/pickup`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (response.data.code === 1000) {
        Alert.alert("Thông báo", "Bạn đã đến điểm đón thành công!");
        router.push({
          pathname: "./go",
          params: {
            bookingId: bookingId,
          },
        });
      } else {
        Alert.alert("Lỗi", response.data.message || "Không thể xác nhận.");
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể gửi xác nhận. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      {currentLocation ? (
        <MapView
          style={styles.map}
          initialRegion={currentLocation}
          showsUserLocation={true}
        >
          {pickupLocation && (
            <Marker
              coordinate={pickupLocation}
              title="Điểm đón"
              pinColor="blue"
            />
          )}
          {routePolyline.length > 0 && (
            <Polyline
              coordinates={routePolyline}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Đang tải vị trí...</Text>
      )}
      <TouchableOpacity
        style={styles.arrivedButton}
        onPress={handleConfirmArrival}
      >
        <Text style={styles.arrivedButtonText}>Xác nhận đã đến điểm đón</Text>
      </TouchableOpacity>
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
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#757575",
  },
  arrivedButton: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  arrivedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PickupRouteScreen;
