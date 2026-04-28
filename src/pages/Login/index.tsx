import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/common/Input/Input';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { useAuth } from '@/hooks/useAuth';
// import { authApi } from '@/api/services/authApi'; // Removed unused import
import { AUTH_ERRORS, HTTP_STATUS } from '@/constants/errorCodes';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
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



export const LoginPage: React.FC = () => {
  useDocumentTitle('Đăng nhập');
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

  // Google OAuth endpoint from environment
  const GOOGLE_AUTH_URL = import.meta.env.VITE_GOOGLE_AUTH_URL || `${import.meta.env.VITE_API_URL}/auth/google`;

  // Show OAuth error if redirected back with ?error= param
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const oauthError = params.get('error');
    if (oauthError) {
      const msg = oauthError === 'oauth_state_mismatch'
        ? 'Phiên đăng nhập Google hết hạn, thử lại nha!'
        : decodeURIComponent(oauthError);
      error('Đăng nhập Google thất bại', msg);
      // Clean the URL
      window.history.replaceState({}, '', '/login');
    }
  }, []);

  // Redirect to backend Google OAuth endpoint
  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.emailOrUsername || !formData.password) {
      error('Chưa điền đủ kìa', 'Bạn nhớ điền đầy đủ thông tin nghen');
      return;
    }

    setIsLoading(true);

    try {
      await login(formData.emailOrUsername, formData.password);
      success("Mừng bạn về nhà!", "Đăng nhập thành công rực rỡ");

      setTimeout(() => {
        navigate("/home");
      }, 300);
    } catch (errorUnknown) {
      const err = errorUnknown as { code?: string; message?: string; name?: string; response?: Response };

      if (err.code === AUTH_ERRORS.TOO_MANY_REQUESTS || (err.response && err.response.status === HTTP_STATUS.TOO_MANY_REQUESTS)) {
        error(
          "Chậm lại xíu nè!",
          "Cậu 'gõ cửa' nhà Meowmuc hăng hái quá rồi nè. Đợi một xíu xiu cho hệ thống thở cái rồi quay lại nha!"
        );
      } else if (err.code === AUTH_ERRORS.INVALID_CREDENTIALS) {
        error("Meo meo, sai gòi nè!", "Nhập lại xíu xiu nghen, email hoặc mật khẩu bị trật nhịp rồi đó");
      } else {
        error("Trùi ui, lỗi gòi!", err.message || "Tự nhiên bị lỗi ngang, ráng thử lại nha!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer toasts={toasts} onClose={removeToast} />


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
                Chào Mừng Bạn Trở Lại!
              </h3>
              <p className="welcome-subtitle">
                Cộng đồng đang chờ những ý tưởng tuyệt vời từ bạn đó.
              </p>
            </div>

            {/* Right Side - Form */}
            <div className="login-form-section">
              <header className="login-form-top">
                <Link to="/" className="login-brand">
                  <img src="/logo/logo_meow.png" alt="Meowmuc" className="login-logo-img" />
                </Link>
                <div className="login-signup-link">
                  <span>Chưa có tài khoản?</span>
                  <Link to="/signup">Đăng ký ngay</Link>
                </div>
              </header>

              <div className="login-form-header">
                <h1 className="form-title">Vào Nhà Thôi</h1>
                {/* <p className="form-subtitle">Mừng bạn quay lại nha!</p> */}
              </div>

              <form onSubmit={handleSubmit} className="login-form">
                <Input
                  label="Email hoặc Tên đăng nhập"
                  placeholder="Nhập email hoặc tên nè"
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
                    label="Mật khẩu"
                    placeholder="Nhập mật khẩu bí mật"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    endIcon={
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
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
                    Quên mật khẩu hả?
                  </button>

                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isLoading}
                  loadingText="Đang vào nhà..."
                  rounded="lg"
                >
                  Đăng Nhập Ngay
                </Button>
              </form>

              <div className="login-divider">
                <span>HOẶC</span>
              </div>

              <Button
                type="button"
                variant="outline"
                rounded="lg"
                fullWidth
                isLoading={isGoogleLoading}
                loadingText="Đang kết nối..."
                onClick={handleGoogleLogin}
                leftIcon={!isGoogleLoading && <GoogleIcon />}
              >
                Đăng nhập bằng Google
              </Button>

              <p className="signup-link">
                Chưa có tài khoản hả?{' '}
                <button
                  type="button"
                  className="signup-button-link"
                  onClick={() => navigate('/signup')}
                >
                  Đăng ký liền
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};