import toast from "react-hot-toast";
import {
  createOrder,
  createOrderSquadAndDuo,
} from "../redux/features/payment.slice";
import { openRazorpayCheckout } from "./razorpayService";

export const handlePay = async ({
  userInGameId,
  userId,
  teamId,
  gameId,
  leaderId,
  tournamentId,
  wildcard,
  currency = "INR",
  gameMode,
  dispatch,
}) => {
  if (gameMode === "squad" || gameMode === "duo") {
    try {
      let res;
      if (gameId) {
        res = await dispatch(
          createOrderSquadAndDuo({
            userId,
            teamId,
            leaderId,
            userInGameId,
            gameId,
            currency, //not a compulsion to send this
          })
        );
      }
      if (tournamentId) {
        res = await dispatch(
          createOrderSquadAndDuo({
            userId,
            teamId,
            leaderId,
            userInGameId,
            tournamentId,
            currency, //not a compulsion to send this
          })
        );
      }

      if (res.type === "createOrderSquadAndDuo/fulfilled" && gameId) {
        openRazorpayCheckout({
          dispatch,
          orderId: res.payload.orderId,
          amount: res.payload.amount / 100,
          userId,
          wildcard,
          gameId,
          gameMode,
          key: import.meta.env.VITE_RAZORPAY_KEY,
          description: "payment for squad/duo scrim",
        });
      }
      if (res.type === "createOrderSquadAndDuo/fulfilled" && tournamentId) {
        openRazorpayCheckout({
          dispatch,
          orderId: res.payload.orderId,
          amount: res.payload.amount / 100,
          userId,
          teamId,
          tournamentId,
          wildcard,
          gameMode,
          key: import.meta.env.VITE_RAZORPAY_KEY,
          description: "payment for squad/duo tournament",
        });
      }
    } catch (err) {
      toast.error("Error initiating payment");
      // console.error(err);
    }
  }
  if (gameMode === "solo") {
    try {
      let res;
      if (gameId) {
        res = await dispatch(
          createOrder({
            userId,
            userInGameId,
            gameId,
            currency, //not a compulsion to send this
          })
        );
      }
      if (tournamentId) {
        res = await dispatch(
          createOrder({
            userId,
            userInGameId,
            tournamentId,
            currency, //not a compulsion to send this
          })
        );
      }

      if (res.type === "createOrder/fulfilled" && gameId) {
        openRazorpayCheckout({
          dispatch,
          orderId: res.payload.orderId,
          amount: res.payload.amount / 100,
          userId,
          wildcard,
          gameId,
          gameMode,
          key: import.meta.env.VITE_RAZORPAY_KEY,
          description: "payment for solo scrim",
        });
      } else {
        toast.error("Error creating order. Please try again.");
      }
      if (res.type === "createOrder/fulfilled" && tournamentId) {
        openRazorpayCheckout({
          dispatch,
          orderId: res.payload.orderId,
          amount: res.payload.amount / 100,
          userId,
          tournamentId,
          wildcard,
          gameMode,
          key: import.meta.env.VITE_RAZORPAY_KEY,
          description: "payment for solo tournament",
        });
      } else {
        toast.error("Error creating order. Please try again.");
      }
    } catch (err) {
      toast.error("Error initiating payment");
    }
  }
};
