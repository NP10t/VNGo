import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function VoucherScreen() {
  const { trip_id } = useLocalSearchParams(); // Lấy trip_id từ route params
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);
  const [giftCode, setGiftCode] = useState("");

  const vouchers = [
    {
      id: 1,
      image: "https://via.placeholder.com/40",
      description: "Highland: Giảm giá 20% cho cuốc xe từ 50k",
      available: true,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/40",
      description: "Highland: Giảm giá 20% cho cuốc xe từ 100k",
      available: false,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/40",
      description: "Highland: Giảm giá 20% cho cuốc xe từ 50k",
      available: true,
    },
  ];

  const handleSelectVoucher = (id: number) => {
    if (vouchers.find((voucher) => voucher.id === id)?.available) {
      setSelectedVoucher(id);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voucher</Text>

      {/* Trường nhập mã gift code */}
      <View style={styles.giftCodeContainer}>
        <TextInput
          style={styles.giftCodeInput}
          placeholder="Nhập mã gift code của bạn"
          value={giftCode}
          onChangeText={setGiftCode}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách voucher */}
      <FlatList
        data={vouchers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.voucherItem, !item.available && styles.voucherUnavailable]}
            onPress={() => handleSelectVoucher(item.id)}
            disabled={!item.available}
          >
            <Image source={{ uri: item.image }} style={styles.voucherImage} />
            <Text style={styles.voucherDescription}>{item.description}</Text>
            {item.available && (
              <View style={styles.radioCircle}>
                {selectedVoucher === item.id && <View style={styles.radioSelected} />}
              </View>
            )}
          </TouchableOpacity>
        )}
      />

      {/* Ghi chú về voucher không khả dụng */}
      <Text style={styles.unavailableNote}>
        Những mã giảm giá hấp dẫn đang chờ bạn trên những cuốc xe mới...
      </Text>

      {/* Nút chọn voucher */}
      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectButtonText}>Chọn Voucher</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  giftCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  giftCodeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  voucherItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
  },
  voucherUnavailable: {
    opacity: 0.5,
  },
  voucherImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  voucherDescription: {
    flex: 1,
    fontSize: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#000",
  },
  unavailableNote: {
    fontSize: 14,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  selectButton: {
    backgroundColor: "#cceeff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
