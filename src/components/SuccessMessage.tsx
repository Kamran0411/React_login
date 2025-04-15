interface SuccessMessageProps {
    activeTab: 'login' | 'register';
    email: string;
    name: string;
    setFormSubmitted: (value: boolean) => void;
  }
  
  const SuccessMessage: React.FC<SuccessMessageProps> = ({
    activeTab,
    email,
    name,
    setFormSubmitted,
  }) => {
    return (
      <div className="page-container">
        <div className="overlay"></div>
        <div className="success-card">
          <div className="success-content">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2>{activeTab === 'login' ? 'Welcome Back!' : 'Account Created!'}</h2>
            <p>
              {activeTab === 'login' ? `You've successfully logged in, ${email}.` : `Your account has been created, ${name}!`}
            </p>
            <button onClick={() => setFormSubmitted(false)} className="success-button">
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default SuccessMessage;