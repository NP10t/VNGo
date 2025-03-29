import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const CallScreen = () => {
  const router = useRouter();
  const searchParams = useLocalSearchParams();
  const { driverName, driverPhone, driverAvatar } = searchParams;

  const [callStatus, setCallStatus] = useState("Đang gọi...");

  // Giả lập trạng thái cuộc gọi
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus("Đang kết nối...");
    }, 3000);

    const connectedTimer = setTimeout(() => {
      setCallStatus("Đã kết nối");
    }, 6000);

    return () => {
      clearTimeout(timer);
      clearTimeout(connectedTimer);
    };
  }, []);

  const endCall = () => {
    setCallStatus("Cuộc gọi đã kết thúc");
    setTimeout(() => {
      router.back(); // Quay lại trang chính
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gọi tài xế</Text>
      </View>

      <View style={styles.driverInfo}>
        <Image
        source={{ uri: "https://i.pravatar.cc/300" }}
        style={styles.driverImage}
        />
        <Text style={styles.driverName}>{driverName}</Text>
        <Text style={styles.driverPhone}>{driverPhone}</Text>
        <Text style={styles.callStatus}>{callStatus}</Text>
        {callStatus === "Đang gọi..." && (
          <ActivityIndicator size="large" color="#4CAF50" />
        )}
      </View>

      <TouchableOpacity style={styles.endCallButton} onPress={endCall}>
        <Ionicons name="call" size={24} color="#fff" />
        <Text style={styles.endCallText}>Kết thúc cuộc gọi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  header: {
    width: "100%",
    padding: 15,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  driverInfo: {
    alignItems: "center",
    marginVertical: 20,
  },
  driverImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  driverName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  driverPhone: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  callStatus: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  endCallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF4C4C",
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "80%",
  },
  endCallText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default CallScreen;
