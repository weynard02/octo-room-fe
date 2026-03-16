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

export interface AuthData {
  accessToken?: string;
  token?: string;
  access_token?: string;
  user?: User;
  id?: string;
  email?: string;
  name?: string;
}

const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthData>> => {
    const response = await api.post<ApiResponse<AuthData>>("/auth/login", data);
    
    const body = response.data;
    const authData = body.data || (body as unknown as AuthData);

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

  register: async (
    data: RegisterRequest
  ): Promise<ApiResponse<AuthData>> => {
    const response = await api.post<ApiResponse<AuthData>>("/auth/register", data);
    
    const body = response.data;
    const authData = body.data || (body as unknown as AuthData);

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
      const user = JSON.parse(userJson) as User;
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
