import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usernameId: "",
};

export const usernameSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUsernameId: (state, action) => {
      state.usernameId = action.payload;
    },
  },
});

export const { setUsernameId } = usernameSlice.actions;
export default usernameSlice.reducer;
