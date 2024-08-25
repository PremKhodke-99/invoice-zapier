const mongoose = require("mongoose");
const Invoice = require("../models/invoice"); // Adjust the path according to your project structure
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const sampleInvoices = [
  {
    description: "Phone Bill",
    amount: 50.0,
    dueDate: new Date("2024-07-01"),
    recipient: "Phone Company",
    userId: "user123",
  },
  {
    description: "Electricity Bill",
    amount: 100.0,
    dueDate: new Date("2024-07-01"),
    recipient: "Electric Company",
    userId: "user123",
  },
  {
    description: "Water Bill",
    amount: 30.0,
    dueDate: new Date("2024-07-01"),
    recipient: "Water Company",
    userId: "user123",
  },
  {
    description: "Insurance Bill",
    amount: 200.0,
    dueDate: new Date("2024-07-01"),
    recipient: "Insurance Company",
    userId: "user123",
  },
  {
    description: "Land Bill",
    amount: 500.0,
    dueDate: new Date("2024-07-01"),
    recipient: "Land Department",
    userId: "user123",
  },
];

const seedInvoices = async () => {
  try {
    await Invoice.deleteMany({});
    await Invoice.insertMany(sampleInvoices);
    console.log("Sample invoices added.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding invoices:", error);
  }
};

seedInvoices();
