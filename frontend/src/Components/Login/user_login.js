import React, { useState } from "react";
import "./login_style.css";
import { supabase } from '../../database.js';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const navigate = useNavigate();
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const { user, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
  
        if (error) {
          console.error('Login error:', error);
        } else {
          console.log('Logged in as:', user);
          navigate('/allbooks');
        }
      } catch (error) {
        console.error('Login error:', error.message);
      }
    };
  
    return (
    <div className="Login">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
    );
  };
  
  export default Login;