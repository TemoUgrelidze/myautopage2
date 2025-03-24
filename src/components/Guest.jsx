// src/components/Guest.jsx
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Guest = () => {
    const navigate = useNavigate();

    const handleRegistration = () => {
        navigate('/login');
    };


    return (
        <div className="guest-button-container">
            <button className="guest-button" onClick={handleRegistration}>
                <FaUser className="guest-icon" />
                <span>შესვლა</span>
            </button>
        </div>
    );
};

export default Guest;
