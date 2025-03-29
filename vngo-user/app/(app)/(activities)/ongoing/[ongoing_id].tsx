import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";

export default function OngoingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.timeText}>19:06</Text>
          <Text style={styles.statusText}>Driver is on the way</Text>
          <Text style={styles.locationText}>Kos BSD</Text>
        </View>

        {/* Driver Info */}
        <View style={styles.driverInfo}>
          <Image
            source={{ uri: "https://via.placeholder.com/50" }}
            style={styles.driverImage}
          />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Galang Rangga Dilaga</Text>
            <Text style={styles.driverRating}>5.0 ⭐</Text>
            <Text style={styles.driverJoined}>Joined Jun 2023</Text>
            <Text style={styles.carDetails}>
              White Daihatsu Sigra • F 1140 FAW • GrabCar Hemat
            </Text>
            <Text style={styles.driverJourneyNote}>
              These are the early days of your driver's Grab journey!
            </Text>
          </View>
        </View>

        {/* Encouragement Note */}
        <View style={styles.encouragementBox}>
          <Text style={styles.encouragementText}>
            Encourage your driver to keep up the good work by giving 5-star ratings, badges, comments, or even tips.
          </Text>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentInfo}>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <Text style={styles.paymentLabel}>Cash</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Service</Text>
            <Text style={styles.paymentLabel}>GrabCar Hemat 6rb</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Category</Text>
            <Text style={styles.paymentLabel}>Personal</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.totalLabel}>Current Total</Text>
            <Text style={styles.totalAmount}>Rp27,500</Text>
          </View>
        </View>

        {/* Route Info */}
        <View style={styles.routeInfo}>
          <Text style={styles.routeText}>Starting Point: Piazza The Mozia</Text>
          <Text style={styles.routeText}>Destination: Universitas Prasetiya Mulya BSD</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatText}>Chat with Driver</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.callButton}>
            <Text style={styles.callText}>Call Driver</Text>
          </TouchableOpacity>
        </View>

        {/* Cancel Booking */}
        <TouchableOpacity style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  timeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  statusText: {
    fontSize: 16,
    color: "#555",
  },
  locationText: {
    fontSize: 14,
    color: "#888",
  },
  driverInfo: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  driverRating: {
    fontSize: 14,
    color: "#555",
  },
  driverJoined: {
    fontSize: 12,
    color: "#888",
  },
  carDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  driverJourneyNote: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 8,
  },
  encouragementBox: {
    backgroundColor: "#e6f7ff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  encouragementText: {
    fontSize: 14,
    color: "#007bff",
  },
  paymentInfo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: "#555",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  routeInfo: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  routeText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  chatButton: {
    backgroundColor: "#007bff",
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  chatText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  callButton: {
    backgroundColor: "#28a745",
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  callText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ff4d4f",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
