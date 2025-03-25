import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the login logic
        console.log('Login attempt with:', { email, password, rememberMe });
        // For now, just redirect back to home
        navigate('/');
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-header">
                    <h1>შესვლა</h1>
                    <p>გთხოვთ შეიყვანოთ თქვენი მონაცემები</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">ელ-ფოსტა</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="შეიყვანეთ ელ-ფოსტა"
                            required
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
                            required
                        />
                    </div>

                    <div className="remember-me">
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember">დამიმახსოვრე</label>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="back-btn" onClick={handleBack}>
                            <FaArrowLeft style={{ marginRight: '8px' }} />
                            უკან
                        </button>
                        <button type="submit" className="login-submit-btn">
                            შესვლა
                        </button>
                    </div>
                </form>

                <div className="forgot-password">
                    <a href="#">დაგავიწყდათ პაროლი?</a>
                </div>

                <div className="register-link">
                    <p>არ გაქვთ ანგარიში? <a href="#">რეგისტრაცია</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
