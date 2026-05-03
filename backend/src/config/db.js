// src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Recommended options for production
      maxPoolSize: 10,          // maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000,  // keep trying for 5 seconds
      socketTimeoutMS: 45000,   // close sockets after 45s of inactivity
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Handle connection events
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB error:', err.message);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error('💡 Check your MONGO_URI in .env file or IP whitelist');
    // Not exiting so that the AI Chatbot can still run
  }
};

export default connectDB;
