import Order from "../model/Order.js";
import stripe from "../config/stripe.js";

const createCheckoutSession = async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "No items provided"
            });
        }

        const lineItems = items.map((item) => ({
            price_data: {
                currency: "aud",
                product_data: {
                    name: item.name
                },
                unit_amount: Math.round(item.price * 100)
            },
            quantity: item.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: lineItems,

            mode: "payment",

            success_url:
                "http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}",

            cancel_url:
                "http://localhost:5173/payment-cancel",

            metadata: {
                userId: req.user._id.toString(),
                totalAmount: totalAmount.toString(),
                address: JSON.stringify(address)
            }
        });

        res.json({
            url: session.url
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating Stripe checkout session",
            error: error.message
        });
    }
};


const createOrderAfterPayment = async (req, res) => {
    try {
        const { sessionId, items, totalAmount, address } = req.body;

        if (!sessionId) {
            return res.status(400).json({
                message: "Session ID is required"
            });
        }

        // Get the Checkout Session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Make sure payment was successful
        if (session.payment_status !== "paid") {
            return res.status(400).json({
                message: "Payment has not been completed"
            });
        }

        // Get Stripe PaymentIntent ID
        const paymentId = session.payment_intent;

        // Create your MongoDB order
        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });
    }
};


export {
    createCheckoutSession,
    createOrderAfterPayment
};