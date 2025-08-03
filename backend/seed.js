const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config({ path: './config.env' });

const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    price: 999.99,
    description: 'Latest iPhone with advanced camera system and A17 Pro chip',
    stock: 50,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
    category: 'Electronics'
  },
  {
    name: 'MacBook Air M2',
    price: 1199.99,
    description: 'Ultra-thin laptop with M2 chip for incredible performance',
    stock: 30,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    category: 'Electronics'
  },
  {
    name: 'Sony WH-1000XM4',
    price: 349.99,
    description: 'Industry-leading noise canceling wireless headphones',
    stock: 25,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    category: 'Electronics'
  },
  {
    name: 'Nike Air Max 270',
    price: 150.00,
    description: 'Comfortable running shoes with Air Max technology',
    stock: 100,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Sports'
  },
  {
    name: 'Samsung 4K Smart TV',
    price: 799.99,
    description: '55-inch 4K Ultra HD Smart TV with Crystal Display',
    stock: 20,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/in/ua55du8300ulxl/gallery/in-crystal-uhd-du8000-ua55du8300ulxl-540319855?$684_547_PNG$',
    category: 'Electronics'
  },
  {
    name: 'Coffee Maker Pro',
    price: 89.99,
    description: 'Programmable coffee maker with 12-cup capacity',
    stock: 75,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    category: 'Home & Kitchen'
  },
  {
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    description: 'High-precision gaming mouse with RGB lighting',
    stock: 60,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
    category: 'Electronics'
  },
  {
    name: 'Yoga Mat Premium',
    price: 45.00,
    description: 'Non-slip yoga mat with carrying strap',
    stock: 200,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    category: 'Sports'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing products
    await Product.deleteMany({});

    // Insert sample products
    await Product.insertMany(sampleProducts);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase(); 