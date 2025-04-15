import { Eye, EyeOff, ChevronRight, Mail, Lock, User, AlertCircle, Facebook, Twitter, Github } from 'lucide-react';

interface RegisterFormProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  strength: number;
  getStrengthColor: () => string;
  isLoading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  strength,
  getStrengthColor,
  isLoading,
  error,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      {error && (
        <div className="error-message">
          <AlertCircle size={20} color="#fca5a5" />
          <p>{error}</p>
        </div>
      )}
      <div className="form-group">
        <label>Full Name</label>
        <div className="input-container">
          <User size={18} className="input-icon" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="John Doe"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <div className="input-container">
          <Mail size={18} className="input-icon" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="your@email.com"
          />
        </div>
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="input-container">
          <Lock size={18} className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input password-input"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="show-password"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {password && (
          <div className="password-strength">
            <div className="strength-label">
              <span>Password strength</span>
              <span>{strength <= 1 ? 'Weak' : strength <= 3 ? 'Medium' : 'Strong'}</span>
            </div>
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{ width: `${(strength / 5) * 100}%`, backgroundColor: getStrengthColor() }}
              ></div>
            </div>
            <p className="strength-hint">
              Include uppercase letters, numbers, and special characters for a stronger password
            </p>
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <div className="input-container">
          <Lock size={18} className="input-icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? (
          <span className="loading">
            <svg className="spinner" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Creating account...
          </span>
        ) : (
          <span className="button-content">
            <ChevronRight size={18} />
            Create account
          </span>
        )}
      </button>
      <div className="divider">
        <span>Or continue with</span>
      </div>
      <div className="social-buttons">
        <a href="#" className="social-button">
          <Facebook size={18} color="#3b5998" />
        </a>
        <a href="#" className="social-button">
          <Twitter size={18} color="#1da1f2" />
        </a>
        <a href="#" className="social-button">
          <Github size={18} color="#333" />
        </a>
      </div>
      <div className="footer">
        <p>
          Already have an account?{' '}
          <a href="#" className="link">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;