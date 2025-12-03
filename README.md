# Meobeo Talk - Project Restructuring Guide

## 📋 Overview

Dự án đã được tái cấu trúc với các common components có thể tái sử dụng, feature components chuyên biệt, và page components được tổ chức rõ ràng.

## 🗂️ Updated Project Structure

```
src/
├── components/
│   ├── common/                    # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.css
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.css
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.css
│   │   ├── Tag/
│   │   │   ├── Tag.tsx
│   │   │   └── Tag.css
│   │   ├── Avatar/
│   │   │   ├── Avatar.tsx
│   │   │   └── Avatar.css
│   │   ├── SearchBar/
│   │   │   ├── SearchBar.tsx
│   │   │   └── SearchBar.css
│   │   └── Modal/
│   │       ├── Modal.tsx
│   │       └── Modal.css
│   │
│   ├── features/                  # Feature-specific components
│   │   ├── MemoryCard/
│   │   │   ├── MemoryCard.tsx
│   │   │   └── MemoryCard.css
│   │   ├── TimelineView/
│   │   │   ├── TimelineView.tsx
│   │   │   └── TimelineView.css
│   │   ├── GalleryView/
│   │   │   ├── GalleryView.tsx
│   │   │   └── GalleryView.css
│   │   ├── TemplateCard/
│   │   │   ├── TemplateCard.tsx
│   │   │   └── TemplateCard.css
│   │   └── FilterSidebar/
│   │       ├── FilterSidebar.tsx
│   │       └── FilterSidebar.css
│   │
│   └── layout/                    # Layout components
│       ├── Navbar/
│       │   ├── Navbar.tsx
│       │   └── Navbar.css
│       └── Footer/
│           ├── Footer.tsx
│           └── Footer.css
│
├── layouts/                       # Page layouts
│   ├── MainLayout.tsx
│   ├── MainLayout.css
│   ├── AuthLayout.tsx
│   └── DashboardLayout.tsx
│
├── pages/                         # Page components
│   ├── Timeline/
│   │   ├── index.tsx
│   │   └── Timeline.css
│   ├── Gallery/
│   │   ├── index.tsx
│   │   └── Gallery.css
│   ├── MemoryDetail/
│   │   ├── index.tsx
│   │   └── MemoryDetail.css
│   ├── MemoryCreate/
│   │   ├── index.tsx
│   │   └── MemoryCreate.css
│   ├── Templates/
│   │   ├── index.tsx
│   │   └── Templates.css
│   └── NotFound.tsx
│
├── types/                         # TypeScript types
│   ├── memory.ts
│   ├── user.ts
│   ├── comment.ts
│   └── common.ts
│
├── mock/                          # Mock data
│   ├── memoryData.ts
│   ├── userData.ts
│   └── handlers.ts
│
├── utils/                         # Utility functions
│   ├── memoryHelpers.ts
│   ├── dateHelpers.ts
│   └── validation.ts
│
├── router/                        # Router configuration
│   └── index.tsx
│
└── main.tsx
```

## 🎨 Component Library

### Common Components

#### 1. **Button**
```tsx
import { Button } from '@/components/common/Button/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Variants: primary, secondary, outline, ghost
// Sizes: sm, md, lg
```

#### 2. **Input**
```tsx
import { Input } from '@/components/common/Input/Input';

<Input
  label="Title"
  placeholder="Enter title..."
  startIcon={<SearchIcon />}
  error={errors.title}
/>
```

#### 3. **Card**
```tsx
import { Card, CardBody, CardHeader, CardFooter } from '@/components/common/Card/Card';

<Card hoverable>
  <CardHeader>Header Content</CardHeader>
  <CardBody>Body Content</CardBody>
  <CardFooter>Footer Content</CardFooter>
</Card>
```

#### 4. **Tag**
```tsx
import { Tag } from '@/components/common/Tag/Tag';

<Tag variant="primary" icon={<Icon />} onRemove={handleRemove}>
  travel
</Tag>

// Variants: default, primary, success, warning, danger
```

#### 5. **Avatar**
```tsx
import { Avatar } from '@/components/common/Avatar/Avatar';

<Avatar src={userImage} alt="User" size="md" />
<Avatar name="John Doe" size="lg" />

// Sizes: sm, md, lg, xl
```

#### 6. **SearchBar**
```tsx
import { SearchBar } from '@/components/common/SearchBar/SearchBar';

<SearchBar
  placeholder="Search memories..."
  onSearch={handleSearch}
  onChange={handleChange}
/>
```

#### 7. **Modal**
```tsx
import { Modal } from '@/components/common/Modal/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  footer={<Button>Save</Button>}
>
  Modal Content
</Modal>

// Sizes: sm, md, lg, xl
```

### Feature Components

#### 1. **MemoryCard**
```tsx
import { MemoryCard } from '@/components/features/MemoryCard/MemoryCard';

<MemoryCard
  id={memory.id}
  title={memory.title}
  date={memory.date}
  content={memory.content}
  tags={memory.tags}
  mood={memory.mood}
  likes={memory.likes}
  comments={memory.comments}
  image={memory.images?.[0]}
  onClick={() => navigate(`/memory/${memory.id}`)}
/>
```

