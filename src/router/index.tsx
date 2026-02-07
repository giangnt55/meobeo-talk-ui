import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { LoginPage } from '@/pages/Login';
import { ProfileSetupPage } from '@/pages/Onboarding/ProfileSetup';
import { InterestsSelectionPage } from '@/pages/Onboarding/InterestsSelection';
import { FollowUsersPage } from '@/pages/Onboarding/FollowUsers';
// import { TimelinePage } from '@/pages/Timeline'; // Removed unused import
// import { GalleryPage } from '@/pages/Gallery'; // Removed unused import
// import { MemoryDetailPage } from '@/pages/MemoryDetail'; // Removed unused import
import { TemplatesPage } from '@/pages/Templates';
import { DecorationsPage } from '@/pages/Decorations';
import { NotFoundPage } from '@/pages/NotFound';
import { RegisterPage } from '@/pages/Register';
import { VerifyEmailPage } from '@/pages/VerifyEmail';
import { AboutPage } from '@/pages/About';
import { MemoriesPage } from '@/pages/Memories';
import { CreateJourney } from '@/pages/CreateJourney';
import { WelcomePage } from '@/pages/Welcome';
import { ProfileSettingsPage } from '@/pages/Settings/Profile';
import { ProfilePage } from '@/pages/Profile';
import { CreateJournalPage } from '@/pages/CreateJournal';
import Landing from '@/pages/Landing';
import Home from '@/pages/Home';
import BlogPage from '@/pages/Blog';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

import { PublicLayout } from '@/layouts/PublicLayout';

export const router = createBrowserRouter([
  // Auth routes (no layout)
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },

  {
    path: '/about',
    element: (
      <PublicLayout>
        <AboutPage />
      </PublicLayout>
    ),
  },

  { path: '/welcome', element: <WelcomePage /> },

  {
    path: '/onboarding',
    children: [
      { path: 'profile', element: <ProfileSetupPage /> },
      { path: 'interests', element: <InterestsSelectionPage /> },
      { path: 'follow', element: <FollowUsersPage /> },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },

      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },

      {
        path: 'blog',
        element: <BlogPage />,
      },

      // {
      //   path: 'timeline',
      //   element: <TimelinePage />,
      // },
      // {
      //   path: 'gallery',
      //   element: <GalleryPage />,
      // },
      // {
      //   path: 'memory/:id',
      //   element: <MemoryDetailPage />,
      // },
      {
        path: 'memories/create',
        element: <CreateJourney />,
      },
      // { path: '/memories/create', element: <CreateJourney /> },
      {
        path: 'templates',
        element: <TemplatesPage />,
      },
      {
        path: 'decorations',
        element: <DecorationsPage />,
      },
      {
        path: 'memories',
        element: <MemoriesPage />,
      },
      {
        path: 'profile/:username',
        element: <ProfilePage />,
      },
      {
        path: 'journal/create',
        element: <CreateJournalPage />,
      },
      {
        path: 'settings/profile',
        element: <ProfileSettingsPage />,
      },
    ],
  },

  {
    path: '*',
    element: (
      <PublicLayout>
        <NotFoundPage />
      </PublicLayout>
    ),
  },
]);
