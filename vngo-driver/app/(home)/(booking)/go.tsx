import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline, Region } from "react-native-maps";
import axios from "axios";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { API_URL, useAuth } from "../../../context/AuthContext";
import PolylineDecoder from "@mapbox/polyline";

export const API_KEY = "AlzaSyyvH1149qgeoo1Xyvr6B3uhES5cYbQWfPv";

const GoRouteScreen = () => {
  const params = useLocalSearchParams();
  const bookingId = Array.isArray(params.bookingId)
    ? params.bookingId[0]
    : params.bookingId;

  const [pickupLocation, setPickupLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [destinationLocation, setDestinationLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [routePolyline, setRoutePolyline] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const router = useRouter();
  const { authState } = useAuth();

  useEffect(() => {
    if (bookingId) {
      fetchLocationsAndRoute();
    }
  }, [bookingId]);

  const fetchLocationsAndRoute = async () => {
    try {
      const booking = await fetchBooking(bookingId);

      const pickup = await fetchLocation(booking.pickupLocationId);
      setPickupLocation(pickup);

      const destination = await fetchLocation(booking.destinationLocationId);
      setDestinationLocation(destination);

      if (pickup && destination) {
        const polyline = await fetchRoute(
          pickup.latitude,
          pickup.longitude,
          destination.latitude,
          destination.longitude
        );

        const decodedPolyline = PolylineDecoder.decode(polyline).map(
          ([latitude, longitude]) => ({ latitude, longitude })
        );
        setRoutePolyline(decodedPolyline);
      }
    } catch (error) {
      console.error("Error fetching locations and route:", error);
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

  const fetchLocation = async (locationId: string) => {
    const response = await axios.get(`${API_URL}/locations/${locationId}`);
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

  const handleFinish = async () => {
    try {
      const response = await axios.put(
        `${API_URL}/bookings/${bookingId}/finish`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      if (response.data.code === 1000) {
        Alert.alert("Thông báo", "Bạn đã hoàn thành chuyến xe!");
        router.replace("/(home)/(booking)");
      } else {
        Alert.alert("Lỗi", response.data.message || "Không thể xác nhận.");
      }
    } catch (err) {
      Alert.alert("Lỗi", "Không thể gửi xác nhận. Vui lòng thử lại.");
    }
  };

  return (
    <View style={styles.container}>
      {pickupLocation && destinationLocation ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: pickupLocation.latitude,
            longitude: pickupLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          showsUserLocation={true}
        >
          <Marker
            coordinate={pickupLocation}
            title="Điểm đón"
            pinColor="blue"
          />
          <Marker
            coordinate={destinationLocation}
            title="Điểm đến"
            pinColor="red"
          />
          {routePolyline.length > 0 && (
            <Polyline
              coordinates={routePolyline}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Đang tải tuyến đường...</Text>
      )}
      <TouchableOpacity style={styles.arrivedButton} onPress={handleFinish}>
        <Text style={styles.arrivedButtonText}>Xác nhận hoàn thành</Text>
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

export default GoRouteScreen;
