import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/common/Button/Button';
import { useToast } from '@/hooks/useToast';
import { ToastContainer } from '@/components/common/ToastContainer/ToastContainer';
import { useAuth } from '@/hooks/useAuth';
import './VerifyEmail.css';

export const VerifyEmailPage: React.FC = () => {
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
            error('Invalid Code', 'Please enter all 6 digits');
            return;
        }

        setIsLoading(true);

        try {
            const { authApi } = await import('@/api/services/authApi');
            const authResponse = await authApi.verifyEmail(email, otpCode);

            // Auto-login user with returned tokens
            setAuth(authResponse.user, authResponse.accessToken, authResponse.refreshToken);

            success('Verified!', 'Email verified successfully');

            setTimeout(() => {
                // Navigate to onboarding since user just signed up
                navigate('/onboarding/profile');
            }, 1000);
        } catch (err: any) {
            error('Verification Failed', err.message || 'Invalid or expired code');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;

        try {
            const { authApi } = await import('@/api/services/authApi');
            await authApi.resendVerificationCode(email);

            success('Code Sent', 'A new verification code has been sent to your email');
            setResendTimer(59);
            // Clear current OTP
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err: any) {
            error('Resend Failed', err.message || 'Failed to resend code');
        }
    };

    const handleBackToSignup = () => {
        navigate('/signup');
    };

    if (!email) {
        // Redirect if no email in state
        useEffect(() => {
            navigate('/signup');
        }, []);
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
                        <h1>Welcome to Meobeo Talk</h1>
                        <p>
                            Share your ideas, connect with a vibrant community,
                            and let your voice be heard.
                        </p>
                    </div>
                </div>

                {/* Right side - OTP Form */}
                <div className="verify-right">
                    <header className="verify-header">
                        <h2 className="verify-logo">Meobeo Talk</h2>
                        <Button
                            variant="outline"
                            onClick={handleBackToSignup}
                            disabled={isLoading}
                        >
                            Back to Sign Up
                        </Button>
                    </header>

                    <main className="verify-main">
                        <h1>OTP Verification</h1>
                        <p className="verify-description">
                            A 6-digit verification code has been sent to{' '}
                            <strong>{email}</strong>
                        </p>

                        <form onSubmit={handleSubmit} className="verify-form">
                            <div className="otp-section">
                                <label>Enter Verification Code</label>
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
                            >
                                Verify Account
                            </Button>
                        </form>

                        <div className="resend-section">
                            <p>Didn't receive the code?</p>
                            <p>
                                {resendTimer > 0 ? (
                                    <>
                                        <span className="resend-link disabled">Resend Code</span>
                                        {' '}in{' '}
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
                                        Resend Code
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
