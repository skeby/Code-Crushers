import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "@/types";

interface UIState {
  theme: Theme;
  hasStarted: boolean;
  hasFinished: boolean;
  // activePage: string;
}

const initialState: UIState = {
  theme: "system",
  hasStarted: false,
  hasFinished: false,
  // activePage: "Dashboard",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setHasStarted: (state, action: PayloadAction<boolean>) => {
      state.hasStarted = action.payload;
    },
    setHasFinished: (state, action: PayloadAction<boolean>) => {
      state.hasFinished = action.payload;
    },
    // setActivePage: (state, action: PayloadAction<string>) => {
    //   state.activePage = action.payload;
    // },
  },
});

export default uiSlice.reducer;
export const { setTheme, setHasStarted, setHasFinished } = uiSlice.actions;
