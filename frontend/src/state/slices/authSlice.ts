import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User, UserType } from "@/types";
import { AUTH_TOKEN, USER } from "@/static";

interface AuthState {
  user: User<UserType> | null;
  isAuthenticated: boolean;
  // hasOnboarded: boolean;
  error: string | null;
}

const user = JSON.parse(localStorage.getItem(USER) || "null");

const initialState: AuthState = {
  user: user,
  isAuthenticated: user ? true : false,

  // Sample teacher user
  // user: {
  //   id: 1,
  //   email: "akinsanyaadeyinka4166@gmail.com",
  //   firstName: "Adeyinka",
  //   lastName: "Akinsanya",
  //   status: "free",
  //   role: "Teacher",
  //   registrationNumber: "21CG029820",
  // },

  // Sample student user
  // user: {
  //   id: 1,
  //   email: "akinsanyaadeyinka4166@gmail.com",
  //   firstName: "Adeyinka",
  //   lastName: "Akinsanya",
  //   status: "free",
  //   type: "Student",
  //   registrationNumber: "21CG029820",
  // },
  // isAuthenticated: true,
  // hasOnboarded: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User<UserType>>) => {
      state.user = action.payload;
      localStorage.setItem(USER, JSON.stringify(action.payload));
      if (!state.isAuthenticated) {
        state.isAuthenticated = true;
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      const user = localStorage.getItem(USER);
      const token = localStorage.getItem(AUTH_TOKEN);
      if (user) localStorage.removeItem(USER);
      if (token) localStorage.removeItem(AUTH_TOKEN);
    },
  },
});

export default authSlice.reducer;
export const { setUser, clearUser } = authSlice.actions;
