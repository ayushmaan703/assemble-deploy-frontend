import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const initialAccessToken = sessionStorage.getItem("accessToken");

const getUserFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch {
    return null;
  }
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/login", {
        username,
        password,
      });
      const { accessToken } = res.data.data;
      sessionStorage.setItem("accessToken", accessToken);
      toast.success("Logged in successfully!");
      return { accessToken };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const loginViaEmailId = createAsyncThunk(
  "loginViaEmailId",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/loginByEmail", {
        email,
      });
      toast.success("OTP sent successfully!");
      return res.data.data;
    } catch (err) {
      const message = err.response?.data?.message || "Error sending otp";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/verifyLoginOTP", {
        email,
        otp,
      });
      const { accessToken } = res.data.data;
      sessionStorage.setItem("accessToken", accessToken);
      toast.success("Logged in successfully!");
      return { accessToken };
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const googleLogin = createAsyncThunk("googleLogin", async (code) => {
  try {
    const res = await axiosInstance.post("/user/googleAuth", { code });
    const { accessToken } = res.data.data;
    sessionStorage.setItem("accessToken", accessToken);
    return res.data.data;
  } catch (err) {
    const message = err.response?.data?.message || "Login failed";
    toast.error(message);
    throw err;
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/user/logout");
      sessionStorage.removeItem("accessToken");
      toast.success("Logged out successfully!");
      return true;
    } catch (err) {
      const message = err.response?.data?.message || "Logout failed";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/user/refresh");
      const { accessToken } = res.data.data;

      // Update sessionStorage
      sessionStorage.setItem("accessToken", accessToken);

      return { accessToken };
    } catch (err) {
      return rejectWithValue("Session expired, please log in again");
    }
  }
);

export const getUserData = createAsyncThunk("getUserData", async (id) => {
  try {
    const res = await axiosInstance.get("/user", { params: { id } });
    return res.data.data;
  } catch (error) {
    // const message = err.response?.data?.message || "failed to add user details";
    // toast.error(message);
    throw err;
  }
});

export const setPersonalInfodb = createAsyncThunk(
  "setPersonalInfo",
  async (userData) => {
    try {
      await axiosInstance.post("/user/addPersonalDetails", userData);
    } catch (error) {
      throw error;
    }
  }
);

export const setEduInfodb = createAsyncThunk(
  "setEduInfodb",
  async ({ eduData, userId }) => {
    try {
      await axiosInstance.post(`/user/${userId}/education`, eduData);
    } catch (error) {
      throw error;
    }
  }
);

export const setGamingInfodb = createAsyncThunk(
  "setGamingInfodb",
  async ({ gamingData, userId }) => {
    try {
      const res = await axiosInstance.post(
        `/user/${userId}/gaming`,
        gamingData
      );

    } catch (error) {
      throw error;
    }
  }
);

export const forgotPasswordViaEmailSendOtp = createAsyncThunk(
  "forgotPasswordViaEmailSendOtp",
  async (email) => {
    try {
      toast.success("OTP sent successfully");
      await axiosInstance.post("/user/forgotPasswordEmail", { email });
    } catch (error) {
      toast.error("Error sending OTP");
      throw error;
    }
  }
);

export const forgotPasswordViaEmailVerifyOtp = createAsyncThunk(
  "forgotPasswordViaEmailVerifyOtp",
  async ({ email, otp }) => {
    try {
      await axiosInstance.post("/user/forgotPasswordVerify", {
        email,
        otp,
      });

      toast.success("OTP verified successfully");
    } catch (error) {
      toast.error("Error verifying OTP");
      throw error;
    }
  }
);

export const forgotPasswordViaEmail = createAsyncThunk(
  "forgotPasswordViaEmail",
  async ({ email, newPassword }) => {
    try {


      const res = await axiosInstance.post("/user/forgotPassword", {
        email,
        newPassword,
      });
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Error updating password");
      throw error;
    }
  }
);

export const forgotUserNameViaEmailSendOtp = createAsyncThunk(
  "forgotUserNameViaEmailSendOtp",
  async (email) => {
    try {
      toast.success("OTP sent successfully");
      await axiosInstance.post("/user/forgotUsernameEmail", { email });
    } catch (error) {
      toast.error("Error sending OTP");
      throw error;
    }
  }
);

export const forgotUserNameViaEmailVerifyOtp = createAsyncThunk(
  "forgotUserNameViaEmailVerifyOtp",
  async ({ email, otp }) => {
    try {
      await axiosInstance.post("/user/forgotUsernameVerify", { email, otp });
      toast.success("OTP verified successfully");
    } catch (error) {
      toast.error("Error verifying OTP");
      throw error;
    }
  }
);

export const searchUser = createAsyncThunk("searchUser", async (query) => {
  try {
    const res = await axiosInstance.post("/user/searchUser", { query });
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const uploadImage = createAsyncThunk(
  "uploadImage",
  async ({ uploadedFiles, userId }) => {
    try {
      const res = await axiosInstance.post("/image/addImage", uploadedFiles, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          userId,
        },
      });

      return res.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialAccessToken ? getUserFromToken(initialAccessToken) : null,
    accessToken: initialAccessToken,
    loading: false,
    error: null,
    userData: {},
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      sessionStorage.setItem("accessToken", action.payload);
      state.user = getUserFromToken(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = getUserFromToken(action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = getUserFromToken(action.payload.accessToken);
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accessToken;
        state.user = getUserFromToken(action.payload.accessToken);
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginViaEmailId.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginViaEmailId.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(loginViaEmailId.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REFRESH
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = getUserFromToken(action.payload.accessToken);
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.error = action.payload;
      });
  },
});

export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
