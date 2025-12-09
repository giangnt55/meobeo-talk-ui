import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { LoginPage } from '@/pages/Login';
import { ProfileSetupPage } from '@/pages/Onboarding/ProfileSetup';
import { InterestsSelectionPage } from '@/pages/Onboarding/InterestsSelection';
import { FollowUsersPage } from '@/pages/Onboarding/FollowUsers';
import { TimelinePage } from '@/pages/Timeline';
import { GalleryPage } from '@/pages/Gallery';
import { MemoryDetailPage } from '@/pages/MemoryDetail';
import { MemoryCreatePage } from '@/pages/MemoryCreate';
import { TemplatesPage } from '@/pages/Templates';
import { DecorationsPage } from '@/pages/Decorations';
import { NotFoundPage } from '@/pages/NotFound';
import { RegisterPage } from '@/pages/Register';
import Landing from '@/pages/Landing';

export const router = createBrowserRouter([
  // Auth routes (no layout)
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <RegisterPage />,
  },
  // Onboarding flow (no main layout)
  {
    path: '/onboarding',
    children: [
      {
        path: 'profile',
        element: <ProfileSetupPage />,
      },
      {
        path: 'interests',
        element: <InterestsSelectionPage />,
      },
      {
        path: 'follow',
        element: <FollowUsersPage />,
      },
    ],
  },
  // Main app routes (with layout)
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: 'timeline',
        element: <TimelinePage />,
      },
      {
        path: 'gallery',
        element: <GalleryPage />,
      },
      {
        path: 'memory/:id',
        element: <MemoryDetailPage />,
      },
      {
        path: 'memory/create',
        element: <MemoryCreatePage />,
      },
      {
        path: 'templates',
        element: <TemplatesPage />,
      },
      {
        path: 'decorations',
        element: <DecorationsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);