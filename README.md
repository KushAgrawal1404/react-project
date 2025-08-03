# Github Link: https://github.com/KushAgrawal1404/react-project

# ShoppyGlobe E-commerce App with Node.js Backend 

A full-stack e-commerce application built with React frontend and Node.js/Express backend with MongoDB.

## 🚀 Features

- **User Authentication**: Register and login with JWT
- **Product Catalog**: Browse products with details
- **Shopping Cart**: Add, update, and remove items
- **User-specific Carts**: Persistent cart data per user
- **Checkout Process**: Review cart and proceed to checkout
- **Responsive Design**: Works on desktop and mobile

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (installed and running locally)
- **Git** (optional)

## 🛠️ Installation

### 1. Clone/Extract the Project
```bash 
# If using git
git clone <repository-url>
cd react-project

# Or extract the zip file
# Navigate to the extracted folder
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd vite-project
npm install
```

### 3. Environment Setup(If not already done)

Create `backend/config.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### 4. Database Setup

**Start MongoDB:**
```bash
# MongoDB should be running on localhost:27017
# If not installed, follow MongoDB installation guide
```

**Seed the database:**
```bash
cd backend
node seed.js
```

### 5. Start the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
```
*Server runs on http://localhost:5000*

**Terminal 2 - Frontend App:**
```bash
cd vite-project
npm run dev
```
*App runs on http://localhost:5173*

## 🎯 Usage

1. **Register/Login**: Create an account or login
2. **Browse Products**: View product catalog
3. **Add to Cart**: Click "Add to Cart" on products
4. **Manage Cart**: View cart, update quantities, remove items
5. **Checkout**: Review cart and proceed to checkout

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart (Protected Routes)
- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add product to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart

## 🛡️ Security Features

- **JWT Authentication**: Secure user sessions
- **Protected Routes**: Cart operations require authentication
- **Input Validation**: Server-side validation for all inputs
- **Error Handling**: Comprehensive error responses

**Happy Shopping! 🛒**

# Github Link: https://github.com/KushAgrawal1404/react-project

