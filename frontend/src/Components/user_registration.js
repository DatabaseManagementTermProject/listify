import React from "react";
import { useState } from "react";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        // matches the SQL query data for users table
        userName: '',
        password: '',
        locationCountry: '',
        locationState: '',
        locationCity: '',
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
        const response = await fetch('/register', {
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
        console.error('Registration failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

return(
    <form onSubmit={handleRegistration}>
    <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.userName}
        onChange={handleSubmit}
    /><br></br>
    <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleSubmit}
    /><br></br>
    <input
        type="text"
        name="locationcity"
        placeholder="City"
        value={formData.locationCity}
        onChange={handleSubmit}
    /><br></br>
    <input
        type="text"
        name="locationstate"
        placeholder="State"
        value={formData.locationState}
        onChange={handleSubmit}
    /><br></br>
    <input
        type="text"
        name="locationcountry"
        placeholder="Country"
        value={formData.locationCountry}
        onChange={handleSubmit}
    /><br></br>
    <button type="submit">Register Account</button>
    </form>
);
}

export default RegistrationForm;

export function UserRegistrationButton() {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
    const offRegistrationForm = () => {
      setShowRegistrationForm(!showRegistrationForm);
    };
  
    return (
      <div className="user-registration-container">
        <img
          src="https://i.ibb.co/yYnRgdP/personalization.png"
          style={{ width: '40px', height: 'auto' }}
          alt="User Icon"
          className="user-icon"
          onMouseEnter={() => setShowRegistrationForm(true)}
          onMouseLeave={() => setShowRegistrationForm(false)}
        />
        {showRegistrationForm && (
          <div className="hoverable-area">
            <button onClick={offRegistrationForm}>Register</button>
            <button>Login</button>
          </div>
        )}
        {showRegistrationForm && <RegistrationForm />}
      </div>
    );
  }