// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            alert('გთხოვთ შეავსოთ ყველა ველი!');
            return;
        }

        // Here you would typically make an API call to authenticate
        alert(`წარმატებული ავტორიზაცია!\nEmail: ${email}`);

        // Reset form and navigate back to home
        setEmail('');
        setPassword('');
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>ავტორიზაცია</h1>
                </div>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">ელ-ფოსტა</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="შეიყვანეთ ელ-ფოსტა"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">პაროლი</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="შეიყვანეთ პაროლი"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="login-submit-btn">შესვლა</button>
                        <button type="button" className="back-btn" onClick={handleBack}>
                            უკან დაბრუნება
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
