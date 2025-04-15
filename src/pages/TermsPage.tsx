import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-page">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to our website. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
      </p>
      <p>
        <strong>1. Acceptance of Terms</strong> By using our services, you agree to comply with and be legally bound by these Terms.
      </p>
      <p>
        <strong>2. Changes to Terms</strong> We may update these Terms from time to time. Continued use after changes constitutes acceptance.
      </p>
      <p>
        <strong>3. User Conduct</strong> You agree not to use our services for any unlawful purpose or in a way that disrupts others.
      </p>
      <button onClick={() => navigate('/register')} className="submit-button">
        Back to Register
      </button>
    </div>
  );
};

export default TermsPage;
export {}; // Added to make it a module