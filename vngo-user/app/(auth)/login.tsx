import React, { useState } from "react";
import { useAuth } from "@/view-model/AuthContext";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

import "@/global.css";
import { router } from "expo-router";

const LoginScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    const result = await onLogin!(phone, password);
    if (result && result.error) {
      alert("Tên đăng nhập hoặc mật khẩu sai " + phone + " " + password);
    } else router.replace("/home");
  };

  return (
    <View className="flex-1 items-center bg-blue-200">
      <View className="bg-white w-full">
        <Image
          source={require("../../assets/images/logo.png")}
          className="w-56 h-56 self-center my-10"
          resizeMode="contain"
        ></Image>
      </View>
      <View className="flex items-center bg-white m-5 pb-52 rounded-3xl">
        <View className="w-5/6 p-10 rounded-3xl border-2 border-blue-400 bg-white shadow-md m-10">
          <Text className="text-2xl font-bold text-center text-black mb-4">
            ĐĂNG NHẬP
          </Text>

          <TextInput
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 mb-4"
            onChangeText={(text: string) => setPhone(text)}
            value={phone}
          />

          <TextInput
            placeholder="Mật khẩu"
            keyboardType="default"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 mb-4"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />

          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3"
            onPress={login}
          >
            <Text className="text-center text-white font-bold">ĐĂNG NHẬP</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-6">
          <Text className="text-gray-500">Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text className="text-blue-600 font-semibold">Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
