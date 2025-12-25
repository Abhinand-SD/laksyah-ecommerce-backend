🛒 E-Commerce Backend API (MERN Stack)

A scalable and secure E-commerce backend application built using Node.js, Express.js, MongoDB, following MVC architecture.
This project handles authentication, product management, cart, orders, payments, and admin controls for a full-fledged e-commerce platform.

🚀 Features
🔐 Authentication & Authorization

User Signup & Login

JWT-based Authentication (Access & Refresh Tokens)

Secure password hashing (bcrypt)

Role-based access (Admin / User)

Session & Cookie handling

👤 User Management

User registration with validation

Block / Unblock users (Admin)

View & manage users (Admin)

🛍️ Product Management

Add / Edit / Delete products (Admin)

Soft delete support

Multiple product images (min 3)

Image cropping & resizing before upload

Cloudinary image storage

Product categories

🗂️ Category Management

Add, edit, delete categories

Soft delete categories

Category-based product listing

🛒 Cart & Orders

Add to cart

Update cart quantity

Remove from cart

Place orders

Order status management

Stock validation (Out of Stock / Sold Out)

💳 Payment Integration

Stripe payment gateway

Secure checkout session

Order verification after payment

Metadata handling for user & order tracking

📦 Other Features

MVC folder structure

RESTful API design

Environment-based configuration

Error handling & validation

CORS enabled

🧑‍💻 Tech Stack
Technology	Usage
Node.js	Backend runtime
Express.js	Web framework
MongoDB	Database
Mongoose	ODM
JWT	Authentication
bcrypt	Password hashing
Cloudinary	Image storage
Stripe	Payment gateway
Multer	File uploads
dotenv	Environment variables
📁 Folder Structure
backend/
│
├── config/
│   ├── mongodb.js
│   ├── cloudinary.js
│
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── orderController.js
│
├── models/
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Order.js
│
├── routes/
│   ├── userRoute.js
│   ├── productRoute.js
│   ├── cartRoute.js
│   ├── orderRoute.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── adminMiddleware.js
│
├── utils/
│   ├── generateToken.js
│
├── .env
├── server.js
├── package.json
└── README.md

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000

🛠️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/ecommerce-backend.git
cd ecommerce-backend

2️⃣ Install Dependencies
npm install

3️⃣ Start the Server
npm run dev


Server will run on:

http://localhost:5000

🔗 API Endpoints (Sample)
Auth

POST /api/user/signup

POST /api/user/login

Products

GET /api/product

POST /api/product/add (Admin)

PUT /api/product/edit/:id (Admin)

Cart

POST /api/cart/add

GET /api/cart

Orders

POST /api/order/create

GET /api/order/user-orders

🔐 Security Practices

Passwords hashed using bcrypt

JWT-based route protection

Admin-only route middleware

Secure cookie handling

Input validation

📌 Future Improvements

Wishlist feature

Coupon & discount system

Product reviews & ratings

Invoice generation

Admin analytics dashboard

👨‍🎓 Author

Abhinand SD
Full Stack Developer (MERN)
Self-learned | Project-focused | Backend & Frontend
