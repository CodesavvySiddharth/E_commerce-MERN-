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