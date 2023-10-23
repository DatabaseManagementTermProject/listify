import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        // matches the SQL query data for users table
        userName: '',
        email: '',
        password: '',
    });

const handleSubmit = (e) => {
    // extracts name and value from user input
    const { name, value } = e.target;
    // updates formData with the new data
    setFormData({ ...formData, [name]: value });
}

const handleRegistration = async (e) => {
    // stop page from refreshing on submission
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3002/register', {
        // specifies the data should be sent to the server
        method: 'POST',
        headers: {
            // sets content of the request to json
            'Content-Type': 'application/json',
        },
        // convert data in formData to json string
        body: JSON.stringify(formData),
        });

        // tests if submission was successful
        if (response.ok) {
            console.log('Registration successful');
        } else {
            console.error('Registration failed. Status:', response.status, 'Status Text:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

return(
        <Form onSubmit={handleRegistration}>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    name="userName"
                    placeholder="Username"
                    value={formData.userName}
                    onChange={handleSubmit}
                />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleSubmit}
                />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleSubmit}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register Account
            </Button>
        </Form>
    );
}

export default RegistrationForm;

export function UserRegistrationButton() {
    const [showButtons, setShowButtons] = useState(false);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
    const toggleButtons = (show) => {
      setShowButtons(show);
    };
  
    const openRegistrationForm = () => {
      setShowRegistrationForm(true);
    };
  
    const closeRegistrationForm = () => {
      setShowRegistrationForm(false);
    };
    return (
        <div className="login-link">
            <div className="login">
                <p style={{ fontSize: 15, display: 'inline-block', marginRight: '10px' }}> Login/Register </p>
                <img
                src="https://i.ibb.co/yYnRgdP/personalization.png"
                style={{ width: '40px', height: 'auto' }}
                onMouseEnter={() => toggleButtons(true)}
                onMouseLeave={() => toggleButtons(false)}
                />
            </div>
        {showButtons && (
          <div className="hoverable-area">
            <center>
            <button class="button-20" role="button" onClick={openRegistrationForm}>Register</button>
            <p> or </p>
            <button class="button-20" role="button">Login</button>
            </center>
            </div>
        )}
        {showRegistrationForm && <RegistrationForm />}
      </div>
    );
  }