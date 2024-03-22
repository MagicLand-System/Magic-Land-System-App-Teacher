import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = process.env.EXPO_PUBLIC_API_LINK;

const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response) {
      if (err.response.status === 401 || err.response.status === 500) {
        alert('Hãy đăng nhập để tiếp tục!')
        await signOut(auth)
        await AsyncStorage.removeItem("accessToken");
      }
    }
    return Promise.reject(err);
  }
);

export const refresh = async (oldToken) => {
  const response = await instance.post("/api/v1/auth/refreshToken", { oldToken: oldToken });
  return response.data;
};
