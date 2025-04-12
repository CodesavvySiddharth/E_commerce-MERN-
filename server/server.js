const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

// Load environment variables
dotenv.config();

//create a database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to MERN E-commerce API",
    endpoints: {
      test: "/test",
      auth: {
        register: "/api/auth/register [POST]",
        login: "/api/auth/login [POST]",
        logout: "/api/auth/logout [POST]",
        checkAuth: "/api/auth/check-auth [GET]"
      },
      products: {
        getAllProducts: "/api/shop/products/get [GET]",
        getSingleProduct: "/api/shop/products/get/:id [GET]"
      },
      cart: "/api/shop/cart",
      orders: "/api/shop/order",
      search: "/api/shop/search",
      reviews: "/api/shop/review"
    }
  });
});

// Test route
app.get("/test", (req, res) => {
  res.json({
    message: "Server is working properly",
    time: new Date().toISOString()
  });
});

app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter);

// Debug routes
console.log('Registered routes:');
app._router.stack.forEach(function(middleware){
    if(middleware.route){
        console.log(middleware.route.path, middleware.route.methods);
    } else if(middleware.name === 'router'){
        middleware.handle.stack.forEach(function(handler){
            if(handler.route){
                console.log(middleware.regexp, handler.route.path, handler.route.methods);
            }
        });
    }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is now running and listening on all interfaces on port ${PORT}`);
  console.log(`- Local: http://localhost:${PORT}`);
  console.log(`- Network: Check your IP address + port ${PORT}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please close the application using this port or use a different port.`);
  }
});
