import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creative: [],
  colors: ["#786FA6", "#596275", "#CF6A87", "#778BEB", "#F3A683", "#F8A5C2"],
  isAddCreativeOpen: false,
};

export const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    addCreative: (state, action) => {
      if (state.creative) state.creative.push(action.payload);
      else state.creative = [action.payload];
    },
    toggleAddCreativeOpen: (state) => {
      state.isAddCreativeOpen = !state.isAddCreativeOpen;
    },
  },
});

export const { addCreative, toggleAddCreativeOpen } = appReducer.actions;

export default appReducer.reducer;
