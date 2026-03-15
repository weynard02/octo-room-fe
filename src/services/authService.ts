import api, { type ApiResponse } from "./api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthResponse {
  accessToken?: string;
  token?: string;
  user?: User;
  // If the user object is at the root
  id?: string;
  email?: string;
  name?: string;
}

const authService = {
  login: async (data: LoginRequest): Promise<any> => {
    const response = await api.post("/auth/login", data);
    
    // Check if it's wrapped in { data: ... } or is the response body itself
    const body = response.data;
    const authData = body.data || body;

    const token = authData.accessToken || authData.token || authData.access_token;
    if (token) {
      localStorage.setItem("token", token);
    }

    // Try to find the user object
    const user = authData.user || (authData.email ? authData : null);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    return body;
  },

  register: async (
    data: RegisterRequest
  ): Promise<any> => {
    const response = await api.post("/auth/register", data);
    
    const body = response.data;
    const authData = body.data || body;

    const token = authData.accessToken || authData.token || authData.access_token;
    if (token) {
      localStorage.setItem("token", token);
    }

    const user = authData.user || (authData.email ? authData : null);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    
    return body;
  },

  getUser: (): User | null => {
    const userJson = localStorage.getItem("user");
    if (!userJson || userJson === "undefined" || userJson === "null") return null;
    try {
      const user = JSON.parse(userJson);
      // Ensure we return a valid object with at least email or name
      if (user && (user.email || user.name)) {
        return user;
      }
      return null;
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      return null;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  },
};

export default authService;