#### 2. **TimelineView**
```tsx
import { TimelineView } from '@/components/features/TimelineView/TimelineView';

<TimelineView
  memories={memories}
  onMemoryClick={handleMemoryClick}
/>
```

#### 3. **GalleryView**
```tsx
import { GalleryView } from '@/components/features/GalleryView/GalleryView';

<GalleryView
  memories={memories}
  onMemoryClick={handleMemoryClick}
/>
```

#### 4. **FilterSidebar**
```tsx
import { FilterSidebar } from '@/components/features/FilterSidebar/FilterSidebar';

<FilterSidebar onFilterChange={handleFilterChange} />
```

## 🛣️ Routing Structure

```tsx
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { TimelinePage } from '../pages/Timeline';
import { GalleryPage } from '../pages/Gallery';
import { MemoryDetailPage } from '../pages/MemoryDetail';

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
    ],
  },
]);
```

## 🔗 Navigation Flow

```
Home (Timeline) → Memory Detail
            ↓
        Gallery View
            ↓
    Create New Memory
            ↓
    Select Template
            ↓
    Add Decorations
```

## 📊 Type Definitions

```typescript
// src/types/memory.ts
export interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  mood?: string;
  tags: string[];
  images?: string[];
  visibility: 'public' | 'friends' | 'private';
  createdAt: string;
  updatedAt: string;
  userId: string;
  likes: number;
  comments: number;
}

export interface MemoryFilter {
  year?: number;
  tags?: string[];
  mood?: string;
  sortBy?: 'newest' | 'oldest' | 'mostLiked';
}
```

## 🎨 Styling System

### Color Palette
```css
--primary: #ee652b;
--background-light: #f8f6f6;
--background-dark: #221610;
--text-primary: #181311;
--text-secondary: #896f61;
--border: #f4f2f0;
```

### Typography
```css
--font-display: 'Epilogue', sans-serif;
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 2rem;
--font-size-4xl: 2.25rem;
```

### Spacing
```css
--spacing-1: 0.25rem;
--spacing-2: 0.5rem;
--spacing-3: 0.75rem;
--spacing-4: 1rem;
--spacing-6: 1.5rem;
--spacing-8: 2rem;
```

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Component Files
Copy all the component files from the artifacts into your project following the structure above.

### 3. Update main.tsx
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### 4. Create Global Styles
```css
/* src/styles/global.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Epilogue', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: #181311;
  background-color: #f8f6f6;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

button {
  font-family: inherit;
}
```

### 5. Start Development Server
```bash
npm run dev
```

## 🔄 Data Flow

### Fetching Memories
```tsx
// Current: Using mock data
import { mockMemories } from '@/mock/memoryData';

// Future: Replace with API calls
import { fetchMemories } from '@/api/services/memoryApi';

const memories = await fetchMemories();
```

### Filtering & Sorting
```tsx
import { filterMemories } from '@/utils/memoryHelpers';

const filtered = filterMemories(memories, {
  year: 2023,
  tags: ['travel'],
  sortBy: 'newest',
});
```

## 🎯 Next Steps

### Phase 1: Core Features
- [x] Component library setup
- [x] Timeline view
- [x] Gallery view
- [x] Memory detail page
- [ ] Memory creation flow
- [ ] Template selection
- [ ] Decoration/sticker picker

### Phase 2: Advanced Features
- [ ] Map view with geolocation
- [ ] Social features (likes, comments, shares)
- [ ] Search & filters
- [ ] User profiles
- [ ] Dark mode support

### Phase 3: Backend Integration
- [ ] Replace mock data with API calls
- [ ] Authentication flow
- [ ] File upload for images
- [ ] Real-time updates (WebSocket)

## 📝 Best Practices

### Component Organization
1. Keep components small and focused
2. Use composition over inheritance
3. Extract reusable logic into custom hooks
4. Maintain consistent naming conventions

### State Management
```tsx
// Local state for UI
const [isOpen, setIsOpen] = useState(false);

// Global state with Redux (if needed)
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const memories = useAppSelector(state => state.memories.list);
const dispatch = useAppDispatch();
```

### Error Handling
```tsx
try {
  const memories = await fetchMemories();
  setMemories(memories);
} catch (error) {
  console.error('Failed to fetch memories:', error);
  // Show error toast/notification
}
```

### Performance Optimization
```tsx
// Memoize expensive computations
const filteredMemories = useMemo(
  () => filterMemories(memories, filter),
  [memories, filter]
);

// Lazy load images
<img src={image} loading="lazy" alt="Memory" />
```

## 🐛 Troubleshooting

### Common Issues

1. **Components not rendering**
   - Check file paths and imports
   - Ensure CSS files are imported
   - Verify router configuration

2. **Styles not applying**
   - Import CSS files in component
   - Check class name spelling
   - Verify CSS specificity

3. **Navigation not working**
   - Use `Link` from react-router-dom
   - Check route configuration
   - Verify `RouterProvider` setup

## 📚 Additional Resources

- [React Router Documentation](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [CSS Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS)

## 🤝 Contributing

1. Create feature branch
2. Follow component structure
3. Add TypeScript types
4. Write CSS following conventions
5. Test thoroughly before PR

---

**Happy Coding! 🚀**