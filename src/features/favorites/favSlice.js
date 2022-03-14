import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favs: [],
};

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    addToFav(state, action) {
      let tempFavItem = { ...action.payload };
      state.favs.push(tempFavItem);
    },
  },
});

export const { addToFav } = favSlice.actions;
export default favSlice.reducer;
