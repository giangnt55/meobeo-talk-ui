import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { PublicLayout } from '@/layouts/PublicLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

import { GuestRoute } from '@/components/common/GuestRoute';

// Pages
import Landing from '@/pages/Landing';
import Home from '@/pages/Home';
import { LoginPage } from '@/pages/Login';
import { RegisterPage } from '@/pages/Register';
import { VerifyEmailPage } from '@/pages/VerifyEmail';
import { WelcomePage } from '@/pages/Welcome';
import { OAuthCallbackPage } from '@/pages/OAuthCallback';
import { AboutPage } from '@/pages/About';
import { NotFoundPage } from '@/pages/NotFound';
import ExplorePage from '@/pages/Explore';

// Onboarding
import { ProfileSetupPage } from '@/pages/Onboarding/ProfileSetup';
import { InterestsSelectionPage } from '@/pages/Onboarding/InterestsSelection';
import { FollowUsersPage } from '@/pages/Onboarding/FollowUsers';

// Blog
import BlogPage from '@/pages/Blog';
import BlogDetailPage from '@/pages/BlogDetail';
import CreateBlog from '@/pages/CreateBlog';

// Memories & Journeys
import { MemoriesPage } from '@/pages/Memories';
import { MemoryDetailPage } from '@/pages/MemoryDetail';
import { MemoryCreatePage } from '@/pages/MemoryCreate';
import { JourneyDetailPage } from '@/pages/JourneyDetail';
import { CreateJourney } from '@/pages/CreateJourney';

// Profile & Settings
import { ProfilePage } from '@/pages/Profile';
import { ProfileSettingsPage } from '@/pages/Settings/Profile';

export const router = createBrowserRouter([
  // --- Auth Routes ---
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/welcome', element: <WelcomePage /> },
  // Google OAuth callback - handles redirect from backend after Google login
  { path: '/auth/callback', element: <OAuthCallbackPage /> },

  // --- Onboarding Routes ---
  {
    path: '/onboarding',
    children: [
      { path: 'profile', element: <ProfileSetupPage /> },
      { path: 'interests', element: <InterestsSelectionPage /> },
      { path: 'follow', element: <FollowUsersPage /> },
    ],
  },

  // --- Public Layout Routes ---
  {
    path: '/about',
    element: (
      <PublicLayout>
        <AboutPage />
      </PublicLayout>
    ),
  },
  {
    path: '/explore',
    element: (
      <GuestRoute>
        <PublicLayout>
          <ExplorePage />
        </PublicLayout>
      </GuestRoute>
    ),
  },

  // --- Main Application Routes ---
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      {
        path: 'home', element:
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
      },

      { path: 'blog', element: <BlogPage /> },
      {
        path: 'blog/create',
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      {
        path: 'blog/edit/:id',
        element: (
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        ),
      },
      { path: 'blog/:id', element: <BlogDetailPage /> },


      // Memories
      { path: 'memories', element: <MemoriesPage /> },
      { path: 'memories/:id', element: <MemoryDetailPage /> },
      {
        path: 'memories/create',
        element: (
          <ProtectedRoute>
            <MemoryCreatePage />
          </ProtectedRoute>
        ),
      },

      // Journeys
      { path: 'memories/journeys/:id', element: <JourneyDetailPage /> },
      {
        path: 'journey/create',
        element: (
          <ProtectedRoute>
            <CreateJourney />
          </ProtectedRoute>
        ),
      },

      // Profile & Settings
      { path: 'profile/:username', element: <ProfilePage /> },
      {
        path: 'settings/profile', element:
          <ProtectedRoute>
            <ProfileSettingsPage />
          </ProtectedRoute>
      },
    ],
  },

  // --- Catch All ---
  {
    path: '*',
    element: (
      <PublicLayout>
        <NotFoundPage />
      </PublicLayout>
    ),
  },
]);
