const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Check if Feature model exists, if not, create it
let Feature;
try {
  Feature = mongoose.model('Feature');
} catch (e) {
  const FeatureSchema = new mongoose.Schema({
    image: String
  }, { timestamps: true });
  Feature = mongoose.model('Feature', FeatureSchema);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch((error) => console.log(error));

// Sample Products
const products = [
  {
    image: 'https://m.media-amazon.com/images/I/71ZDY57yTQL._SX679_.jpg',
    title: 'Apple iPhone 14 Pro Max',
    description: 'The latest Apple smartphone with A16 Bionic chip',
    category: 'electronics',
    brand: 'Apple',
    price: 1099,
    salePrice: 999,
    totalStock: 50,
    averageReview: 4.8
  },
  {
    image: 'https://m.media-amazon.com/images/I/71k3fL5+30L._SX679_.jpg',
    title: 'Samsung Galaxy S22 Ultra',
    description: 'Premium Android smartphone with S Pen',
    category: 'electronics',
    brand: 'Samsung',
    price: 999,
    salePrice: 899,
    totalStock: 40,
    averageReview: 4.7
  },
  {
    image: 'https://m.media-amazon.com/images/I/71WtFY52CeL._SX679_.jpg',
    title: 'Sony WH-1000XM4',
    description: 'Premium Noise Cancelling Wireless Headphones',
    category: 'electronics',
    brand: 'Sony',
    price: 349,
    salePrice: 299,
    totalStock: 30,
    averageReview: 4.9
  },
  {
    image: 'https://m.media-amazon.com/images/I/619f09kK7tL._SX679_.jpg',
    title: 'Nike Air Force 1',
    description: 'Classic casual sneakers',
    category: 'clothing',
    brand: 'Nike',
    price: 100,
    salePrice: 90,
    totalStock: 100,
    averageReview: 4.5
  },
  {
    image: 'https://m.media-amazon.com/images/I/71hXJRYtZQL._SX679_.jpg',
    title: 'Adidas Ultraboost 22',
    description: 'Premium running shoes with Boost technology',
    category: 'clothing',
    brand: 'Adidas',
    price: 180,
    salePrice: 160,
    totalStock: 80,
    averageReview: 4.6
  }
];

// Sample Admin User
const adminUser = {
  userName: 'admin',
  email: 'admin@example.com',
  password: bcrypt.hashSync('admin123', 10),
  role: 'admin'
};

// Sample Feature Images
const featureImages = [
  {
    image: "https://img.freepik.com/premium-photo/explore-all-find-your-styles-discover-wearables-every-look-fashion-banner-with-models-colorful-background_136651-4910.jpg"
  },
  {
    image: "https://img.freepik.com/premium-photo/discover-all-brands-shop-all-brands-here-fashion-retail-wall-with-brand-logos_136651-4909.jpg"
  },
  {
    image: "https://img.freepik.com/premium-photo/everything-sale-shop-everything-promotional-banner-with-colorful-gift-boxes-shopping-carts_136651-4908.jpg"
  },
  {
    image: "https://img.freepik.com/premium-photo/summer-sale-up-50-off-promotional-banner-with-beach-scene-models-orange-accessories_136651-4907.jpg"
  }
];

// Seed Data Function
const seedData = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Feature.deleteMany({});
    
    // Insert products
    await Product.insertMany(products);
    console.log('Sample products added successfully');
    
    // Insert admin user
    await User.create(adminUser);
    console.log('Admin user created successfully');
    
    // Insert feature images
    await Feature.insertMany(featureImages);
    console.log('Feature images added successfully');
    
    console.log('Seed data complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData(); 