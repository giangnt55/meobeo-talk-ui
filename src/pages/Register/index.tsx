import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '@/hooks/queries/useAuth';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { formatErrorForToast, getFormErrors } from '@/utils/apiErrorHandler';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import './Register.css';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: signup, isPending } = useSignup();
  const { toasts, success, error, removeToast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      error('Validation Error', 'Please check all fields and try again');
      return;
    }

    // Prepare payload matching backend format
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    signup(payload, {
      onSuccess: () => {
        success('Success!', 'Account created! Please check your email for verification code.');
        setTimeout(() => {
          // Navigate to verify email page with email in state
          navigate('/verify-email', {
            state: { email: formData.email }
          });
        }, 1000);
      },
      onError: (err: unknown) => {
        // Extract server-side validation errors
        const serverErrors = getFormErrors(err);
        if (Object.keys(serverErrors).length > 0) {
          setErrors((prev) => ({
            ...prev,
            ...serverErrors,
          }));
        }

        // Show toast with error message
        const message = formatErrorForToast(err);
        error('Registration Failed', message);
      },
    });
  };

  const handleGoogleSignup = () => {
    success('Redirecting...', 'Signing up with Google');
  };

  return (
    <div className="register-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />

      <div className="register-container">
        {/* Left side - Illustration */}
        <div className="register-left">
          <div className="decoration-top"></div>
          <div className="decoration-bottom"></div>

          <div className="register-illustration">
            <div
              className="illustration-image"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSXxi7pWfdxASYcPAFBWjp7kxUyuCBAoomPF0x-qs6TAT9DiO16XXO9SyFIXs4sKAb8xciFD7WWv90A38xHUgQVh-o0hKDWmsd_n4Px6t0MUVFwlQR0i3KvIkKZ3htbE2MFAHCRYghxMYNXH2Jk4GeOIJf0IMAwYXwBrLoPtvsPOpqhhaWdi80xi0fomGRawL5gjtAfM_ILHqaVIt2jxglGmFEGn0e70X1-ssv1Y93VOyJgUgax9MLkHtdXDQz38WttpvYay20s8zJ")`
              }}
            />
          </div>

          <div className="register-welcome">
            <h1>Welcome to Meobeo Talk</h1>
            <p>
              Share your ideas, connect with a vibrant community,
              and let your voice be heard.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="register-right">
          <header className="register-header">
            <h2 className="register-logo">Meobeo Talk</h2>
            <div className="register-login-link">
              <span>Already have an account?</span>
              <Link to="/login">Log In</Link>
            </div>
          </header>

          <main className="register-main">
            <h1>Create Your Account</h1>

            <div className="social-buttons">
              <Button
                variant="outline"
                onClick={handleGoogleSignup}
                disabled={isPending}
                className="social-btn"
                rounded="lg"
              >
                <span className="social-icon google">G</span>
                Sign up with Google
              </Button>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={isPending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isPending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isPending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  disabled={isPending}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isPending}
                disabled={isPending}
                className="submit-btn"
                rounded="lg"
              >
                Create Account
              </Button>

              <p className="terms-text">
                By creating an account, you agree to our{' '}
                <Link to="/terms">Terms of Service</Link> and{' '}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};