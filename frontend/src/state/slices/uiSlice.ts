import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Theme } from "@/types";

interface UIState {
  theme: Theme;
}

const initialState: UIState = {
  theme: "system",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export default uiSlice.reducer;
export const { setTheme } = uiSlice.actions;
