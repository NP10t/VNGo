import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useRouter } from "expo-router"; // Assuming you're using Expo Router

const RideListScreen = () => {
  const [activeTab, setActiveTab] = useState("Đang diễn ra");
  const router = useRouter();

  const ongoingRides = [
    { id: "1", departure: "Trường Đại học khoa học tự nhiên", destination: "Phố đi bộ Nguyễn Huệ", time: "16:30", status: "Đang diễn ra" },
  ];

  const rideHistory = [
    { id: "3", departure: "Khu đô thi Sala Thành Phố Thủ ĐỨc", destination: "Bờ kè Thanh Đa",  time: "14:00", status: "Hoàn thành" },
    { id: "4", departure: "Nhà Thờ Đức Bà Quận 1", destination: "2225 Phạm Thế Hiển Phường 6 Quận 8 Tp. Hồ Chí Minh", time: "12:01", status: "Hoàn thành" },
  ];

  const handleRideItemSelect = useCallback((ride) => {
    if (activeTab === "Đang diễn ra") {
      router.push(`/ongoing/${ride.id}`); // Navigate to the ongoing ride details screen
    } else {
      router.push(`/history/${ride.id}`); // Navigate to the history ride details screen
    }
  }, [activeTab]);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { color: "green" };
      case "pending":
        return { color: "orange" };
      case "canceled":
        return { color: "red" };
      default:
        return { color: "gray" };
    }
  };

  const renderRideItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleRideItemSelect(item)} style={styles.rideItem}>
    <View style={styles.topRow}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Departure:</Text>
        <Text style={styles.location}>{item.departure}</Text>
      </View>
      <View style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Destination:</Text>
        <Text style={styles.location}>{item.destination}</Text>
      </View>
    </View>
    <View style={styles.bottomRow}>
      <Text style={styles.time}>{item.time}</Text>
      <Text style={[styles.status, getStatusStyle(item.status)]}>{item.status}</Text>
    </View>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Đang diễn ra" && styles.activeTab]}
          onPress={() => setActiveTab("Đang diễn ra")}
        >
          <Text style={[styles.tabText, activeTab === "Đang diễn ra" && styles.activeTabText]}>
            Đang diễn ra
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Lịch sử" && styles.activeTab]}
          onPress={() => setActiveTab("Lịch sử")}
        >
          <Text style={[styles.tabText, activeTab === "Lịch sử" && styles.activeTabText]}>
            Lịch sử
          </Text>
        </TouchableOpacity>
      </View>

      {/* Ride List */}
      <FlatList
        data={activeTab === "Đang diễn ra" ? ongoingRides : rideHistory}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#f8f8f8",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeTab: {
    backgroundColor: "#00C4CC",
    borderColor: "#00C4CC",
  },
  tabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
  },
  list: {
    padding: 10,
  },
  // rideItem: {
  //   padding: 15,
  //   backgroundColor: "#f0f0f0",
  //   marginBottom: 10,
  //   borderRadius: 10,
  // },
  // location: {
  //   fontSize: 16,
  //   fontWeight: "bold",
  // },
  // time: {
  //   fontSize: 14,
  //   color: "#555",
  //   marginVertical: 5,
  // },
  // status: {
  //   fontSize: 14,
  //   color: "#00C4CC",
  // },
  rideItem: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  topRow: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: "#555",
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  time: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default RideListScreen;
