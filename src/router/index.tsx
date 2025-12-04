import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../pages/Login';
import { ProfileSetupPage } from '../pages/Onboarding/ProfileSetup';
import { InterestsSelectionPage } from '../pages/Onboarding/InterestsSelection';
import { FollowUsersPage } from '../pages/Onboarding/FollowUsers';
import { TimelinePage } from '../pages/Timeline';
import { GalleryPage } from '../pages/Gallery';
import { MemoryDetailPage } from '../pages/MemoryDetail';
import { MemoryCreatePage } from '../pages/MemoryCreate';
import { TemplatesPage } from '../pages/Templates';
import { DecorationsPage } from '../pages/Decorations';
import { NotFoundPage } from '../pages/NotFound';

export const router = createBrowserRouter([
  // Auth routes (no layout)
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <LoginPage />, // Can create separate signup page
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
        element: <TimelinePage />,
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