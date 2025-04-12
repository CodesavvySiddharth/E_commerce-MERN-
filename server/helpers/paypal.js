const paypal = require("paypal-rest-sdk");
require('dotenv').config();

// Log PayPal configuration for debugging (removed in production)
console.log("PayPal Mode:", process.env.PAYPAL_MODE || "sandbox");
console.log("PayPal Client ID exists:", !!process.env.PAYPAL_CLIENT_ID);
console.log("PayPal Client Secret exists:", !!process.env.PAYPAL_CLIENT_SECRET);

// Configure PayPal with sandbox mode
paypal.configure({
  mode: process.env.PAYPAL_MODE || "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

module.exports = paypal;
