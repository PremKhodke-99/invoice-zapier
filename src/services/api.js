import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const fetchInvoices = () => API.get("/api/invoices");

export const triggerAutomation = (invoiceId) =>
  API.post("/api/zapier/trigger", { invoiceId });
