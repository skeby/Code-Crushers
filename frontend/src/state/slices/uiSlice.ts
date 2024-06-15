import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "@/types";

interface UIState {
  theme: Theme;
  activePage: string;
}

const initialState: UIState = {
  theme: "system",
  activePage: "Dashboard",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const { setTheme, setActivePage } = uiSlice.actions;
