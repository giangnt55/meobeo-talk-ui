import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSignup } from '@/hooks/queries/useAuth';
import { Button } from '@/components/common/Button/Button';
import { Input } from '@/components/common/Input/Input';
import { getFormErrors } from '@/utils/apiErrorHandler';
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
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Cho mình xin cái email nghen';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email này sai sai á, nhập lại nha';
      isValid = false;
    }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Cậu tên gì dợ, đừng bỏ trống nha';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Tên gì ngắn quá dạ, ráng 3 ký tự nhen';
      isValid = false;
    }

    // Validate username
    const usernameRegex = /^[a-zA-Z0-9_.]+$/;
    if (!formData.username.trim()) {
      newErrors.username = 'Cậu chưa nhập ID/Tên đăng nhập nè';
      isValid = false;
    } else if (formData.username.length < 3) {
      newErrors.username = 'ID ngắn quá dạ, ráng 3 ký tự nhen';
      isValid = false;
    } else if (!usernameRegex.test(formData.username)) {
      newErrors.username = 'ID chỉ được dùng chữ cái, số, dấu chấm và gạch dưới nha';
      isValid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = 'Cho mình xin mật khẩu bí mật đi';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Mật khẩu phải từ 8 ký tự trở lên nha';
      isValid = false;
    }

    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Xác nhận lại mật khẩu xíu nè';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Ủa, hai mật khẩu hổng giống nhau kìa';
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
      error('Lỗi xíu xiu', 'Điền sai mất tiêu gòi, kiểm tra lại thử nha!');
      return;
    }

    // Prepare payload matching backend format
    const payload = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    signup(payload, {
      onSuccess: () => {
        success('Thành công gòi!', 'Tuyệt cú mèo! Cậu ngó email để lấy mã xác nhận nha.');
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
        } else {
          const errObj = err as Error;
          const errMsg = errObj?.message || '';
          if (errMsg.toLowerCase().includes('username') && errMsg.toLowerCase().includes('exist')) {
            setErrors((prev) => ({
              ...prev,
              username: 'Tên đăng nhập này đã có người dùng mất rồi',
            }));
            error('Lỗi rồi', 'Tên đăng nhập đã tồn tại');
          } else if (errMsg.toLowerCase().includes('email') && errMsg.toLowerCase().includes('exist')) {
            setErrors((prev) => ({
              ...prev,
              email: 'Email này đã được dùng rồi',
            }));
            error('Lỗi rồi', 'Email đã được dùng');
          } else {
            error('Lỗi gòi', errMsg || 'Đã có lỗi xảy ra á, thử lại nha');
          }
        }
      },
    });
  };

  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL || `${import.meta.env.VITE_API_URL}/auth/google`;

  const handleGoogleSignup = () => {
    window.location.href = GOOGLE_AUTH_URL;
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
                <Input
                  id="name"
                  name="name"
                  label="Tên của bạn"
                  type="text"
                  placeholder="Nhập tên nè"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  disabled={isPending}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <Input
                  id="username"
                  name="username"
                  label="Tên đăng nhập (ID)"
                  type="text"
                  placeholder="Ví dụ: meow.muc"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                  disabled={isPending}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isPending}
                  fullWidth
                />
              </div>

              <div className="form-group">
                <Input
                  id="password"
                  name="password"
                  label="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu bí mật"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isPending}
                  fullWidth
                  endIcon={
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--text-tertiary)' }}
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
                />
              </div>

              <div className="form-group">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Nhập lại mật khẩu"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại y chang nha"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  disabled={isPending}
                  fullWidth
                  endIcon={
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', color: 'var(--text-tertiary)' }}
                    >
                      {showConfirmPassword ? (
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