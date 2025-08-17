const express = require("express");
const router = express.Router();
const { 
  createOrder, 
  capturePayment, 
  getAllOrdersByUser, 
  getOrderDetails 
} = require("../controllers/shop/order-controller");

// Import other shop controllers as needed

// Order routes
router.post("/order/create", createOrder);
router.post("/order/capture", capturePayment);
router.get("/order/list/:userId", getAllOrdersByUser);
router.get("/order/details/:id", getOrderDetails);

// Add PayPal debug route
router.get("/order/debug-paypal", async (req, res) => {
  const paypal = require("../helpers/paypal");
  
  try {
    // Test if PayPal credentials are working
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: "http://localhost:5173/shop/paypal-return",
        cancel_url: "http://localhost:5173/shop/paypal-cancel",

      },
      transactions: [
        {
          amount: {
            currency: "USD",
            total: "10.00",
          },
          description: "Test payment",
        },
      ],
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.log("PayPal Debug Error:", JSON.stringify(error, null, 2));
        return res.status(500).json({
          success: false,
          message: "PayPal configuration error",
          error: error.message,
          details: error.response ? error.response.details : null
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "PayPal configuration is working",
          paymentInfo: {
            id: payment.id,
            state: payment.state,
            links: payment.links
          }
        });
      }
    });
  } catch (e) {
    console.log("Debug route error:", e);
    res.status(500).json({
      success: false,
      message: "Error in debug route",
      error: e.message
    });
  }
});

// Other shop routes

module.exports = router; 