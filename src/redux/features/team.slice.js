import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  teamData: {},
};

export const createTeam = createAsyncThunk(
  "createTeam",
  async ({ teamData, leaderId }) => {
    try {
      const res = await axiosInstance.post("/team/create-team", teamData, {
        params: { leaderId },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

//sent request of users to join a taam
export const reqToJoinTeam = createAsyncThunk(
  "reqToJoinTeam",
  async ({ userId, teamId }) => {
    try {
      const res = await axiosInstance.put(
        "/team/send-join-invite",
        {},
        {
          params: { teamId, userId },
        }
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

//these are requests sent to a team by user to join that team
export const acceptRejectTeamInvite = createAsyncThunk(
  "acceptRejectTeamInvite",
  async (responseToReq, { userId, teamId }) => {
    try {
      const res = await axiosInstance.put(
        "/team/accept-reject-inites",
        responseToReq,
        {
          params: { userId, teamId },
        }
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const leaveTeam = createAsyncThunk(
  "leaveTeam",
  async ({ userId, teamId }) => {
    try {
      const res = await axiosInstance.put("/team/leave-team", {
        params: { userId, teamId },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

//these are invites sent by team to user to join that team
export const acceptRejectTeamInviteUser = createAsyncThunk(
  "acceptRejectTeamInviteUser",
  async ({ responseToReq, userId, teamId }) => {
    try {
      const res = await axiosInstance.put(
        "/team/accept-reject-teamReq",
        { responseToReq },
        {
          params: { userId, teamId },
        }
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

//team sending requests to user to join a team
export const sendTeamJoinReq = createAsyncThunk(
  "sendTeamJoinReq",
  async ({ userId, teamId }) => {
    try {
      const res = await axiosInstance.put(
        "/team/join-team-req",
        {},
        {
          params: { userId, teamId },
        }
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const updateTeamInfo = createAsyncThunk(
  "updateTeamInfo",
  async (data, { teamId }) => {
    try {
      const res = await axiosInstance.put("/team/update-team-info", data, {
        params: { teamId },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const updateTeamLeader = createAsyncThunk(
  "updateTeamLeader",
  async ({ teamId, newLeaderId }) => {
    try {
      const res = await axiosInstance.put("/team/update-team-leader", {
        params: { teamId, newLeaderId },
      });
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const getTeam = createAsyncThunk("getTeam", async (teamId) => {
  try {
    const res = await axiosInstance.get("/team/get-team", {
      params: { teamId },
    });
    return res.data.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const getTeamHome = createAsyncThunk("getTeamHome", async (teamId) => {
  try {
    const res = await axiosInstance.get("/team/get-team-home", {
      params: { teamId },
    });
    return res.data.data;
  } catch (error) {
    // toast.error(error?.response?.data?.message);
    throw error;
  }
});

export const uploadTeamImage = createAsyncThunk(
  "uploadTeamImage",
  async ({ file }) => {
    try {
      const res = await axiosInstance.post(
        "/image/addTeamImage",
        { file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.data;
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamData = action.payload;
      })
      .addCase(createTeam.rejected, (state) => {
        state.loading = false;
      })
      .addCase(uploadTeamImage.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadTeamImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadTeamImage.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamData = action.payload;
      })
      .addCase(getTeam.rejected, (state) => {
        state.loading = false;
      })
      .addCase(reqToJoinTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(reqToJoinTeam.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(reqToJoinTeam.rejected, (state) => {
        state.loading = false;
      })
      .addCase(acceptRejectTeamInvite.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptRejectTeamInvite.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(acceptRejectTeamInvite.rejected, (state) => {
        state.loading = false;
      })
      .addCase(leaveTeam.pending, (state) => {
        state.loading = true;
      })
      .addCase(leaveTeam.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(leaveTeam.rejected, (state) => {
        state.loading = false;
      })
      .addCase(acceptRejectTeamInviteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(acceptRejectTeamInviteUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(acceptRejectTeamInviteUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(sendTeamJoinReq.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendTeamJoinReq.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendTeamJoinReq.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTeamInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeamInfo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTeamInfo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateTeamLeader.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTeamLeader.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTeamLeader.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getTeamHome.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTeamHome.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getTeamHome.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default teamSlice.reducer;
