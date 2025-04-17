import {
  Eye,
  EyeOff,
  ChevronRight,
  Mail,
  Lock,
  User,
  AlertCircle,
  Calendar,
  Phone,
} from "lucide-react";
import React, { ChangeEvent } from "react";
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
  dateOfBirth: string;
  setDateOfBirth: (value: string) => void;
  isValidAge: boolean;
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  successMessage: string;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  dateOfBirth,
  setDateOfBirth,
  isValidAge,
  mobileNumber,
  setMobileNumber,
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
  successMessage,
}) => {
  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDate = e.target.value; // This will be in the format YYYY-MM-DD
    setDateOfBirth(inputDate); // Update the state with the YYYY-MM-DD format
  };

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
            required
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
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <div className="input-container">
          <Phone size={18} className="input-icon" />
          <input
            type="test"
            value={mobileNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "" || (/^\d+$/.test(value) && value.length <= 10)) {
                setMobileNumber(value);
              }
            }}
            className="input"
            placeholder="10-digit mobile number"
            maxLength={10}
            required
          />
        </div>
      </div>
      <div className="form-group">
        <label>Date of Birth</label>
        <div className="input-container">
          <Calendar size={18} className="input-icon" />
          <input
            type="date"
            value={dateOfBirth} // Directly bind the state in YYYY-MM-DD format
            onChange={handleDateChange} // Update the state when the user selects a date
            className="input"
            required
          />
        </div>
        {dateOfBirth && !isValidAge && (
          <p className="age-error">
            You must be at least 15 years old to register
          </p>
        )}
      </div>
      <div className="form-group">
        <label>Password</label>
        <div className="input-container">
          <Lock size={18} className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input password-input"
            placeholder="••••••••"
            required
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
              <span>
                {strength <= 1 ? "Weak" : strength <= 3 ? "Medium" : "Strong"}
              </span>
            </div>
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{
                  width: `${(strength / 5) * 100}%`,
                  backgroundColor: getStrengthColor(),
                }}
              ></div>
            </div>
            <p className="strength-hint">
              Include uppercase letters, numbers, and special characters for a
              stronger password
            </p>
          </div>
        )}
      </div>
      <div className="form-group">
        <label>Confirm Password</label>
        <div className="input-container">
          <Lock size={18} className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>
      </div>
      {successMessage && (
        <div
          className="success-message"
          style={{
            marginBottom: "1rem",
            color: "#22c55e",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {successMessage}
        </div>
      )}

      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? (
          <span className="loading">
            <svg className="spinner" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
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
        <a
          href="https://www.google.com/"
          className="social-button google-button"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </a>
        <a
          href="https://www.google.com/"
          className="social-button facebook-button"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              fill="#1877F2"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            />
          </svg>
        </a>
      </div>
      <div className="footer">
        <p>
          Already have an account?{" "}
          <a href="#" className="link">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
