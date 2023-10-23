import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login_style.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

function validateForm() {
    return email.length > 0 && password.length > 0;
}

const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to your backend API for login
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.status === 200) {
            // Login was successful, handle the token and user session
        } else {
            // Display an error message to the user
            console.error("Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
};

document.body.style = 'background: white;';

return (
    <div className="Login">
        <div className="app-logo">
        <img src="https://i.ibb.co/dtbR9kL/i-m-bored-1.png"
        alt= "logo"
        style={{ width: '200px', height: 'auto' }}></img>
        </div>
        <div className="centered-form">
            <Form class="col-md-4 mx-auto" onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}> Login </Button>
            </Form>
        </div>
    </div>
);}