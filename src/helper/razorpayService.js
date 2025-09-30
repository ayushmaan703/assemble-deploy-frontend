import {
  failedPayment,
  failedPaymentSquadAndDuo,
  validatePayment,
  validatePaymentSquadAndDuo,
} from "../redux/features/payment.slice";
import toast from "react-hot-toast";

export const openRazorpayCheckout = ({
  dispatch,
  orderId,
  amount,
  description,
  userId,
  gameId,
  teamId,
  tournamentId,
  wildcard,
  key,
  gameMode,
  currency = "INR",
}) => {
  const options = {
    key,
    amount: amount * 100, // In paise
    currency,
    name: "Assemble",
    description: description || "Game Registration Payment",
    order_id: orderId,

    //Called for successful payment
    handler: async function (response) {
      try {
        let verifyRes;
        if (gameMode === "squad" || gameMode === "duo") {
          if (gameId) {
            verifyRes = await dispatch(
              validatePaymentSquadAndDuo({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId,
                teamId,
                gameId,
                wildcard,
                gameMode,
              })
            );
          }
          if (tournamentId) {
            verifyRes = await dispatch(
              validatePaymentSquadAndDuo({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId,
                teamId,
                tournamentId,
                wildcard,
                gameMode,
              })
            );
          }
          if (verifyRes.type != "validatePaymentSquadAndDuo/fulfilled") {
            toast.error("Payment verification failed");
          } else {
            toast.success("Payment successful");
          }
        }
        if (gameMode === "solo") {
          if (gameId) {
            verifyRes = await dispatch(
              validatePayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId,
                gameId,
                wildcard,
                gameMode,
              })
            );
          }
          if (tournamentId) {
            verifyRes = await dispatch(
              validatePayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId,
                tournamentId,
                wildcard,
                gameMode,
              })
            );
          }
          if (verifyRes.type != "validatePayment/fulfilled") {
            toast.error("Payment verification failed");
            throw error;
          } else {
            toast.success("Payment successful");
          }
        }
      } catch (error) {
        toast.error(error || "Payment verification failed");
      }
    },

    //Called when user cancels a payment
    modal: {
      ondismiss: async function () {
        if (gameMode === "squad" || gameMode === "duo") {
          if (gameId) {
            await dispatch(
              failedPaymentSquadAndDuo({
                userId,
                gameId,
                orderId,
                reason: "User dismissed the payment modal without paying",
              })
            );
          }
          if (tournamentId) {
            await dispatch(
              failedPaymentSquadAndDuo({
                userId,
                tournamentId,
                orderId,
                reason: "User dismissed the payment modal without paying",
              })
            );
          }
          toast.error("Payment failed");
        }
        if (gameMode === "solo") {
          if (gameId) {
            await dispatch(
              failedPayment({
                userId,
                gameId,
                orderId,
                reason: "User dismissed the payment modal without paying",
              })
            );
          }
          if (tournamentId) {
            await dispatch(
              failedPayment({
                userId,
                tournamentId,
                orderId,
                reason: "User dismissed the payment modal without paying",
              })
            );
          }
          toast.error("Payment failed");
        }
      },
    },
  };

  const rzp = new window.Razorpay(options);

  rzp.on("payment.failed", async function (response) {
    if (gameMode === "squad" || gameMode === "duo") {
      if (gameId) {
        await dispatch(
          failedPaymentSquadAndDuo({
            userId,
            gameId,
            orderId,
            reason: "User dismissed the payment modal without paying",
          })
        );
      }
      if (tournamentId) {
        await dispatch(
          failedPaymentSquadAndDuo({
            userId,
            tournamentId,
            orderId,
            reason: "User dismissed the payment modal without paying",
          })
        );
      }
      toast.error("Payment failed");
    }
    if (gameMode === "solo") {
      if (gameId) {
        await dispatch(
          failedPayment({
            userId,
            gameId,
            orderId,
            reason: "User dismissed the payment modal without paying",
          })
        );
      }
      if (tournamentId) {
        await dispatch(
          failedPayment({
            userId,
            tournamentId,
            orderId,
            reason: "User dismissed the payment modal without paying",
          })
        );
      }
      toast.error("Payment failed");
    }
  });

  rzp.open();
};
