import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import WelcomePage from "./pages/WelcomePage";

const App: React.FC = () => {
  // Register form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  // Login specific state
  const [rememberMe, setRememberMe] = useState(false);

  // Password strength calculation
  const [strength, setStrength] = useState(0);

  // Calculate if age is valid (at least 15 years old)
  const isValidAge = () => {
    if (!dateOfBirth) return false;

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= 15;
  };

  // Calculate password strength
  const calculatePasswordStrength = (value: string) => {
    let score = 0;

    // Check length
    if (value.length >= 8) score++;
    if (value.length >= 12) score++;

    // Check complexity
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    setStrength(score);
  };

  // Update password strength when password changes
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    calculatePasswordStrength(value);
  };

  // Get color based on password strength
  const getStrengthColor = () => {
    if (strength <= 1) return "#ef4444"; // Red for weak
    if (strength <= 3) return "#f59e0b"; // Amber for medium
    return "#22c55e"; // Green for strong
  };

  // Handle register form submission
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate form
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !dateOfBirth ||
      !mobileNumber
    ) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    // Validate mobile number
    if (mobileNumber.length !== 10) {
      setError("Mobile number must be exactly 10 digits");
      setIsLoading(false);
      return;
    }

    // Validate age
    if (!isValidAge()) {
      setError("You must be at least 15 years old to register");
      setIsLoading(false);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Store user data in localStorage (in a real app, this would be handled by your backend)
      localStorage.setItem("user", JSON.stringify({ name, email }));

      setIsLoading(false);
      // Registration is successful at this point
      // The RegisterForm component will handle the success message and redirect
    }, 1500);
  };

  // Handle login form submission
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate form
    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    // Simulate API call with setTimeout
    setTimeout(() => {
      // In a real app, you would validate credentials against your backend
      // For demo purposes, we'll just simulate a successful login

      // Store auth token in localStorage (in a real app, this would come from your backend)
      localStorage.setItem("auth_token", "demo_token_123");

      setIsLoading(false);
      // Login is successful at this point
      // The LoginForm component will handle the redirect
    }, 1500);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/register"
          element={
            <RegisterForm
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={handlePasswordChange}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              strength={strength}
              getStrengthColor={getStrengthColor}
              isLoading={isLoading}
              error={error}
              dateOfBirth={dateOfBirth}
              setDateOfBirth={setDateOfBirth}
              isValidAge={isValidAge()}
              mobileNumber={mobileNumber}
              setMobileNumber={setMobileNumber}
              handleSubmit={handleRegisterSubmit}
              successMessage={successMessage}
              acceptTerms={acceptTerms}
              setAcceptTerms={setAcceptTerms}
            />
          }
        />
        <Route
          path="/login"
          element={
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
              handleSubmit={handleLoginSubmit}
            />
          }
        />
        <Route
          path="/welcome"
          element={
            <ProtectedRoute>
              <WelcomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

// Protected route component to prevent unauthorized access
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem("auth_token") !== null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default App;
