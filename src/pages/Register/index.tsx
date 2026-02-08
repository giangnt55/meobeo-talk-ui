import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '@/hooks/queries/useAuth';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { formatErrorForToast, getFormErrors } from '@/utils/apiErrorHandler';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import './Register.css';

// Google Icon Component
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.9895 10.1871C19.9895 9.36767 19.9214 8.76973 19.7742 8.14966H10.1992V11.848H15.8195C15.7062 12.7671 15.0943 14.1512 13.7346 15.0813L13.7155 15.2051L16.7429 17.4969L16.9527 17.5174C18.8789 15.7789 19.9895 13.221 19.9895 10.1871Z" fill="#4285F4" />
    <path d="M10.1993 19.9313C12.9527 19.9313 15.2643 19.0454 16.9527 17.5174L13.7346 15.0813C12.8734 15.6682 11.7176 16.0779 10.1993 16.0779C7.50243 16.0779 5.21352 14.3395 4.39759 11.9366L4.27799 11.9466L1.13003 14.3273L1.08887 14.4391C2.76588 17.6945 6.21061 19.9313 10.1993 19.9313Z" fill="#34A853" />
    <path d="M4.39748 11.9366C4.18219 11.3166 4.05759 10.6521 4.05759 9.96565C4.05759 9.27909 4.18219 8.61473 4.38615 7.99466L4.38045 7.8626L1.19304 5.44366L1.08875 5.49214C0.397576 6.84305 0.000976562 8.36008 0.000976562 9.96565C0.000976562 11.5712 0.397576 13.0882 1.08875 14.4391L4.39748 11.9366Z" fill="#FBBC05" />
    <path d="M10.1993 3.85336C12.1142 3.85336 13.406 4.66168 14.1425 5.33718L17.0207 2.59107C15.253 0.985496 12.9527 0 10.1993 0C6.2106 0 2.76588 2.23672 1.08887 5.49214L4.38626 7.99466C5.21352 5.59183 7.50242 3.85336 10.1993 3.85336Z" fill="#EB4335" />
  </svg>
);

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
            <h1>Chào mừng đến với Meobeo Talk</h1>
            <p>
              Chia sẻ ý tưởng, kết nối cộng đồng, và để tiếng nói của bạn vang xa.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="register-right">
          <header className="register-header">
            <h2 className="register-logo">Meobeo Talk</h2>
            <div className="register-login-link">
              <span>Có tài khoản rồi à?</span>
              <Link to="/login">Vào nhà thôi</Link>
            </div>
          </header>

          <main className="register-main">
            <h1>Tạo Tài Khoản Mới</h1>

            <div className="social-buttons">
              <Button
                type="button"
                variant="outline"
                rounded="lg"
                fullWidth
                onClick={handleGoogleSignup}
                disabled={isPending}
                leftIcon={<GoogleIcon />}
              >
                Đăng ký bằng Google
              </Button>
            </div>

            <div className="divider">
              <span>HOẶC</span>
            </div>

            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="name">Tên của bạn</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nhập tên nè"
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
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isPending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mật khẩu</label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu bí mật"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isPending}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Nhập lại y chang nha"
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
                Đăng Ký Ngay
              </Button>

              <p className="terms-text">
                Tạo tài khoản là bạn đồng ý với{' '}
                <Link to="/terms">Điều khoản</Link> và{' '}
                <Link to="/privacy">Chính sách</Link> của tụi mình rồi nha.
              </p>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};