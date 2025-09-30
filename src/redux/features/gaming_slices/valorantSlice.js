import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";

// Add Valorant game data
export const addValorantGameData = createAsyncThunk(
  "valorant/addGameData",
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/gamingInfo/valorant",
        gameData
      );

      return response.data;
    } catch (error) {
      toast.error("Error adding Valorant game data");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get Valorant game data
export const getValorantGameData = createAsyncThunk(
  "valorant/getGameData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/gamingInfo/get`, {
        params: {
          gameType: "VALORANT",
          userId,
        },
      });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update Valorant game data
export const updateValorantGameData = createAsyncThunk(
  "valorant/updateGameData",
  async ({ gameId, gameData }, { rejectWithValue }) => {
    try {
      const token = sessionStorage.getItem("accessToken");

      const res = await axiosInstance.put(`/game/update/${gameId}`, gameData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const valorantSlice = createSlice({
  name: "valorant",
  initialState: {
    games: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getValorantGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getValorantGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(getValorantGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addValorantGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addValorantGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(addValorantGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateValorantGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateValorantGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(updateValorantGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default valorantSlice.reducer;
