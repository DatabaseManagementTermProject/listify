import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import './registration_style.css'

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
            'Accept': 'application/json',
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

    <div className = "register">
        <div className = "centered-form">
        <Form className="col-md-4 mx-auto" onSubmit={handleRegistration}>
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
        </div>
    </div>
    );

}

export default RegistrationForm;
