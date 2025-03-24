// src/components/Login.jsx
import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            alert('გთხოვთ შეავსოთ ყველა ველი!');
            return;
        }

        // Here you would typically make an API call to authenticate
        // For demo purposes, we'll just show an alert
        alert(`წარმატებული ავტორიზაცია!\nEmail: ${email}`);

        // Reset form
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h2>ავტორიზაცია</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">ელ-ფოსტა</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="შეიყვანეთ ელ-ფოსტა"
                    />
                </div>
                <div>
                    <label htmlFor="password">პაროლი</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="შეიყვანეთ პაროლი"
                    />
                </div>
                <div>
                    <button type="submit">შესვლა</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
