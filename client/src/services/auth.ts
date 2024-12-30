import { authInstance } from "./config/auth-axios";
import { AuthResponse, RegisterRequest } from "./types/auth";

export const registerAPI = async (
  requestData: RegisterRequest
): Promise<AuthResponse> => {
  try {
    const { data, status } = await authInstance.post("register", requestData);
    return { data, status };
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const loginAPI = async (
  requestData: RegisterRequest
): Promise<AuthResponse | any> => {
  try {
    const { data, status } = await authInstance.post("login", requestData);
    return { data, status };
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
