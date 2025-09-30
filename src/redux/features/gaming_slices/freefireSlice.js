import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";

// Add FreeFire game data
export const addFreefireGameData = createAsyncThunk(
  "freefire/addGameData",
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/gamingInfo/freefire",
        gameData
      );

      return response.data;
    } catch (error) {
      toast.error("Error adding FreeFire game data");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get FreeFire game data
export const getFreefireGameData = createAsyncThunk(
  "freefire/getGameData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/gamingInfo/get", {
        params: {
          gameType: "FREEFIRE",
          userId,
        },
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update FreeFire game data
export const updateFreefireGameData = createAsyncThunk(
  "freefire/updateGameData",
  async (gameData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(
        `/gamingInfo/freefire/update`,
        gameData
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const freefireSlice = createSlice({
  name: "freefire",
  initialState: {
    games: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getFreefireGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFreefireGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(getFreefireGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addFreefireGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addFreefireGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(addFreefireGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateFreefireGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFreefireGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(updateFreefireGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default freefireSlice.reducer;
