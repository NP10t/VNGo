import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import axios from "axios";
import { API_URL } from "@/context/AuthContext";

const WalletScreen = () => {
  const [walletBalance, setWalletBalance] = useState<number | null>(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [walletExists, setWalletExists] = useState(true);

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      setError(null);

      try {
        const walletResponse = await axios.get(
          `${API_URL}/driver-wallets/my-wallet`
        );
        const earningsResponse = await axios.get(
          `${API_URL}/drivers/my-earnings`
        );

        setWalletBalance(walletResponse.data.result.balance || 0);
        setTotalEarnings(earningsResponse.data.result.total || 0);
        setWalletExists(true);
      } catch (err: any) {
        console.error("Error fetching wallet data:", err);

        if (err.response && err.response.data.code === 1018) {
          setWalletExists(false);
        } else {
          setError("Không thể tải dữ liệu. Vui lòng thử lại.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, []);

  const createWallet = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/driver-wallets`,
        {
          balance: 0.0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setWalletExists(true);
      setWalletBalance(response.data.result.balance || 0);
      Alert.alert("Thành công", "Ví của bạn đã được tạo.");
    } catch (err) {
      console.error("Error creating wallet:", err);
      Alert.alert("Thất bại", "Không thể tạo ví. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-blue-100 p-5">
      <View className="bg-white rounded-lg p-5 shadow-md mb-4">
        <Text className="text-2xl font-bold text-center text-blue-800">
          Ví Tiền Của Bạn
        </Text>
      </View>

      {loading ? (
        <Text className="text-center text-gray-600">Đang tải dữ liệu...</Text>
      ) : error ? (
        <Text className="text-center text-red-500">{error}</Text>
      ) : walletExists ? (
        <>
          <View className="bg-white rounded-lg p-5 shadow-md mb-4">
            <Text className="text-xl font-semibold text-gray-700 mb-2">
              Số tiền trong ví:
            </Text>
            <Text className="text-3xl font-bold text-green-600">
              {walletBalance?.toLocaleString()} VND
            </Text>
          </View>

          <View className="bg-white rounded-lg p-5 shadow-md mb-4">
            <Text className="text-xl font-semibold text-gray-700 mb-2">
              Tổng thu nhập:
            </Text>
            <Text className="text-3xl font-bold text-blue-600">
              {totalEarnings.toLocaleString()} VND
            </Text>
          </View>
        </>
      ) : (
        <>
          <View className="bg-white rounded-lg p-5 shadow-md mb-4">
            <Text className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Bạn chưa có ví. Hãy tạo ví mới để bắt đầu!
            </Text>
            <TouchableOpacity
              className="bg-blue-500 rounded-lg py-3"
              onPress={createWallet}
            >
              <Text className="text-center text-white font-bold">Tạo Ví</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {walletExists && (
        <View className="bg-white rounded-lg p-5 shadow-md">
          <Text className="text-xl font-semibold text-gray-700 mb-4">
            Tùy chọn:
          </Text>
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3 mb-3"
            onPress={() => console.log("Navigate to Add Money")}
          >
            <Text className="text-center text-white font-bold">Nạp Tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 rounded-lg py-3 mb-3"
            onPress={() => console.log("Navigate to Withdraw Money")}
          >
            <Text className="text-center text-white font-bold">Rút Tiền</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-500 rounded-lg py-3"
            onPress={() => console.log("Navigate to Transaction History")}
          >
            <Text className="text-center text-white font-bold">
              Lịch Sử Giao Dịch
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default WalletScreen;
