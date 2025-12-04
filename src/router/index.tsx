import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { TimelinePage } from '../pages/Timeline';
import { GalleryPage } from '../pages/Gallery';
import { MemoryDetailPage } from '../pages/MemoryDetail';
import { MemoryCreatePage } from '../pages/MemoryCreate';
import { TemplatesPage } from '../pages/Templates';
import { DecorationsPage } from '../pages/Decorations';
import { NotFoundPage } from '../pages/NotFound';

export const router = createBrowserRouter([
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