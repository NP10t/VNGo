import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    phone: string,
    password: string,
    fullName: string,
    dateOfBirth: Date
  ) => Promise<any>;
  onLogin?: (phone: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

export const TOKEN_KEY = "my-jwt";
export const API_URL = "http://192.168.27.98:8080/vngo";
export const SOCKET_URL = "http://192.168.27.98:8080/vngo/ws";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      console.log("stored:", token);

      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
        });
      }
    };
  });

  const register = async (
    phone: String,
    password: string,
    fullName: string,
    dateOfBirth: Date
  ) => {
    try {
      return await axios.post(
        `${API_URL}/users`,
        {
          phoneNumber: phone,
          password: password,
          fullName: fullName,
          dateOfBirth: dateOfBirth,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (phone: String, password: string) => {
    try {
      console.log("dang login");
      const result = await axios.post(
        `${API_URL}/auth/token`,
        {
          phoneNumber: phone,
          password: password,
          userType: "USER",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAuthState({
        token: result.data.result.token,
        authenticated: true,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.result.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.result.token);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
