// Login.js
import React from 'react';
import { useAuth } from './AuthContext'; // Adjust the import based on your folder structure

const Login = () => {
    const { login } = useAuth();

    const handleLogin = () => {
        // Simulate login logic; replace with actual logic
        login();
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
            {/* You can add a form for username/password here */}
        </div>
    );
};

export default Login;