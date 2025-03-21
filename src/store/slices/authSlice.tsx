import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  userId: string | null;
  token: string | null;
  user: User | null;
}

const initialState: AuthState = {
  userId: Cookies.get("userId") || null,
  token: Cookies.get("token") || null,
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userId: string;
        token: string;
        user: User;
      }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.user = action.payload.user;
      Cookies.set("token", action.payload.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(action.payload.user), { expires: 7 });
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      state.user = null;
      Cookies.remove("user");
      Cookies.remove("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
