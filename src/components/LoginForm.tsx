import { useState } from "react";
import { Eye, EyeOff, LogIn, Mail, Lock, AlertCircle } from "lucide-react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase"; // update the path if needed
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  isLoading: boolean;
  error: string;
  handleSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  rememberMe,
  setRememberMe,
  isLoading,
  error,
  handleSubmit,
}) => {
  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In success:", user);
      navigate("/welcome");
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        console.warn("User closed the popup.");
        return;
      }
      console.error("Google Sign-In failed:", error);
      alert(`Google Sign-In failed: ${error.message}`);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="form">
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
      </div>

      <div className="form-options">
        <div className="checkbox">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <a href="#" className="link">
          Forgot password?
        </a>
      </div>
      {error && (
        <div
          className="error-message"
          style={{
            marginBottom: "1rem",
            color: "#f87171", // Tailwind red-400
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {error}
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
            Signing in...
          </span>
        ) : (
          <span className="button-content">
            <LogIn size={18} />
            Sign in
          </span>
        )}
      </button>

      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div className="social-buttons">
        <button
          type="button"
          className="social-button google-button"
          onClick={handleGoogleSignIn}
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
        </button>
        <a href="#" className="social-button facebook-button">
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
          Don't have an account?{" "}
          <a href="/register" className="link">
            Sign up now
          </a>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
