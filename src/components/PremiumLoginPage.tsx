import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import SuccessMessage from './SuccessMessage';
import { Fingerprint } from 'lucide-react';

const PremiumLoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [strength, setStrength] = useState<number>(0);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!password) {
      setStrength(0);
      return;
    }

    let score = 0;
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    setStrength(score);
  }, [password]);

  const getStrengthColor = (): string => {
    if (strength <= 1) return '#ef4444'; // Red
    if (strength <= 3) return '#eab308'; // Yellow
    return '#22c55e'; // Green
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (activeTab === 'login') {
        if (email && password) {
          setFormSubmitted(true);
        } else {
          setError('Please fill in all fields');
        }
      } else {
        if (name && email && password && confirmPassword) {
          if (password !== confirmPassword) {
            setError('Passwords do not match');
          } else if (strength < 3) {
            setError('Please use a stronger password');
          } else {
            setFormSubmitted(true);
          }
        } else {
          setError('Please fill in all fields');
        }
      }
      setIsLoading(false);
    }, 1500);
  };

  if (formSubmitted) {
    return (
      <SuccessMessage
        activeTab={activeTab}
        email={email}
        name={name}
        setFormSubmitted={setFormSubmitted}
      />
    );
  }

  return (
    <div className="page-container">
      <div className="overlay"></div>
      <div className="blur-circle blur-circle-top"></div>
      <div className="blur-circle blur-circle-bottom"></div>
      <div className="login-card">
        <div className="logo-container">
          <div className="logo">
            <Fingerprint size={24} color="#fff" />
          </div>
        </div>
        <div className="header">
          <h1>{activeTab === 'login' ? 'Sign In' : 'Create Account'}</h1>
          <p>{activeTab === 'login' ? 'Welcome back! Please enter your details' : 'Start your journey with us'}</p>
        </div>
        <div className="tabs">
          <button
            onClick={() => setActiveTab('login')}
            className={activeTab === 'login' ? 'tab active' : 'tab'}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={activeTab === 'register' ? 'tab active' : 'tab'}
          >
            Register
          </button>
        </div>
        {activeTab === 'login' ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            isLoading={isLoading}
            error={error}
            handleSubmit={handleSubmit}
          />
        ) : (
          <RegisterForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            strength={strength}
            getStrengthColor={getStrengthColor}
            isLoading={isLoading}
            error={error}
            handleSubmit={handleSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default PremiumLoginPage;