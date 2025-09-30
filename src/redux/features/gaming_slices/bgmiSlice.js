import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";

// Add BGMI game data
export const addBgmiGameData = createAsyncThunk(
  "bgmi/addGameData",
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/gamingInfo/bgmi",
        gameData,
      );
      return response.data;
    } catch (error) {
      toast.error("Error adding BGMI game data");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get BGMI game data
export const getBgmiGameData = createAsyncThunk(
  "bgmi/getGameData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/gamingInfo/get", {
        params: {
          gameType: "BGMI",
          userId,
        },
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const getGameData = createAsyncThunk(
  "bgmi/getGameData",
  async ({ gameType, userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/gamingInfo/get", {
        params: {
          gameType,
          userId,
        },
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update BGMI game data
export const updateBgmiGameData = createAsyncThunk(
  "bgmi/updateGameData",
  async (gameData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/gamingInfo/bgmi/update`, gameData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const bgmiSlice = createSlice({
  name: "bgmi",
  initialState: {
    games: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(getGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addBgmiGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBgmiGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(addBgmiGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateBgmiGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBgmiGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(updateBgmiGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bgmiSlice.reducer;
