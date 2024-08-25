import React from 'react';
import { Link } from 'react-router-dom';
import './Home.module.css';


const Home = () => {

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/google';
    };

    return (
        <div className="home-container">
            <h1>Welcome to Invoice Reminder</h1>
            <div className="button-container">
                <button onClick={handleGoogleLogin}>Login with Google</button>
                <Link to="http://localhost:3000/invoices" className="home-btn">View Invoices</Link>
            </div>
        </div>
    );
};

export default Home;