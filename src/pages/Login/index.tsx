import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { useAuth } from '@/hooks/useAuth';
// import { authApi } from '@/api/services/authApi'; // Removed unused import
import './Login.css';

// Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
    <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853" />
    <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05" />
    <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33718L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
  </svg>
);

// Declare Google Identity Services types
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toasts, success, error, removeToast } = useToast();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // Google Client ID from environment variable
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Load Google Identity Services script
  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) {
      console.error('Google Client ID not found in environment variables');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCallback,
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [GOOGLE_CLIENT_ID]);

  const handleGoogleCallback = async (_response: { credential: string }) => {
    setIsGoogleLoading(true);

    try {
      // Call your backend API to verify Google token
      // const result = await authApi.googleLogin(response.credential);

      // // Handle successful login (save token, update auth context, etc.)
      // success('Success!', `Welcome ${result.user?.name || 'back'}!`);

      // // Navigate to home or dashboard
      // setTimeout(() => {
      //   navigate('/home');
      // }, 500);

    } catch (err: any) {
      console.error('Google login error:', err);
      error('Login Failed', err.message || 'Google login failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    if (!GOOGLE_CLIENT_ID) {
      error('Error', 'Google login is not configured');
      return;
    }

    if (window.google) {
      setIsGoogleLoading(true);
      window.google.accounts.id.prompt();
    } else {
      error('Error', 'Google Sign-In is not available');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.emailOrUsername || !formData.password) {
      error('Validation Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.emailOrUsername, formData.password);
      success("Welcome back!", "Login successful");

      setTimeout(() => {
        navigate("/home");
      }, 300);
    } catch (err: any) {
      error("Login Failed", err.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* <header className="login-header">
        <div className="login-brand">
          <div className="brand-icon">
            <svg className="w-full h-full fill-current" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clipRule="evenodd" d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fillRule="evenodd"></path>
              <path d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z"></path>
            </svg>
          </div>
          <h2 className="brand-name">Meobeo Talk</h2>
        </div>
      </header> */}

      <main className="login-main">
        <div className="login-container">
          <div className="login-content">
            {/* Left Side - Image/Welcome */}
            <div className="login-welcome">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                alt="Welcome"
                className="welcome-image"
              />
              <h3 className="welcome-title">
                Welcome Back to the Conversation.
              </h3>
              <p className="welcome-subtitle">
                Your community is waiting for your next big idea.
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-section">
              <div className="login-form-header">
                <h1 className="form-title">Sign In</h1>
                <p className="form-subtitle">Welcome back to the conversation.</p>
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <Input
                  label="Email or Username"
                  placeholder="Enter your email or username"
                  value={formData.emailOrUsername}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      emailOrUsername: e.target.value,
                    })
                  }
                  fullWidth
                />

                <div className="password-field">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    endIcon={
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 3L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.584 10.587C10.2087 10.9624 9.99778 11.4708 9.99756 12.0013C9.99734 12.5317 10.2078 13.0403 10.5828 13.416C10.9578 13.7917 11.4662 14.0026 11.9966 14.0028C12.5271 14.003 13.0357 13.7925 13.4114 13.4175" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.363 5.365C10.2204 5.11972 11.1082 4.99684 12 5C18.364 5 22 12 22 12C21.3034 13.3356 20.4265 14.5684 19.393 15.667M17.357 17.349C15.726 18.449 13.942 19 12 19C5.636 19 2 12 2 12C2.90595 10.4214 4.07171 9.00409 5.447 7.807L17.357 17.349Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </button>
                    }
                    fullWidth

                  />
                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot Password?
                  </button>

                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  rounded="lg"
                >
                  Sign In
                </Button>
              </form>

              <div className="login-divider">
                <span>OR</span>
              </div>

              <Button
                type="button"
                variant="outline"
                rounded="lg"
                fullWidth
                isLoading={isGoogleLoading}
                loadingText="Connecting..."
                onClick={handleGoogleLogin}
                leftIcon={!isGoogleLoading && <GoogleIcon />}
              >
                Sign in with Google
              </Button>

              <p className="signup-link">
                Don't have an account?{' '}
                <button
                  type="button"
                  className="signup-button-link"
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};