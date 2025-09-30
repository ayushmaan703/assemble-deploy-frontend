// components/TestPayment.jsx
import React from 'react';
import axios from 'axios';
import { openRazorpayCheckout } from '../helper/razorpayService';
import { useDispatch } from 'react-redux';
import { createOrder } from '../redux/features/payment.slice';
import toast from 'react-hot-toast';

const TestPayment = () => {
    const dispatch = useDispatch()
    const handlePay = async () => {
        try {
            const userInGameId = 2001
            const userId = '68485eb104c592f660a7c6b1';
            const gameId = '685137ff463420dcb7b15a2a';
            const teamId = "68767dbee484a49dc7da8105"
            const tournamentId = '68ac5d6308211589e7a465d5';
            const wildcard = true
            const currency = "INR"

            const res = await dispatch(createOrder({
                userId,
                teamId,
                userInGameId,
                // gameId,
                tournamentId,
                currency,//not a compulsion to send this
            }))
            if (res.type === "createOrder/fulfilled") {
                openRazorpayCheckout({
                    dispatch,
                    orderId: res.payload.orderId,
                    amount: res.payload.amount / 100,
                    description: "testing payment",
                    userId,
                    tournamentId,
                    wildcard,
                    // gameId,
                    gameMode: 'squad',
                    key: import.meta.env.VITE_RAZORPAY_KEY,
                });
            }
            else {
                toast.error("Error creating order. Please try again.");
            }
        } catch (err) {
            // console.error('Error initiating payment:', err);
            alert('Something went wrong.');
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2>🧪 Razorpay Test</h2>
            <button onClick={handlePay} style={{ padding: '10px 20px', fontSize: '16px' }}>
                Pay ₹100 for Scrim
            </button>
        </div>
    );
};

export default TestPayment;
