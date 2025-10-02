import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";

// Send OTP to Email
export const sendEmail = createAsyncThunk(
  "auth/sendEmail",
  async (email, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/registerEmail", { email });
      toast.success("OTP sent!");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send OTP";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/verifyEmail", {
        email,
        otp,
      });
      toast.success("OTP verified!");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "OTP verification failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//  Final Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, username, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/addRegistrationDetails", {
        email: email,
        username: username,
        password: password,
      });
      localStorage.setItem("accessToken", res.data.data.accessToken);
      toast.success("Registered successfully!");
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const duplicateUsername = createAsyncThunk(
  "duplicateUsername",
  async (username) => {
    try {
      const res = await axiosInstance.post("/user/dupUser", { username });
      return res.data.data;
    } catch (error) {
      throw error;
    }
  }
);
const initialState = {
  id: "",
  email: "",
  otp: "",
  username: "",
  password: "",
  loading: false,
  error: null,
  image: {},
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      localStorage.setItem("email", action.payload);
      state.email = action.payload;
    },
    setOtp: (state, action) => {
      localStorage.setItem("otp", action.payload);
      state.otp = action.payload;
    },
    setUsername: (state, action) => {
      localStorage.setItem("usernameId", action.payload);
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    resetRegister: () => initialState,
  },
  extraReducers: (builder) => {
    const cases = [sendEmail, verifyOtp];
    cases.forEach((thunk) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
        })
        .addCase(thunk.fulfilled, (state) => {
          state.loading = false;
          state.error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    });
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.id = action.payload.data.user._id;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail, setOtp, setUsername, setPassword, resetRegister } =
  registerSlice.actions;

export default registerSlice.reducer;
