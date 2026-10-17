# ShopNest — Full-Stack E-Commerce Application

ShopNest is a full-stack e-commerce application built with the MERN stack. It is designed to provide a shopping experience with product management, user authentication, order processing, and online payments.

The project combines a React frontend with a Node.js and Express backend, MongoDB for data persistence, Stripe for payment processing, and Redis for caching-related functionality.

## 🚀 Tech Stack

### Frontend
- **React** — Component-based user interface
- **Vite** — Development server and build tooling
- **React Router** — Client-side navigation
- **Redux Toolkit** — Application state management
- **Tailwind CSS** — Responsive UI styling

### Backend
- **Node.js** — JavaScript runtime
- **Express.js** — REST API and server-side routing
- **MongoDB** — Database
- **Mongoose** — MongoDB object modelling
- **JWT** — Authentication
- **bcryptjs** — Password hashing
- **Cookie Parser** — Cookie handling
- **Multer** — File upload handling
- **Cloudinary** — Image storage and management
- **Nodemailer** — Email functionality
- **Redis** — Caching and related server-side operations
- **Stripe** — Payment processing

## ✨ Features

### 🛍️ E-Commerce Functionality
- Browse and manage product data.
- Support product images through Cloudinary integration.
- Manage shopping cart state using Redux Toolkit.
- Create and manage customer orders.
- Support online checkout using Stripe.

### 🔐 Authentication and Security
- JWT-based user authentication.
- HTTP-only cookies for handling authentication tokens.
- Password hashing with bcryptjs.
- User roles for regular users and administrators.
- Request validation and error handling.

### 💳 Payment Processing
- Stripe Checkout integration.
- Support for payments in Australian dollars (AUD).
- Payment session handling and order-related metadata.

### ⚡ Performance and Caching
- Redis integration for caching-related operations.
- Product caching to reduce repeated database queries where implemented.
- Cache invalidation considerations when product data changes.

### 🧑‍💼 Administration
- Role-based access for administrative product management.
- Backend API structure for managing products and related e-commerce operations.

## 🏗️ Project Structure

```text
ShopNest--Ecom-MERN/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── seed.js
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── package.json
├── package-lock.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the application:

- Node.js and npm
- MongoDB connection
- Redis server or Redis-compatible service
- Stripe account and API keys
- Cloudinary account for image uploads
- Email service credentials if using email functionality

### 1. Clone the repository

```bash
git clone https://github.com/Nayemcqu/ShopNest--Ecom-MERN.git
cd ShopNest--Ecom-MERN
```

### 2. Install dependencies

From the project root, run:

```bash
npm run install-all
```

This installs dependencies for the root project, backend, and frontend.

### 3. Configure environment variables

Create a `.env` file inside the `backend` directory and configure the variables required by your implementation.

Example configuration:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173

REDIS_URL=your_redis_connection_url

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

# Add your email-service variables if required
```

Use the exact variable names referenced in your backend source code. The example above is a template; it may need adjustments to match your current configuration.

**Important:** Never commit real API keys, passwords, database credentials, or other secrets to GitHub.

### 4. Start the application

Run both the backend and frontend from the project root:

```bash
npm run dev
```

The root script starts the backend and frontend concurrently.

The development URLs are typically:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

Check your terminal and environment configuration for the actual ports.

Alternatively, run the frontend and backend separately:

```bash
npm run dev:server
```

```bash
npm run dev:client
```

### 5. Seed the database

If your database seed script is configured, run:

```bash
npm run seed
```

Ensure MongoDB is available and the required environment variables are configured before seeding.

## 🔌 API Overview

The backend is organised into API route groups for the main e-commerce features.

| Route prefix | Purpose |
|---|---|
| `/api/auth` | User authentication |
| `/api/products` | Product operations |
| `/api/payment` | Payment-related operations |
| `/api/orders` | Order operations |
| `/api/analytics` | Analytics-related operations |

The exact endpoints and HTTP methods depend on the implemented backend routes.

## 🧠 Key Learning Outcomes

Building ShopNest provides practical experience with:

- Designing a full-stack MERN application.
- Connecting a React frontend to Express REST APIs.
- Implementing JWT authentication and role-based access.
- Working with MongoDB and Mongoose.
- Managing frontend state using Redux Toolkit.
- Integrating Stripe Checkout.
- Uploading and managing product images with Cloudinary.
- Using Redis for caching-related functionality.
- Configuring environment variables and preparing an application for deployment.

## 🔮 Potential Future Improvements

- Add automated tests for API endpoints and payment flows.
- Implement comprehensive product search, filtering, and pagination.
- Improve monitoring, logging, and API rate limiting.
- Add more extensive Redis cache invalidation and performance monitoring.
- Introduce automated deployment and continuous integration.
- Add inventory management and more detailed order tracking.

## 👨‍💻 Author

**Nayem Khan**

- GitHub: [@Nayemcqu](https://github.com/Nayemcqu)
- Project Repository: [ShopNest MERN](https://github.com/Nayemcqu/ShopNest--Ecom-MERN)

---

*ShopNest is a development project built for learning and demonstrating full-stack web development concepts.*
