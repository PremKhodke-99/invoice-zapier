import React, { useEffect, useState } from 'react'
import { fetchInvoices, triggerAutomation } from '../services/api';

const Dashboard = () => {
    const [invoices, setInvoices] = useState([]);

    const getInvoices = async () => {
        const response = await fetchInvoices();
        setInvoices(response.data);
    };

    useEffect(() => {
        getInvoices();
    }, []);

    const handleTriggerAutomation = async (invoiceId) => {
        await triggerAutomation(invoiceId);
        alert('Automation triggered');
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                {
                    invoices.map((invoice) => (
                        <li key={invoice._id}>
                            <p>Amount: Rs. {invoice.amount}</p>
                            <p>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</p>
                            <p>Recipient: {invoice.recipient}</p>
                            <button onClick={() => handleTriggerAutomation(invoice._id)}>Trigger Automation</button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Dashboard