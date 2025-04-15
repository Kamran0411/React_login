import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="welcome-page">
      <h1>Welcome!</h1>
      <p>You have successfully logged in.</p>
      <button onClick={handleLogout} className="submit-button">
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default WelcomePage;
export {}; // Added to make it a module