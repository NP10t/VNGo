import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RideDetailScreen = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmitFeedback = () => {
    if (rating === 0) {
      Alert.alert("Thông báo", "Vui lòng chọn số sao để đánh giá!");
    } else {
      Alert.alert("Cảm ơn bạn!", "Đánh giá của bạn đã được gửi.");
      setRating(0);
      setFeedback("");
    }
  };

  const handleReportIssue = () => {
    Alert.alert("Báo cáo sự cố", "Vui lòng liên hệ tổng đài để được hỗ trợ.");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.driverImage}
        />
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>Nguyễn Văn Phụng</Text>
          <Text style={styles.driverDetails}>
            50H-464.13 | VFE34 | XANH NGỌC LAM
          </Text>
          <Text style={styles.rating}>⭐ 5.0</Text>
        </View>
      </View>

      {/* Chuyến đi */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Chuyến đi</Text>
        <Text style={styles.detailText}>🕒 12/12/2024 - 16:15</Text>
        <Text style={styles.detailText}>
          🏠 Từ: Tòa C - Chung Cư Green River, 2225 Phạm Thế Hiển, Quận 8
        </Text>
        <Text style={styles.detailText}>
          📍 Đến: Cổng D6 (Vietjet) - Ga Đi Quốc Nội, Quận Tân Bình
        </Text>
        <Text style={styles.detailText}>📏 Khoảng cách: 12,02 Km</Text>
      </View>

      {/* Thanh toán */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Thông tin thanh toán</Text>
        <Text style={styles.detailText}>💸 Giá cước: 153.000đ</Text>
        <Text style={styles.detailText}>➕ Dịch vụ cộng thêm: 2.000đ</Text>
        <Text style={styles.detailText}>🎁 Ưu đãi: -30.000đ</Text>
        <Text style={styles.detailText}>💰 Tổng thanh toán: 125.000đ (Tiền mặt)</Text>
        <TouchableOpacity
          style={styles.reportButton}
          onPress={() => Alert.alert("Chi tiết", "Chi tiết thanh toán đang xử lý.")}
        >
          <Text style={styles.reportButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>

      {/* Đánh giá tài xế */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Đánh giá tài xế</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={30}
                color="#FFD700"
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Nhận xét về tài xế..."
          value={feedback}
          onChangeText={setFeedback}
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
          <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
        </TouchableOpacity>
      </View>

      {/* Báo cáo sự cố */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.reportButton} onPress={handleReportIssue}>
          <Text style={styles.reportButtonText}>Báo cáo sự cố</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  driverDetails: {
    fontSize: 16,
    color: "#555",
  },
  rating: {
    fontSize: 16,
    color: "#00C4CC",
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  detailText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  star: {
    marginHorizontal: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#00C4CC",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  reportButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default RideDetailScreen;
