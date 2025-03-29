// import { View, Text, TouchableOpacity } from 'react-native';
// import { router } from 'expo-router';

// export default function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Profile Screen</Text>
//       <TouchableOpacity
//         onPress={() => router.replace('/login')}
//         style={{ marginTop: 16, backgroundColor: 'red', padding: 16, borderRadius: 8 }}
//       >
//         <Text style={{ color: 'white' }}>Logout</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import { API_URL } from '@/view-model/AuthContext';

// interface ProfileData {
//   id?: string;
//   profileImage: string;
//   fullName: string;
//   phoneNumber: string;
// }

// export default function Profile() {
//   const router = useRouter();
//   const {
//     profileImage: newProfileImage,
//     fullName: newFullName,
//     phoneNumber: newPhoneNumber,
//   } = useLocalSearchParams();
//   const [profileImage, setProfileImage] = useState(
//     require('@/assets/images/profile.png')
//   );
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log('Fetching profile data...');
//         const response = await axios.get(`${API_URL}/my-info`);
//         const data: ProfileData = response.data;

//         setProfileImage(data.profileImage ? { uri: data.profileImage } : require('@/assets/images/profile.png'));
//         setFullName(data.fullName || '');
//         setPhoneNumber(data.phoneNumber || '');
//       } catch (error) {
//         console.error('Error fetching profile data:', error);
//         setError('Error fetching profile data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (newProfileImage) {
//       setProfileImage({ uri: newProfileImage });
//     }
//     if (newFullName) {
//       if (typeof newFullName === 'string') {
//         setFullName(newFullName);
//       }
//     }
//     if (newPhoneNumber) {
//       if (typeof newPhoneNumber === 'string') {
//         setPhoneNumber(newPhoneNumber);
//       }
//     }
//   }, [newProfileImage, newFullName, newPhoneNumber]);

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#1E90FF" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.userInfo}>
//         <Image source={profileImage} style={styles.avatar} />
//         <Text style={styles.greeting}>Chào, {fullName} :D</Text>

//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Họ và tên</Text>
//           <Text style={styles.value}>{fullName}</Text>
//         </View>

//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Số điện thoại</Text>
//           <Text style={styles.value}>{phoneNumber}</Text>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() =>
//             router.push({
//               pathname: '/changeAccountInfo',
//               params: { profileImage: profileImage.uri, fullName: fullName, phoneNumber: phoneNumber },
//             })
//           }
//         >
//           <Text style={styles.buttonText}>Chỉnh sửa thông tin cá nhân</Text>
//           <Ionicons name="chevron-forward" size={20} color="#777" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Ngôn ngữ</Text>
//           <Ionicons name="chevron-forward" size={20} color="#777" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.logoutContainer}>
//         <TouchableOpacity
//           style={styles.logoutButton}
//           onPress={() => router.replace('/login')}
//         >
//           <Text style={styles.logoutButtonText}>Đăng xuất</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5', // Light gray background
//     justifyContent: 'space-between',
//   },
//   userInfo: {
//     alignItems: 'center',
//     padding: 16,
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 16,
//   },
//   greeting: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginBottom: 8,
//   },
//   label: {
//     color: '#777',
//   },
//   value: {
//     fontWeight: 'bold',
//   },
//   button: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '80%',
//     padding: 16,
//     backgroundColor: 'white',
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   buttonText: {
//     fontSize: 16,
//   },
//   logoutContainer: {
//     padding: 16,
//     width: '100%',
//     alignItems: 'center',
//   },
//   logoutButton: {
//     backgroundColor: '#d9534f', // Red color for logout
//     padding: 16,
//     borderRadius: 8,
//     width: '80%',
//   },
//   logoutButtonText: {
//     color: 'white',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//     fontSize: 18,
//     textAlign: 'center',
//     paddingHorizontal: 16,
//   },
// });


















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
import { useAuth } from "@/view-model/AuthContext";
import axios from "axios";
import { router } from "expo-router";
import { API_URL } from "@/view-model/AuthContext";

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
          `${API_URL}/users/my-info`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );

        console.log("API Response:", response.data);

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
        console.log(response.data.result)
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
              router.replace('/login');
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
          source={require("@/assets/images/profile.png")}
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
            {/* <Text style={styles.value}>{formatDate(profile.dateOfBirth)}</Text> */}
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
