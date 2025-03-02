import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  userId: string | null;
  token: string | null;
}

const initialState: AuthState = {
  userId: Cookies.get("token") || null,
  token: Cookies.get("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userId: string; token: string }>
    ) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 });
      Cookies.set("userId", action.payload.userId, { expires: 7 });
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("userId");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
