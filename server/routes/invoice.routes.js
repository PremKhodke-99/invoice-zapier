const express = require("express");
const router = express.Router();
const axios = require("axios");
const Invoice = require("../models/invoice");
const { ensureAuthenticated } = require("../middleware/auth");

// Dummy data for invoices
const invoices = [
  {
    id: 1,
    description: "Phone Bill",
    amount: 100,
    dueDate: "2024-08-01",
  },
  {
    id: 2,
    description: "Electricity Bill",
    amount: 150,
    dueDate: "2024-08-05",
  },
  {
    id: 3,
    description: "Water Bill",
    amount: 80,
    dueDate: "2024-09-10",
  },
  {
    id: 4,
    description: "Insurance Bill",
    amount: 200,
    dueDate: "2024-09-15",
  },
  {
    id: 5,
    description: "Land Bill",
    amount: 500,
    dueDate: "2024-10-20",
  },
];

router.get("/", ensureAuthenticated, async (req, res) => {
  const invoices = await Invoice.find({ userId: req.user._id });
  res.json(invoices);
});

router.post("/add", ensureAuthenticated, async (req, res) => {
  const { amount, dueDate, recipient } = req.body;
  const newInvoice = new Invoice({
    userId: req.user._id,
    amount,
    dueDate,
    recipient,
  });
  await newInvoice.save();
  res.json(newInvoice);
});

router.get("/due-invoices", (req, res) => {
  res.json(invoices);
});

router.post("/trigger-zapier", async (req, res) => {
  const { invoiceId } = req.body;

  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;

  const invoice = invoices.find((inv) => inv.id === invoiceId);

  if (!invoice) {
    return res.status(404).json({ error: "Invoice not found" });
  }

  try {
    await axios.post(zapierWebhookUrl, { invoice });

    res.status(200).json({ message: "Reminder triggered successfully" });
  } catch (error) {
    console.error("Error triggering Zapier:", error);
    res.status(500).json({ error: "Failed to trigger reminder" });
  }
});

module.exports = router;
