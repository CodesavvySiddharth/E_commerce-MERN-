const cloudinary = require('cloudinary').v2;
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Log environment variables
console.log('Environment variables:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '(set)' : '(not set)');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '(set)' : '(not set)');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const testUpload = async () => {
  try {
    // Create a simple test image
    const testImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    
    console.log('Attempting to upload test image to Cloudinary...');
    const result = await cloudinary.uploader.upload(testImageData);
    
    console.log('Test upload successful!');
    console.log('Image URL:', result.url);
    console.log('Image ID:', result.public_id);
    console.log('Full result:', result);
    
    return result;
  } catch (error) {
    console.error('Error uploading test image:', error.message);
    if (error.http_code) {
      console.error(`HTTP Error ${error.http_code}: ${error.message}`);
    }
    throw error;
  }
};

// Run the test
testUpload()
  .then(() => console.log('Test completed successfully'))
  .catch(err => console.error('Test failed:', err.message)); 