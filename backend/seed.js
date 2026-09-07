
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import User from "./model/user.js";
import Product from "./model/product.js";
import Order from "./model/Order.js";

const seed = async () => {
	try {
		await connectDB();

		// Clear existing data
		await Order.deleteMany({});
		await Product.deleteMany({});
		await User.deleteMany({});

		// Create users (passwords hashed)
		const users = [
			{
				name: "Admin User",
				email: "admin@example.com",
				password: bcrypt.hashSync("admin123", 10),
				role: "admin",
				verified: true,
			},
			{
				name: "John Doe",
				email: "john@example.com",
				password: bcrypt.hashSync("password123", 10),
			},
			{
				name: "Jane Smith",
				email: "jane@example.com",
				password: bcrypt.hashSync("password123", 10),
			},
		];

		const createdUsers = await User.insertMany(users);

		// Create products
		const products = [
			{
				name: "Classic T-Shirt",
				description: "Comfortable cotton t-shirt",
				price: 19.99,
				category: "Clothing",
				stock: 150,
				imageUrls: "https://via.placeholder.com/400x400.png?text=T-Shirt",
			},
			{
				name: "Running Sneakers",
				description: "Lightweight running sneakers",
				price: 79.99,
				category: "Footwear",
				stock: 60,
				imageUrls: "https://via.placeholder.com/400x400.png?text=Sneakers",
			},
			{
				name: "Wireless Headphones",
				description: "Noise-cancelling over-ear headphones",
				price: 129.99,
				category: "Electronics",
				stock: 40,
				imageUrls: "https://via.placeholder.com/400x400.png?text=Headphones",
			},
			{
				name: "Coffee Mug",
				description: "Ceramic mug, 350ml",
				price: 9.99,
				category: "Home",
				stock: 300,
				imageUrls: "https://via.placeholder.com/400x400.png?text=Mug",
			},
			{
				name: "Notebook",
				description: "Hardcover notebook, 200 pages",
				price: 14.5,
				category: "Stationery",
				stock: 120,
				imageUrls: "https://via.placeholder.com/400x400.png?text=Notebook",
			},
		];

		const createdProducts = await Product.insertMany(products);

		// Create a sample order for John Doe
		const customer = createdUsers.find((u) => u.email === "john@example.com");
		const orderedItems = [
			{
				productId: createdProducts[0]._id,
				quantity: 2,
				price: createdProducts[0].price,
			},
			{
				productId: createdProducts[2]._id,
				quantity: 1,
				price: createdProducts[2].price,
			},
		];

		const totalAmount = orderedItems.reduce(
			(sum, it) => sum + it.quantity * it.price,
			0
		);

		const order = {
			user: customer._id,
			items: orderedItems,
			totalAmount,
			address: {
				fullName: "John Doe",
				street: "123 Main St",
				city: "Anytown",
				postalCode: "12345",
				country: "USA",
			},
			paymentId: "pi_dummy_12345",
			status: "pending",
		};

		await Order.create(order);

		console.log("Seed data inserted successfully.");
		process.exit(0);
	} catch (error) {
		console.error("Seeding error:", error);
		process.exit(1);
	}
};

seed();

