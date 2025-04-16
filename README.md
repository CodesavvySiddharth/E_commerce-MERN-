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

## Deployment

### Vercel Deployment (Frontend)

1. **Prepare your frontend for deployment**
   ```bash
   cd client
   # Add vercel.json in the client directory
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

2. **Deploy to Vercel**
   - Install Vercel CLI: `npm install -g vercel`
   - Login to Vercel: `vercel login`
   - Deploy: `vercel`
   - Follow the prompts to configure your project
   - Set environment variables in Vercel dashboard:
     - `VITE_API_URL`: Your backend API URL

### Heroku Deployment (Backend)

1. **Prepare your backend for deployment**
   ```bash
   cd server
   # Create Procfile in the server directory
   echo "web: node index.js" > Procfile
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "start": "node index.js",
       "dev": "nodemon index.js"
     },
     "engines": {
       "node": ">=14.0.0"
     }
   }
   ```

3. **Deploy to Heroku**
   - Install Heroku CLI: `npm install -g heroku`
   - Login to Heroku: `heroku login`
   - Create Heroku app: `heroku create your-app-name`
   - Add MongoDB addon: `heroku addons:create mongodb:your-plan`
   - Set environment variables:
     ```bash
     heroku config:set JWT_SECRET=your_jwt_secret
     heroku config:set NODE_ENV=production
     ```
   - Deploy your code:
     ```bash
     git add .
     git commit -m "Prepare for deployment"
     git push heroku main
     ```

4. **Configure CORS**
   - Update your backend CORS configuration to allow requests from your Vercel frontend:
   ```javascript
   // server/index.js or server/app.js
   app.use(cors({
     origin: ['https://your-frontend-url.vercel.app', 'http://localhost:5173'],
     credentials: true
   }));
   ```

### Alternative Deployment Options

1. **Railway.app**
   - Easy deployment for both frontend and backend
   - Offers free tier with automatic deployments
   - Visit [Railway.app](https://railway.app) for more details

2. **Render.com**
   - Supports both static sites and Node.js services
   - Offers free tier with automatic deployments
   - Visit [Render.com](https://render.com) for more details

### Post-Deployment Steps

1. **Update Environment Variables**
   - Frontend: Update VITE_API_URL to point to your Heroku backend
   - Backend: Ensure all environment variables are set in Heroku dashboard

2. **Database Configuration**
   - Ensure MongoDB connection string is properly set in Heroku
   - Consider using MongoDB Atlas for better database management

3. **Monitor Your Application**
   - Use Heroku logs: `heroku logs --tail`
   - Set up error tracking (e.g., Sentry)
   - Monitor application performance

4. **SSL Configuration**
   - Vercel provides SSL by default
   - Heroku provides SSL on paid dynos
   - Ensure all requests use HTTPS

### Common Deployment Issues

1. **Build Failures**
   - Check build logs for errors
   - Ensure all dependencies are properly listed in package.json
   - Verify node version compatibility

2. **Database Connection Issues**
   - Verify MongoDB connection string
   - Check network access settings in MongoDB Atlas
   - Ensure proper error handling for database connections

3. **CORS Issues**
   - Verify CORS configuration in backend
   - Check frontend API URL configuration
   - Use proper credentials handling

4. **Environment Variables**
   - Double-check all required environment variables are set
   - Verify variable names match between local and deployment
   - Ensure sensitive data is properly secured 