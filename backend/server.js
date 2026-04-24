const express = require("express");
const cors = require("cors");
const Stripe = require("stripe");

const app = express();

app.use(cors());
app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

app.post("/payment", async (req, res) => {
  try {
    const { items } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      mode: "payment",

      line_items: items.map(item => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.title
          },
          unit_amount: Math.round(Number(item.price) * 100)
        },
        quantity: Number(item.quantity)
      })),

      success_url: "http://localhost:5173/sucesso",
      cancel_url: "http://localhost:5173/checkout"
    });

    res.json({
      url: session.url
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Stripe rodando porta 3000");
});