import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../database.js';
import "./registration_style.css"

function UserRegistration () {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const navigate = useNavigate();

    const handleRegistration = async () => {

        if (password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
          }

        try {
            const { error } = await supabase.auth.signUp({
                email, password });

            if (error) {
                console.error(error);
            }
            else {
                navigate('/login');
            }
        } catch (error) {
            console.error("Error signing up user:", error);
        }
    }

return(
    <div className = "register-container">
        <img className="login-logo" src="Listify-color.png" alt="logo"/>
        <Form onSubmit={handleRegistration}>
            <Form.Group controlId="username">
                <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value) }
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={ (e) => setEmail(e.target.value) }
                    required
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={ (e) => setPassword(e.target.value) }
                    required
                />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={ (e) => setConfirmPassword(e.target.value) }
                    required
                />
            </Form.Group>
            {passwordMatchError && <p className="error-message">{passwordMatchError}</p>}

            <button className="button-59" type="button" onClick={handleRegistration}>
                Register Now
            </button>
        </Form>
    </div>
    );
}

export default UserRegistration;
