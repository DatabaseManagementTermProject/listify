import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./login_style.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        // matches the SQL query data for users table
        email: '',
        password: '',
    });

const handleSubmit = (e) => {
    // extracts name and value from user input
    const { name, value } = e.target;
    // updates formData with the new data
    setData({ ...data, [name]: value });
}

const handleLogin = async (e) => {
    e.preventDefault();

    // Send a POST request to your backend API for login
    try {
        const response = await fetch('http://localhost:3002/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            navigate('/');
          } else if (response.status === 401) {
            console.error("Invalid credentials. Please check your email and password.");
          } else {
            console.error("An error occurred. Please try again later.");
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
            <Form className="col-md-4 mx-auto" onSubmit={handleLogin}>
                <Form.Group size="lg" controlId="email">
                    <Form.Control
                        autoFocus
                        type="text"
                        name="email"
                        value={data.email}
                        onChange={handleSubmit}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Control
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleSubmit}
                />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                Login
                </Button>
            </Form>
            <p style={{color: "white", fontFamily: "'league spartan', sans-serif"}}> Don't have an account? <a href="http://localhost:3000/register">Register here.</a></p>

        </div>
    </div>
);}