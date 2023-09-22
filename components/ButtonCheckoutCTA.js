import React from 'react';
import apiClient from "@/libs/api";

const ButtonCheckoutCTA = () => {
  const createStripeCheckout = async (event) => {
    event.stopPropagation(); // Add this line
    try {
      const response = await apiClient.post(`/stripe/create-checkout`, {
        priceId: 'price_1NpBpJJ5RILbu7KLxMwCiohG', // replace with your actual priceId
        successUrl: 'https://qrart.ai/create-qr', // replace with your actual successUrl
        cancelUrl: 'https://qrart.ai' // replace with your actual cancelUrl
      });
      // Redirect to Stripe checkout
      window.location.href = response.url;
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <button type="button" onClick={createStripeCheckout} className='btn btn-primary mt-3 '>
    Buy credits
  </button>
  );
};

export default ButtonCheckoutCTA;