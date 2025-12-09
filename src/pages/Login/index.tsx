import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { useAuth } from '@/hooks/useAuth';
import './Login.css';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.emailOrUsername, formData.password);

      success("Welcome back!", "Login successful");

      setTimeout(() => {
        navigate("/onboarding/profile");
      }, 300);
    } catch (err: any) {
      error("Login Failed", err.message || "Invalid credentials");
    }

    setIsLoading(false);
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    success('Redirecting...', `Signing in with ${provider}`);
    setTimeout(() => {
      navigate('/onboarding/profile');
    }, 1500);
  };

  return (
    <div className="login-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <header className="login-header">
        <div className="login-brand">
          <div className="brand-icon">
            <svg viewBox="0 0 48 48" fill="currentColor">
              <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" />
            </svg>
          </div>
          <h2 className="brand-name">Meobeo Talk</h2>
        </div>
      </header>

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
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </button>
                    }
                    fullWidth
                  />
                  <a href="/forgot-password" className="forgot-link">
                    Forgot Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                >
                  Sign In
                </Button>
              </form>

              <div className="login-divider">
                <span>OR</span>
              </div>

              <button
                className="social-button"
                onClick={() => handleSocialLogin('google')}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="social-icon"
                />
                <span>Sign in with Google</span>
              </button>

              <p className="signup-link">
                Don't have an account?{' '}
                <a href="/signup">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};