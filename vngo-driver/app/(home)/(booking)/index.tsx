import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { Client, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Modal from "react-native-modal";
import axios from "axios";
import { API_URL, useAuth } from "../../../context/AuthContext";

export interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface Booking {
  id: string;
  userId: string;
  driverId: string | null;
  pickupLocationId: string;
  destinationLocationId: string;
  estimatedPrice: number;
  finalPrice: number | null;
  pickupTime: string | null;
  completionTime: string | null;
  bookingStatus: string;
  cancellationReason: string | null;
}

const DEFAULT_REGION: Region = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const HomeScreen: React.FC = () => {
  const { authState } = useAuth();
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState<Region>(DEFAULT_REGION);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null); // Lưu thông tin booking hiện tại
  const [isModalVisible, setIsModalVisible] = useState(false); // Quản lý trạng thái modal

  const router = useRouter();

  const getCurrentLocation = async () => {
    try {
      setIsLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Quyền truy cập vị trí bị từ chối",
          "Vui lòng cấp quyền truy cập vị trí trong cài đặt để sử dụng tính năng này."
        );
        return;
      }

      const enabled = await Location.hasServicesEnabledAsync();
      if (!enabled) {
        Alert.alert(
          "GPS chưa bật",
          "Vui lòng bật GPS để lấy vị trí chính xác."
        );
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể lấy vị trí hiện tại. Vui lòng kiểm tra kết nối mạng và GPS."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const connectWebSocket = () => {
    console.log("Opening Web Socket...");
    const socket = new SockJS(`${API_URL}/ws`);

    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str) => console.log("WebSocket Debug:", str),
    });

    client.onConnect = () => {
      console.log("Connected to WebSocket");

      // Subscribe to the booking notifications topic
      client.subscribe("/topic/bookings", (message: IMessage) => {
        console.log("Subscription message received");
        const booking: Booking = JSON.parse(message.body);
        console.log("New booking received:", booking);

        // Lưu thông tin booking và hiển thị modal

        setCurrentBooking(booking);
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
    getCurrentLocation();
    connectWebSocket(); // Kết nối WebSocket khi component được mount

    // Cleanup khi component unmount
    return () => {
      // Đóng kết nối WebSocket khi component unmount
      // client.deactivate(); // Nếu bạn định lưu client ở ngoài useEffect
    };
  }, []);

  const handleConfirmBooking = async () => {
    if (!currentBooking) return;
    if (!authState?.token) {
      Alert.alert("Lỗi", "Không tìm thấy token xác thực.");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/bookings/${currentBooking.id}/accept`,
        {}, // empty body vì API chỉ cần bookingId
        {
          headers: {
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );

      if (response.data.code === 1000) {
        Alert.alert("Xác nhận", "Bạn đã nhận cuốc thành công!");
        setIsModalVisible(false);

        router.push({
          pathname: "./pickup",
          params: {
            bookingId: currentBooking.id,
          },
        });
        setCurrentBooking(null);
      } else {
        Alert.alert(
          "Lỗi",
          response.data.message || "Không thể xác nhận cuốc xe."
        );
      }
    } catch (err: any) {
      if (err.response) {
        console.error("Server Response Error:", err.response.data);
        Alert.alert(
          "Lỗi",
          `Không thể xác nhận cuốc xe: ${
            err.response.data?.message || "Không xác định"
          }`
        );
      } else if (err.request) {
        console.error("No Response Error:", err.request);
        Alert.alert(
          "Lỗi",
          "Không nhận được phản hồi từ server. Vui lòng thử lại."
        );
      } else {
        console.error("Unknown Error:", err.message);
        Alert.alert("Lỗi", `Đã xảy ra lỗi: ${err.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Google Map */}
      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={true}
            onRegionChangeComplete={(region) => setRegion(region)}
          >
            <Marker
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
              title="Vị trí hiện tại"
            />
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Đang tải vị trí...</Text>
        )}
      </View>

      {/* Modal thông báo nhận cuốc */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Có yêu cầu mới!</Text>
          {currentBooking && (
            <ScrollView>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>User ID:</Text>{" "}
                {currentBooking.userId}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Pickup Location ID:</Text>{" "}
                {currentBooking.pickupLocationId}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Destination Location ID:</Text>{" "}
                {currentBooking.destinationLocationId}
              </Text>
              <Text style={styles.modalText}>
                <Text style={styles.boldText}>Giá ước tính:</Text>{" "}
                {currentBooking.estimatedPrice.toLocaleString()} VND
              </Text>
            </ScrollView>
          )}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmBooking}
          >
            <Text style={styles.buttonText}>Xác nhận nhận cuốc</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 16,
    color: "#757575",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: "80%", // Giới hạn chiều cao của modal
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  confirmButton: {
    marginTop: 15,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
