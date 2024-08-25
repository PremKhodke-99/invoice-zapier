import React from 'react';
import './Toast.module.css'; // Updated path

const Toast = ({ message, onClose }) => {
    return (
        <div className="toast">
            {message}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Toast;