# Shopnetic - MERN E-commerce Platform

> **Admin Credentials**  
> Email: admin@example.com  
> Password: admin123

A modern e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Key Features

### User Features
- Browse products by categories
- Search and filter products
- Shopping cart and secure checkout
- User account management
- Order tracking

### Admin Panel
- Product management (CRUD operations)
- Order processing
- Category management
- Inventory control

## Tech Stack
- **Frontend**: React.js, Redux, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT

## Quick Start

1. Clone the repository
   ```bash
   git clone [repository-url]
   cd mern-e-commerce
   ```

2. Install dependencies
   ```bash
   # Backend
   cd server
   npm install
   
   # Frontend
   cd ../client
   npm install
   ```

3. Start the application
   ```bash
   # In server directory
   npm run dev
   
   # In client directory (new terminal)
   npm start
   ```

### Environment Variables

Create `.env` files in both `client` and `server` directories with required configurations.

#### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/

/api
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

