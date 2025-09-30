import { configureStore } from "@reduxjs/toolkit";
import emailIdReducer from "./features/auth_slices/emailIdSlice";
import usernameReducer from "./features/auth_slices/usernameSlice";
import authReducer from "./features/auth_slices/AuthSlice";
import registerReducer from "./features/auth_slices/RegisterSlice";
import paymentReducer from "./features/payment.slice";
import tournamentReducer from "./features/tournament.slice";
import teamReducer from "./features/team.slice";
import bgmiReducer from "./features/gaming_slices/bgmiSlice";
import codmReducer from "./features/gaming_slices/codmSlice";
import ffReducer from "./features/gaming_slices/freefireSlice";
import valReducer from "./features/gaming_slices/valorantSlice";
const store = configureStore({
  reducer: {
    email: emailIdReducer,
    username: usernameReducer,
    tournament: tournamentReducer,
    auth: authReducer,
    register: registerReducer,
    payment: paymentReducer,
    team: teamReducer,
    bgmi: bgmiReducer,
    codm: codmReducer,
    freefire: ffReducer,
    valorant: valReducer,
  },
});

export default store;
