import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { authApi } from '@/api/services/authApi';

/**
 * OAuthCallbackPage
 *
 * This page is the landing point after Google OAuth redirect.
 * Google redirects here with:
 *   /auth/callback?code=...&state=...
 *
 * We read the code, send it to the backend to exchange for tokens, 
 * then store the session and redirect to /home.
 */
export const OAuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      const state = params.get('state') || '';
      const accessTokenParam = params.get('access_token');
      const error = params.get('error');

      if (error) {
        setErrorMsg(decodeURIComponent(error));
        setStatus('error');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        let user;
        let accessToken = accessTokenParam;

        if (accessToken) {
          // Case 1: Token passed directly from backend redirect (e.g. local 8080 flow)
          localStorage.setItem('accessToken', accessToken);
          const profile = await authApi.getCurrentUser();
          const profileData = profile as { onboarding_completed?: boolean; onboardingCompleted?: boolean };
          user = {
             ...profile,
             onboardingCompleted: profileData.onboarding_completed ?? profileData.onboardingCompleted ?? false,
          };
        } else if (code) {
          // Case 2: Code passed from Google redirect (Frontend-first flow)
          const authData = await authApi.googleExchange(code, state);
          user = authData.user;
          accessToken = authData.accessToken;
        } else {
          setErrorMsg('Không tìm thấy thông tin xác thực. Vui lòng thử lại.');
          setStatus('error');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Store user in localStorage + auth context
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        setAuth(user, accessToken);

        // Navigate based on onboarding status
        if (user.onboardingCompleted) {
          navigate('/home', { replace: true });
        } else {
          navigate('/onboarding/profile', { replace: true });
        }
      } catch (errorUnknown) {
        const err = errorUnknown as Error;
        console.error('OAuth callback error:', err);
        // Clean up on error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        
        const message = err.message || 'Đăng nhập thất bại. Vui lòng thử lại.';
        setErrorMsg(message);
        setStatus('error');
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleCallback();
  }, [navigate, setAuth]);

  return (
    <div style={styles.container}>
      {status === 'loading' ? (
        <>
          <div style={styles.spinner} />
          <p style={styles.text}>Đang xử lý đăng nhập Google...</p>
        </>
      ) : (
        <>
          <div style={styles.errorIcon}>✕</div>
          <p style={styles.errorText}>{errorMsg}</p>
          <p style={styles.subText}>Đang chuyển hướng về trang đăng nhập...</p>
        </>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'var(--bg-primary, #0f0f13)',
    gap: '16px',
  },
  spinner: {
    width: '48px',
    height: '48px',
    border: '4px solid rgba(255,255,255,0.1)',
    borderTop: '4px solid #6c63ff',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  text: {
    color: 'var(--text-primary, #ffffff)',
    fontSize: '16px',
    margin: 0,
  },
  errorIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#ff4444',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#ff4444',
    fontSize: '16px',
    margin: 0,
    textAlign: 'center',
  },
  subText: {
    color: 'var(--text-secondary, #aaa)',
    fontSize: '14px',
    margin: 0,
  },
};
