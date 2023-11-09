import React from 'react';
import supabase from './supabase';
import { useNavigate } from "react-router-dom";

function SignOut() {
    const navigate = useNavigate;

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error signing out:', error.message);
            } else {
                console.log('Signed out successfully');
                navigate('/login');
            }
    };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SignOut;
