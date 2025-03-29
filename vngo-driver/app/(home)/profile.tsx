import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ScrollView, // Thêm ScrollView để tránh bị che mất nội dung
} from "react-native";
import { API_URL, useAuth } from "../../context/AuthContext";
import axios from "axios";
import { router } from "expo-router";

// Interface phản ánh cấu trúc API response
interface DriverResponse {
  id?: string;
  phoneNumber: string;
  fullName: string;
  dateOfBirth: string;
}

interface ApiResponse<T> {
  message: any;
  code: number;
  result: T;
}

const ProfilePage = () => {
  const { authState, onLogout } = useAuth();
  const [profile, setProfile] = useState<DriverResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false); // Quản lý chế độ chỉnh sửa
  const [form, setForm] = useState<{
    phoneNumber: string;
    fullName: string;
    dateOfBirth: string;
  }>({
    phoneNumber: "",
    fullName: "",
    dateOfBirth: "",
  });

  const screenWidth = Dimensions.get("window").width;

  // Định dạng ngày tháng
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;
    // Chuyển đổi tháng từ số sang tên tiếng Việt nếu cần
    // 1-12 là tháng 1 đến tháng 12
    return `${parseInt(day)} tháng ${parseInt(month)} ${year}`;
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authState?.token) {
        setError("Không tìm thấy token xác thực.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get<ApiResponse<DriverResponse>>(
          `${API_URL}/drivers/my-info`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        if (response.data.code === 1000) {
          setProfile(response.data.result);
          setForm({
            phoneNumber: response.data.result.phoneNumber,
            fullName: response.data.result.fullName,
            dateOfBirth: response.data.result.dateOfBirth,
          }); // Gán dữ liệu vào form khi chỉnh sửa
        } else {
          setError("Lỗi không xác định từ server.");
          console.error("API Error Response:", response.data);
        }
      } catch (err: any) {
        console.error("Error Details:", err);

        if (err.response) {
          setError(err.response.data?.message || "Lỗi từ server.");
          console.error("Server Response Data:", err.response.data);
        } else if (err.request) {
          setError("Không nhận được phản hồi từ server. Vui lòng thử lại.");
          console.error("No Response Received:", err.request);
        } else {
          setError("Đã xảy ra lỗi. Vui lòng thử lại.");
          console.error("Other Error:", err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authState]);

  const handleSave = async () => {
    // Kiểm tra thông tin bắt buộc
    if (!form.fullName || !form.dateOfBirth) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      console.log("Sending data to API:", {
        fullName: form.fullName,
        dateOfBirth: form.dateOfBirth,
      });

      // Thực hiện cập nhật thông tin
      const response = await axios.put<ApiResponse<DriverResponse>>(
        `${API_URL}/${profile?.phoneNumber}`, // Sử dụng phoneNumber từ profile
        {
          fullName: form.fullName,
          dateOfBirth: form.dateOfBirth,
        },
        {
          headers: {
            Authorization: `Bearer ${authState?.token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.code === 1000) {
        Alert.alert("Thành công", "Thông tin cá nhân đã được cập nhật.");
        // Merge phoneNumber từ profile hiện tại nếu response không chứa phoneNumber
        const updatedProfile = {
          ...response.data.result,
          phoneNumber: profile?.phoneNumber || form.phoneNumber,
        };
        setProfile(updatedProfile); // Cập nhật lại thông tin hiển thị
        setEditMode(false); // Thoát chế độ chỉnh sửa
      } else {
        Alert.alert(
          "Lỗi",
          `Không thể cập nhật thông tin. Mã lỗi: ${response.data.code}, Thông báo: ${response.data.message}`
        );
        console.error("API Error Response:", response.data);
      }
    } catch (err: any) {
      if (err.response) {
        // Lỗi từ server
        console.error("Server Response Error:", err.response.data);
        Alert.alert(
          "Lỗi",
          `Không thể cập nhật thông tin: ${
            err.response.data?.message || "Không xác định"
          }`
        );
      } else if (err.request) {
        // Không có phản hồi từ server
        console.error("No Response Error:", err.request);
        Alert.alert(
          "Lỗi",
          "Không nhận được phản hồi từ server. Vui lòng thử lại."
        );
      } else {
        // Lỗi khác
        console.error("Unknown Error:", err.message);
        Alert.alert("Lỗi", `Đã xảy ra lỗi: ${err.message}`);
      }
    }
  };

  const handleLogout = async () => {
    if (onLogout) {
      Alert.alert(
        "Đăng xuất",
        "Bạn có chắc chắn muốn đăng xuất?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Đăng xuất",
            style: "destructive",
            onPress: async () => {
              await onLogout();
              router.push("/(auth)");
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Không có dữ liệu tài xế.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Thanh chứa hình ảnh */}
      <View style={[styles.header, { width: screenWidth }]}>
        <Image
          source={require("../../assets/images/go_ava.png")}
          style={styles.profileImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.greetingText}>Chào, {profile.fullName}! :D</Text>

      {editMode ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={form.fullName}
            onChangeText={(text) => setForm({ ...form, fullName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Ngày sinh (YYYY-MM-DD)"
            value={form.dateOfBirth}
            onChangeText={(text) => setForm({ ...form, dateOfBirth: text })}
          />
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditMode(false)}
            >
              <Text style={styles.cancelButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
          {/* Đặt nút đăng xuất ngay dưới nút chỉnh sửa thông tin khi ở chế độ chỉnh sửa */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Họ và tên:</Text>
            <Text style={styles.value}>{profile.fullName}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Số Điện Thoại:</Text>
            <Text style={styles.value}>{profile.phoneNumber}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.infoRow}>
            <Text style={styles.label}>Ngày Sinh:</Text>
            <Text style={styles.value}>{formatDate(profile.dateOfBirth)}</Text>
          </View>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setEditMode(true)}
          >
            <Text style={styles.buttonText}>Chỉnh sửa thông tin cá nhân</Text>
          </TouchableOpacity>
          {/* Đặt nút đăng xuất ngay dưới nút chỉnh sửa thông tin khi ở chế độ xem */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Đảm bảo ScrollView luôn mở rộng để chứa nội dung
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  header: {
    backgroundColor: "#264653",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Dành cho Android
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
    borderRadius: 50,
  },
  greetingText: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 12,
    textAlign: "center",
  },
  infoContainer: {
    marginTop: 24,
    flex: 1,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 1,
    textAlign: "right",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 8,
  },
  editContainer: {
    marginTop: 24,
    flex: 1,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16, // Tăng khoảng cách dưới nhóm nút
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Dành cho Android
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Dành cho Android
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Dành cho Android
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Dành cho Android
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default ProfilePage;
