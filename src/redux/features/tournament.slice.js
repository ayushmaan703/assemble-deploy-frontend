import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  tournament: { matches: [], total: 0 },
};

export const createTournament = createAsyncThunk(
  "createTournament",
  async (tournamentData) => {
    try {
      const res = await axiosInstance.post(
        "/admin/createTournament",
        tournamentData
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const postResult = createAsyncThunk("postResult", async (resultData) => {
  try {
    const res = await axiosInstance.post("/admin/postTResult", resultData);
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const createGroup = createAsyncThunk(
  "createGroup",
  async (tournamentId) => {
    try {
      const res = await axiosInstance.post("/admin/createGroup", {
        params: { tournamentId },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getGroup = createAsyncThunk("getGroup", async (tournamentId) => {
  try {
    const res = await axiosInstance.get("/admin/getGroup", {
      params: { tournamentId },
    });
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

export const getIdp = createAsyncThunk(
  "getIdp",
  async ({ tournamentId, groupId }) => {
    try {
      const res = await axiosInstance.get("/admin/getT_Idp", {
        params: { tournamentId, groupId },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getTournament = createAsyncThunk("getTournament", async (data) => {
  try {
    const res = await axiosInstance.get("/admin/getTournamentMatches", {
      params: data,
    });
    return res.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.error);
    throw error;
  }
});

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTournament.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTournament.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createTournament.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTournament.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTournament.fulfilled, (state, action) => {
        state.loading = false;
        state.tournament.matches = [...action.payload.matches];
        state.tournament.total = action.payload.total;
      })
      .addCase(getTournament.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(getGroup.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getGroup.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getIdp.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIdp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getIdp.rejected, (state) => {
        state.loading = false;
      })
      .addCase(postResult.pending, (state) => {
        state.loading = true;
      })
      .addCase(postResult.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postResult.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default tournamentSlice.reducer;
