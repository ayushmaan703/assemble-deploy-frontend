import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
};

export const createOrder = createAsyncThunk(
  "createOrder",
  async (orderData) => {
    try {
      const res = await axiosInstance.post("/payment/create-order", orderData);
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const validatePayment = createAsyncThunk(
  "validatePayment",
  async (paymentData) => {
    try {
      const res = await axiosInstance.post(
        "/payment/validate-payment",
        paymentData
      );
      return res.data;
    } catch (error) {
      toast.error(error?.message || "Payment validation failed");
      throw error;
    }
  }
);

export const failedPayment = createAsyncThunk(
  "failedPayment",
  async (failedData) => {
    try {
      const res = await axiosInstance.post(
        "/payment/failed-payment",
        failedData
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const createOrderSquadAndDuo = createAsyncThunk(
  "createOrderSquadAndDuo",
  async (orderData) => {
    try {
      const res = await axiosInstance.post(
        "/payment/create-order-sd",
        orderData
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

export const validatePaymentSquadAndDuo = createAsyncThunk(
  "validatePaymentSquadAndDuo",
  async (paymentData) => {
    try {
      const res = await axiosInstance.post(
        "/payment/validate-payment-sd",
        paymentData
      );
      return res.data;
    } catch (error) {
      toast.error(error?.message || "Payment validation failed");
      throw error;
    }
  }
);

export const failedPaymentSquadAndDuo = createAsyncThunk(
  "failedPaymentSquadAndDuo",
  async (failedData) => {
    try {
      const res = await axiosInstance.post(
        "/payment/failed-payment-sd",
        failedData
      );
      return res.data.data;
    } catch (error) {
      toast.error(error?.response?.data?.error);
      throw error;
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(validatePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(validatePayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(validatePayment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(failedPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(failedPayment.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(failedPayment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createOrderSquadAndDuo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrderSquadAndDuo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrderSquadAndDuo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(validatePaymentSquadAndDuo.pending, (state) => {
        state.loading = true;
      })
      .addCase(validatePaymentSquadAndDuo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(validatePaymentSquadAndDuo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(failedPaymentSquadAndDuo.pending, (state) => {
        state.loading = true;
      })
      .addCase(failedPaymentSquadAndDuo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(failedPaymentSquadAndDuo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default paymentSlice.reducer;
