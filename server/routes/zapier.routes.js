const router = require('express').Router();
const axios = require('axios');
const Invoice = require('../models/invoice');

router.post('/trigger', async (req, res) => {
  const { invoiceId } = req.body;
  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    return res.status(404).send('Invoice not found');
  }

  // Trigger Zapier webhook
  try {
    await axios.post(process.env.ZAPIER_WEBHOOK_URL, {
      invoiceId: invoice._id,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      recipientEmail: invoice.recipientEmail,
    });
    res.status(200).send('Zapier automation triggered');
  } catch (error) {
    res.status(500).send('Error triggering Zapier');
  }
});

module.exports = router;