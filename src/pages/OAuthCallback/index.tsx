import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { userApi } from '@/api/services/userApi';

/**
 * OAuthCallbackPage
 *
 * This page is the landing point after Google OAuth redirect from the backend.
 * The backend redirects here with:
 *   /auth/callback?access_token=<JWT>
 *
 * We read the token, store it, fetch the user profile, then redirect to /home.
 */
export const OAuthCallbackPage: React.FC = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access_token');
      const error = params.get('error');

      if (error) {
        setErrorMsg(decodeURIComponent(error));
        setStatus('error');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      if (!accessToken) {
        setErrorMsg('Không tìm thấy token xác thực. Vui lòng thử lại.');
        setStatus('error');
        setTimeout(() => navigate('/login'), 3000);
        return;
      }

      try {
        // Store access token first so subsequent API calls work
        localStorage.setItem('accessToken', accessToken);

        // Fetch full profile from server
        const profile = await userApi.getProfile();

        // Store user in localStorage + auth context
        // Cast to base User from auth types since userApi returns a partial User
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fullUser = profile as any;
        localStorage.setItem('user', JSON.stringify(fullUser));
        setAuth(fullUser, accessToken);

        // Navigate based on onboarding status
        if (fullUser.onboardingCompleted) {
          navigate('/home', { replace: true });
        } else {
          navigate('/onboarding/profile', { replace: true });
        }
      } catch (err) {
        console.error('OAuth callback error:', err);
        // Clean up on error
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setErrorMsg('Đăng nhập thất bại. Vui lòng thử lại.');
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
