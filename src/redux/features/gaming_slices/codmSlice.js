import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";

// Add CODM game data
export const addCodmGame = createAsyncThunk(
  "codm/addGame",
  async (gameData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/gamingInfo/codm", gameData, );
      return response.data;
    } catch (error) {
      toast.error("Error adding CODM game data");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get CODM game data
export const getCodmGameData = createAsyncThunk(
  "codm/getGame",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/gamingInfo/get", {
        params: {
          gameType: "CODM",
          userId,
        },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update CODM game data
export const updateCodmGameData = createAsyncThunk(
  "codm/updateGame",
  async (gameData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.put(`/gamingInfo/codm/update`, gameData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const codmSlice = createSlice({
  name: "codm",
  initialState: {
    games: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCodmGame.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCodmGame.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(addCodmGame.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getCodmGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCodmGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(getCodmGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCodmGameData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCodmGameData.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(updateCodmGameData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default codmSlice.reducer;
