import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailId: "",
};

export const emailIdSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmailId: (state, action) => {
      localStorage.setItem("email", action.payload);
      state.emailId = action.payload;
    },
  },
});

export const { setEmailId } = emailIdSlice.actions;
export default emailIdSlice.reducer;
