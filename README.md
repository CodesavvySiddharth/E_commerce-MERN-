# Shopnetic - MERN E-commerce Platform

Shopnetic is a modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). It offers a seamless shopping experience with a beautiful UI and robust functionality.

## Features

### User Features
- **Product Browsing**
  - Browse products by categories (Men, Women, Kids, Footwear, Accessories)
  - Search functionality with real-time results
  - Product filtering and sorting options
  - Detailed product views with images and descriptions

- **Shopping Experience**
  - User-friendly shopping cart
  - Secure checkout process
  - Multiple payment options
  - Order tracking and history

- **User Account**
  - Personal account management
  - Order history
  - Saved addresses
  - Wishlist functionality

### Admin Features
- **Product Management**
  - Add, edit, and delete products
  - Manage product categories
  - Update product inventory

- **Order Management**
  - View and process orders
  - Update order status
  - Order analytics

### Technical Features
- Responsive design for all devices
- Modern UI with Tailwind CSS
- Real-time updates
- Secure authentication
- RESTful API architecture

## Technology Stack

### Frontend
- React.js
- Redux for state management
- Tailwind CSS for styling
- React Router for navigation
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd mern-e-commerce
```

2. Install dependencies for both frontend and backend
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
Create `.env` files in both client and server directories with necessary configurations.

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server
cd ../client
npm run dev
```

### Environment Variables

#### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
mern-e-commerce/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store configuration
│   │   └── config/       # Configuration files
│   └── public/           # Static files
└── server/               # Backend Node.js application
    ├── controllers/      # Route controllers
    ├── models/          # Database models
    ├── routes/          # API routes
    └── middleware/      # Custom middleware
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors who have helped shape Shopnetic
- Special thanks to the open-source community for the amazing tools and libraries 