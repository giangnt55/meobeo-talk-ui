import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { TimelinePage } from '../pages/Timeline';
import { GalleryPage } from '../pages/Gallery';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <GalleryPage />,
      },
      {
        path: 'timeline',
        element: <TimelinePage />,
      },
      {
        path: 'gallery',
        element: <GalleryPage />,
      },
    ],
  },
  {
    path: '*',
    element: <GalleryPage />,
  },
]);