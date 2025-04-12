# MERN E-Commerce Application

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**
  - Register/Login/Logout
  - JWT-based authentication with cookies
  - Role-based access control (Admin/User)

- **Product Management (Admin)**
  - Add, edit, delete products
  - Image upload using Cloudinary
  - Manage product inventory

- **Shopping Experience (Users)**
  - Browse products by category/brand
  - Search functionality
  - Sort and filter products
  - Product reviews and ratings
  - Enhanced homepage banner carousel

- **Banner Management (Admin)**
  - Upload and manage banner images
  - Preview banners before publishing
  - Configure banner display options
  - Use local or remote banner images

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Persist cart items

- **Checkout Process**
  - Address management
  - PayPal integration for payments
  - Order history

- **Admin Dashboard**
  - Sales overview
  - Order management
  - Product inventory
  - Banner management

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file upload
- Cloudinary for image hosting
- PayPal API integration

### Frontend
- React (Vite)
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed locally or MongoDB Atlas account
- PayPal developer account (for payment features)
- Cloudinary account (for image upload)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-e-commerce
   ```

2. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/mern-ecommerce
   JWT_SECRET=your-secret-key
   PAYPAL_MODE=sandbox
   # Replace these with your actual PayPal Developer sandbox credentials
   # Get them from https://developer.paypal.com/dashboard
   PAYPAL_CLIENT_ID=your_paypal_client_id
   PAYPAL_CLIENT_SECRET=your_paypal_client_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

4. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

5. **Seed the database (optional)**
   ```bash
   cd ../server
   node seedData.js
   ```

6. **Start the development servers**

   Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

   Start the frontend application (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

7. **Access the application**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## PayPal Integration

To enable PayPal payments:

1. Create a developer account at [PayPal Developer Portal](https://developer.paypal.com/)
2. Create a sandbox application to obtain test credentials
3. Update the `.env` file with your PayPal credentials:
   ```
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_actual_client_id
   PAYPAL_CLIENT_SECRET=your_actual_client_secret
   ```
4. For testing, use PayPal sandbox accounts to process test payments

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/check-auth` - Check authentication status

### Products (Shop)
- `GET /api/shop/products/get` - Get all products with filtering
- `GET /api/shop/products/get/:id` - Get a single product

### Products (Admin)
- `POST /api/admin/products/add` - Add a new product
- `PUT /api/admin/products/edit/:id` - Edit a product
- `DELETE /api/admin/products/delete/:id` - Delete a product
- `POST /api/admin/products/upload-image` - Upload product image

### Cart
- `POST /api/shop/cart/add` - Add item to cart
- `GET /api/shop/cart/get/:userId` - Get user's cart
- `DELETE /api/shop/cart/:userId/:productId` - Remove item from cart

### Orders
- `POST /api/shop/order/create` - Create a new order
- `POST /api/shop/order/capture` - Capture PayPal payment
- `GET /api/shop/order/list/:userId` - Get user's orders
- `GET /api/shop/order/details/:id` - Get order details
- `GET /api/shop/order/debug-paypal` - Debug PayPal connection

### Admin Orders
- `GET /api/admin/orders/get` - Get all orders
- `GET /api/admin/orders/details/:id` - Get order details
- `PUT /api/admin/orders/update/:id` - Update order status

### Feature Images (Banners)
- `POST /api/common/feature-image/add` - Add a new banner image
- `GET /api/common/feature-image/get` - Get all banner images

## User Guide

### Admin Account
- Email: admin@example.com
- Password: admin123

### Admin Dashboard
- Access at: [http://localhost:5173/admin/dashboard](http://localhost:5173/admin/dashboard)
- Manage products: [http://localhost:5173/admin/products](http://localhost:5173/admin/products)
- Manage orders: [http://localhost:5173/admin/orders](http://localhost:5173/admin/orders)
- Manage banners: [http://localhost:5173/admin/features](http://localhost:5173/admin/features)

### Customer Experience
- Register: [http://localhost:5173/auth/register](http://localhost:5173/auth/register)
- Login: [http://localhost:5173/auth/login](http://localhost:5173/auth/login)
- Browse products: [http://localhost:5173/shop/home](http://localhost:5173/shop/home)
- View products by category: [http://localhost:5173/shop/listing](http://localhost:5173/shop/listing)
- Checkout: [http://localhost:5173/shop/checkout](http://localhost:5173/shop/checkout)
- Account management: [http://localhost:5173/shop/account](http://localhost:5173/shop/account)
- Payment return: [http://localhost:5173/shop/paypal-return](http://localhost:5173/shop/paypal-return)

## Recent Enhancements

### Banner System
- Enhanced home page banner carousel with improved transitions and controls
- Added gradient overlays for better text visibility
- Implemented responsive sizing for different screen sizes
- Created admin interface for banner management

### PayPal Integration
- Integrated PayPal sandbox for payment processing
- Added PayPal SDK support with proper error handling
- Implemented payment capture and processing logic
- Created debug endpoints for testing PayPal connectivity

## Future Enhancements
- Wishlist functionality
- Advanced product filtering and sorting
- Email notifications
- Multiple payment gateways
- Discount and coupon system
- Product variations and attributes
- Inventory management
- Advanced analytics dashboard

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License. 