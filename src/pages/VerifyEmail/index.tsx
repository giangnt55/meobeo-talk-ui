import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { useAuth } from '@/hooks/useAuth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import './VerifyEmail.css';

export const VerifyEmailPage: React.FC = () => {
    useDocumentTitle('Xác thực Email');
    const navigate = useNavigate();
    const location = useLocation();
    const { toasts, success, error, removeToast } = useToast();
    const { setAuth } = useAuth();

    const email = location.state?.email || '';
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(59);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    const handleChange = (index: number, value: string) => {
        // Only allow single digit
        if (value.length > 1) {
            value = value[value.length - 1];
        }

        // Only allow numbers
        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Handle paste
        if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            navigator.clipboard.readText().then((text) => {
                const digits = text.replace(/\D/g, '').slice(0, 6).split('');
                const newOtp = [...otp];
                digits.forEach((digit, i) => {
                    if (i < 6) {
                        newOtp[i] = digit;
                    }
                });
                setOtp(newOtp);

                // Focus last filled input or first empty
                const lastIndex = Math.min(digits.length, 5);
                inputRefs.current[lastIndex]?.focus();
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            error('Mã chưa đủ', 'Bạn ráng điền đủ 6 số nghen');
            return;
        }

        setIsLoading(true);

        try {
            const { authApi } = await import('@/api/services/authApi');
            const authResponse = await authApi.verifyEmail(email, otpCode);

            // Auto-login user with returned tokens
            setAuth(authResponse.user, authResponse.accessToken, authResponse.refreshToken);

            success('Thành công rồi!', 'Xác thực email ngon lành cành đào');

            setTimeout(() => {
                // Navigate based on onboarding status
                if (authResponse.user.onboardingCompleted) {
                    navigate('/home');
                } else {
                    navigate('/onboarding/profile');
                }
            }, 1000);
        } catch (errorUnknown) {
            const err = errorUnknown as Error;
            error('Xác thực thất bại', err.message || 'Mã số bị sai hoặc hết hạn mất tiêu');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        try {
            const { authApi } = await import('@/api/services/authApi');
            await authApi.resendVerificationCode(email);

            success('Đã gửi lại mã', 'Mã xác nhận mới keng đã bay tới email của bạn');
            setResendTimer(59);
            // Clear current OTP
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (errorUnknown) {
            const err = errorUnknown as Error;
            error('Gửi lại thất bại', err.message || 'Không gửi lại thêm mã được rồi');
        }
    };

    const handleBackToSignup = () => {
        navigate('/signup');
    };

    useEffect(() => {
        if (!email) {
            navigate('/signup');
        }
    }, [email, navigate]);

    if (!email) {
        return null;
    }

    return (
        <div className="verify-email-page">
            <ToastContainer toasts={toasts} onClose={removeToast} />

            <div className="verify-container">
                {/* Left side - Illustration */}
                <div className="verify-left">
                    <div className="decoration-top"></div>
                    <div className="decoration-bottom"></div>

                    <div className="verify-illustration">
                        <div
                            className="illustration-image"
                            style={{
                                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCSXxi7pWfdxASYcPAFBWjp7kxUyuCBAoomPF0x-qs6TAT9DiO16XXO9SyFIXs4sKAb8xciFD7WWv90A38xHUgQVh-o0hKDWmsd_n4Px6t0MUVFwlQR0i3KvIkKZ3htbE2MFAHCRYghxMYNXH2Jk4GeOIJf0IMAwYXwBrLoPtvsPOpqhhaWdi80xi0fomGRawL5gjtAfM_ILHqaVIt2jxglGmFEGn0e70X1-ssv1Y93VOyJgUgax9MLkHtdXDQz38WttpvYay20s8zJ")`
                            }}
                        />
                    </div>

                    <div className="verify-welcome">
                        <h1>Chào Mừng Cậu Đến Nhà Meowmuc!</h1>
                        <p>
                            Chia sẻ ý tưởng, kết nối cộng đồng, và để tiếng nói của cậu bay xa.
                        </p>
                    </div>
                </div>

                {/* Right side - OTP Form */}
                <div className="verify-right">
                    <header className="verify-header">
                        <div className="verify-logo">
                            <img src="/logo/logo_meow.png" alt="Meowmuc" className="verify-logo-img" />
                        </div>
                        <Button
                            variant="outline"
                            onClick={handleBackToSignup}
                            disabled={isLoading}
                            rounded="lg"
                        >
                            Quay lại Đăng Ký
                        </Button>
                    </header>

                    <main className="verify-main">
                        <h2>Xác Nhận Email Của Cậu Nha</h2>
                        <p className="verify-subtitle">
                            Tụi mình vừa gửi một mã số bí mật gồm 6 chữ số tới
                            <strong>{email}</strong> đó
                        </p>

                        <form onSubmit={handleSubmit} className="verify-form">
                            <div className="otp-section">
                                <label>Nhập mã xác thực</label>
                                <div className="otp-inputs">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            disabled={isLoading}
                                            className="otp-input"
                                            autoFocus={index === 0}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                isLoading={isLoading}
                                disabled={isLoading || otp.join('').length !== 6}
                                className="verify-btn"
                                rounded="lg"
                            >
                                {isLoading ? 'Đang kiểm tra nè...' : 'Xác Nhận Ngay'}
                            </Button>
                        </form>

                        <div className="resend-section">
                            <p>Chưa nhận được mã hả?</p>
                            <p>
                                {resendTimer > 0 ? (
                                    <>
                                        <span className="resend-link disabled">Gửi lại mã</span>
                                        {' '}sau{' '}
                                        <span className="timer">
                                            00:{resendTimer.toString().padStart(2, '0')}
                                        </span>
                                    </>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleResend}
                                        className="resend-link active"
                                    >
                                        Gửi lại mã
                                    </button>
                                )}
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};
