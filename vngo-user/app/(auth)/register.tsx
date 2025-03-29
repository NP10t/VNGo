import React, { useState } from "react";
import { useAuth } from "@/view-model/AuthContext";
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterScreen = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const { onLogin, onRegister } = useAuth();
  const [open, setOpen] = useState(false);

  const login = async () => {
    const result = await onLogin!(phone, password);
    if (result && result.error) {
      alert("Tên đăng nhập hoặc mật khẩu sai");
    } else router.replace("/home");
  };

  const register = async () => {
    const result = await onRegister!(phone, password, fullName, dateOfBirth);
    if (result && result.error) {
      alert(result.msg);
    } else {
      alert("Bạn đã tạo tài khoản thành công!");
      login();
    }
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
      <View className="flex items-center bg-white m-5 pb-36 rounded-3xl">
        <View className="w-5/6 p-10 rounded-3xl border-2 border-blue-400 bg-white shadow-md m-10">
          <Text className="text-2xl font-bold text-center text-black mb-4">
            ĐĂNG KÝ
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
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />

          <TextInput
            placeholder="Họ tên"
            keyboardType="default"
            className="border border-gray-300 bg-white rounded-lg px-4 py-2 mb-4"
            onChangeText={(text: string) => setFullName(text)}
            value={fullName}
          />

          <View>
            <Text className="mb-2 text-black font-semibold">Ngày sinh</Text>
            <TouchableOpacity
              onPress={() => setOpen(true)}
              className="border border-gray-300 bg-white rounded-lg px-4 py-2 mb-4"
            >
              <Text>
                {dateOfBirth
                  ? `${dateOfBirth.getDate()}/${
                      dateOfBirth.getMonth() + 1
                    }/${dateOfBirth.getFullYear()}`
                  : "Chọn ngày sinh"}
              </Text>
            </TouchableOpacity>
            {open && (
              <DateTimePicker
                value={dateOfBirth}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setOpen(false);
                  if (selectedDate) {
                    setDateOfBirth(selectedDate);
                  }
                }}
              />
            )}
          </View>

          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-3"
            onPress={register}
          >
            <Text className="text-center text-white font-bold">ĐĂNG KÝ</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row mt-6">
          <Text className="text-gray-500">Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)")}>
            <Text className="text-blue-600 font-semibold">Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
