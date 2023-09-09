import React from 'react';
import apiClient from "@/libs/api";

const ButtonCheckout = () => {
  const createStripeCheckout = async () => {
    try {
      const response = await apiClient.post(`/stripe/create-checkout`, {
        priceId: 'price_1NZayPJ5RILbu7KLK2kvKRXg', // replace with your actual priceId
        successUrl: 'http://localhost:3000/success', // replace with your actual successUrl
        cancelUrl: 'http://localhost:3000/cancel' // replace with your actual cancelUrl
      });
      // Redirect to Stripe checkout
      window.location.href = response.url;
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <button onClick={createStripeCheckout}>
      Buy credits
    </button>
  );
};

export default ButtonCheckout;