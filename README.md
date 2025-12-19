# 🎨 Meobeo Talk UI

> Frontend Application cho Meobeo Talk - Ứng dụng mạng xã hội chia sẻ kỷ niệm

## 📋 Mục Lục

- [Tổng Quan](#-tổng-quan)
- [Công Nghệ Sử Dụng](#-công-nghệ-sử-dụng)
- [Cài Đặt](#-cài-đặt)
- [Cấu Trúc Dự Án](#-cấu-trúc-dự-án)
- [Component Library](#-component-library)
- [Routing & Navigation](#-routing--navigation)
- [State Management](#-state-management)
- [API Integration](#-api-integration)
- [Development Guide](#-development-guide)

---

## 🎯 Tổng Quan

Meobeo Talk UI là ứng dụng frontend được xây dựng với **React**, **TypeScript**, và **Vite**, cung cấp giao diện người dùng hiện đại và responsive cho việc chia sẻ kỷ niệm và kết nối với bạn bè.

### Tính Năng Chính

- ✅ **Authentication Flow**: Đăng ký, đăng nhập, xác thực email
- ✅ **Onboarding**: Hướng dẫn người dùng mới với profile setup, interests selection
- ✅ **Home Feed**: Feed cá nhân hóa với posts từ người dùng theo dõi
- ✅ **Trending Topics**: Hiển thị hashtags đang trending
- ✅ **User Profiles**: Xem và chỉnh sửa profile
- ✅ **Social Features**: Follow/unfollow, suggested users
- ✅ **Responsive Design**: Tối ưu cho mobile, tablet, desktop

---

## 🛠️ Công Nghệ Sử Dụng

| Công Nghệ | Phiên Bản | Mục Đích |
|-----------|-----------|----------|
| **React** | 18+ | UI Library |
| **TypeScript** | 5+ | Type Safety |
| **Vite** | 5+ | Build Tool & Dev Server |
| **React Router** | 6+ | Client-side Routing |
| **Ky** | Latest | HTTP Client |
| **Zod** | Latest | Schema Validation |
| **React Icons** | Latest | Icon Library |

---

## 🚀 Cài Đặt

### Prerequisites

```bash
# Cài đặt Node.js
node --version  # >= 18

# Cài đặt npm hoặc yarn
npm --version   # >= 9
```

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/meobeo-talk-ui.git
cd meobeo-talk-ui
```

### 2. Install Dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Setup Environment

```bash
# Copy file cấu hình mẫu
cp .env.development .env

# Chỉnh sửa .env
nano .env
```

**Cấu hình .env:**

```env
# API URL
VITE_API_URL=http://localhost:8080/api/v1

# App Config
VITE_APP_NAME=Meobeo Talk
VITE_APP_ENV=development
```

### 4. Start Development Server

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy tại: `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
# hoặc
yarn build

# Preview production build
npm run preview
```

---

## 📁 Cấu Trúc Dự Án

```
meobeo-talk-ui/
├── public/                        # Static assets
│   ├── favicon.ico
│   └── images/
│
├── src/
│   ├── api/                       # API Layer
│   │   ├── services/             # API service modules
│   │   │   ├── authApi.ts       # Authentication APIs
│   │   │   ├── postApi.ts       # Post APIs
│   │   │   ├── followApi.ts     # Follow APIs
│   │   │   ├── interestsApi.ts  # Interests APIs
│   │   │   └── profileApi.ts    # Profile APIs
│   │   └── types/               # API type definitions
│   │
│   ├── components/               # React Components
│   │   ├── common/              # Reusable components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── Button.css
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Avatar/
│   │   │   ├── Modal/
│   │   │   ├── SearchBar/
│   │   │   └── ProtectedRoute/
│   │   │
│   │   ├── features/            # Feature-specific components
│   │   │   ├── MemoryCard/
│   │   │   ├── TimelineView/
│   │   │   ├── GalleryView/
│   │   │   └── FilterSidebar/
│   │   │
│   │   └── layout/              # Layout components
│   │       ├── Navbar/
│   │       └── Footer/
│   │
│   ├── contexts/                # React Contexts
│   │   ├── AuthContext.tsx     # Authentication state
│   │   └── ThemeContext.tsx    # Theme state
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useDebounce.ts
│   │
│   ├── layouts/                 # Page Layouts
│   │   ├── MainLayout.tsx      # Main app layout
│   │   ├── PublicLayout.tsx    # Public pages layout
│   │   └── AuthLayout.tsx      # Auth pages layout
│   │
│   ├── pages/                   # Page Components
│   │   ├── Home/               # Home feed page
│   │   │   ├── index.tsx
│   │   │   ├── Home.css
│   │   │   └── components/
│   │   │       ├── FeedMasonry.tsx
│   │   │       ├── TrendingSidebar.tsx
│   │   │       └── PostCard.tsx
│   │   │
│   │   ├── Login/              # Login page
│   │   ├── Register/           # Registration page
│   │   ├── VerifyEmail/        # Email verification
│   │   ├── Onboarding/         # Onboarding flow
│   │   │   ├── ProfileSetup/
│   │   │   ├── InterestsSelection/
│   │   │   └── FollowUsers/
│   │   │
│   │   ├── Profile/            # User profile
│   │   ├── Settings/           # Settings pages
│   │   ├── Memories/           # Memories list
│   │   ├── CreateJournal/      # Create journal
│   │   └── NotFound/           # 404 page
│   │
│   ├── router/                  # Routing Configuration
│   │   └── index.tsx           # Route definitions
│   │
│   ├── schemas/                 # Zod Schemas
│   │   ├── auth.schema.ts
│   │   ├── memory.schema.ts
│   │   └── user.schema.ts
│   │
│   ├── store/                   # State Management (nếu dùng Redux/Zustand)
│   │   ├── slices/
│   │   └── index.ts
│   │
│   ├── styles/                  # Global Styles
│   │   ├── global.css
│   │   ├── variables.css
│   │   └── themes/
│   │
│   ├── types/                   # TypeScript Types
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── post.ts
│   │   ├── user.ts
│   │   └── common.ts
│   │
│   ├── utils/                   # Utility Functions
│   │   ├── dateHelpers.ts
│   │   ├── validation.ts
│   │   └── formatters.ts
│   │
│   ├── lib/                     # Third-party lib configs
│   │   └── ky-client.ts        # HTTP client setup
│   │
│   ├── App.tsx                  # Root component
│   ├── main.tsx                 # Entry point
│   └── vite-env.d.ts           # Vite types
│
├── .env.development             # Development environment
├── .env.production              # Production environment
├── index.html                   # HTML template
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
└── README.md
```

---

## 🎨 Component Library

### Common Components

#### Button
```tsx
import { Button } from '@/components/common/Button/Button';

<Button variant="primary" size="md" onClick={handleClick}>
  Click Me
</Button>

// Variants: primary, secondary, outline, ghost, danger
// Sizes: sm, md, lg
```

#### Input
```tsx
import { Input } from '@/components/common/Input/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email}
  onChange={handleChange}
/>
```

#### Card
```tsx
import { Card } from '@/components/common/Card/Card';

<Card hoverable>
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

#### Avatar
```tsx
import { Avatar } from '@/components/common/Avatar/Avatar';

<Avatar 
  src={user.avatar_url} 
  alt={user.username} 
  size="md" 
/>

// Sizes: sm (32px), md (40px), lg (56px), xl (80px)
```

#### Modal
```tsx
import { Modal } from '@/components/common/Modal/Modal';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
>
  <p>Are you sure?</p>
  <Button onClick={handleConfirm}>Confirm</Button>
</Modal>
```

### Feature Components

#### PostCard
```tsx
import PostCard from '@/pages/Home/components/PostCard';

<PostCard
  imageUrl={post.content_preview}
  title={post.title}
  authorName={post.author.display_name}
  authorAvatar={post.author.avatar_url}
  postType="blog"
/>
```

---

## 🛣️ Routing & Navigation

### Route Structure

```tsx
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  // Public routes
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <RegisterPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  
  // Protected routes
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Landing /> },
      { 
        path: 'home', 
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ) 
      },
      { path: 'profile/:username', element: <ProfilePage /> },
      { path: 'memories', element: <MemoriesPage /> },
      // ...
    ],
  },
  
  // Onboarding flow
  {
    path: '/onboarding',
    children: [
      { path: 'profile', element: <ProfileSetupPage /> },
      { path: 'interests', element: <InterestsSelectionPage /> },
      { path: 'follow', element: <FollowUsersPage /> },
    ],
  },
  
  // 404
  { path: '*', element: <NotFoundPage /> },
]);
```

### Navigation

```tsx
import { useNavigate, Link } from 'react-router-dom';

// Programmatic navigation
const navigate = useNavigate();
navigate('/home');
navigate(-1); // Go back

// Link component
<Link to="/profile/john">View Profile</Link>
```

---

## 🔄 State Management

### Auth Context

```tsx
// src/contexts/AuthContext.tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.username}!</p>
      ) : (
        <button onClick={() => login(credentials)}>Login</button>
      )}
    </div>
  );
}
```

### Custom Hooks

```tsx
// useAuth hook
const { user, isAuthenticated, login, logout } = useAuth();

// useApi hook
const { data, loading, error } = useApi('/posts/feed');

// useDebounce hook
const debouncedValue = useDebounce(searchTerm, 500);
```

---

## 🔌 API Integration

### HTTP Client Setup

```tsx
// src/lib/ky-client.ts
import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      }
    ]
  }
});
```

### API Services

```tsx
// src/api/services/postApi.ts
import { api } from '@/lib/ky-client';

export const postApi = {
  getFeed: async (page: number, limit: number) => {
    const response = await api.get('posts/feed', {
      searchParams: { page, limit }
    }).json();
    return response;
  },
  
  getTrending: async (limit: number) => {
    const response = await api.get('posts/trending', {
      searchParams: { limit }
    }).json();
    return response;
  },
};
```

### Usage in Components

```tsx
import { postApi } from '@/api/services/postApi';

function FeedComponent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await postApi.getFeed(1, 20);
        setPosts(response.posts);
      } catch (error) {
        console.error('Error fetching feed:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeed();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
```

---

## 💻 Development Guide

### Available Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Testing (nếu có)
npm run test         # Run tests
npm run test:watch   # Watch mode
npm run test:coverage # Coverage report
```

### Adding a New Page

**Bước 1: Tạo Page Component**
```tsx
// src/pages/NewPage/index.tsx
import React from 'react';
import './NewPage.css';

export const NewPage: React.FC = () => {
  return (
    <div className="new-page">
      <h1>New Page</h1>
    </div>
  );
};
```

**Bước 2: Tạo Styles**
```css
/* src/pages/NewPage/NewPage.css */
.new-page {
  padding: 2rem;
}
```

**Bước 3: Thêm Route**
```tsx
// src/router/index.tsx
import { NewPage } from '@/pages/NewPage';

{
  path: 'new-page',
  element: <NewPage />
}
```

**Bước 4: Thêm Navigation**
```tsx
<Link to="/new-page">Go to New Page</Link>
```

### Adding a New API Service

```tsx
// src/api/services/newApi.ts
import { api } from '@/lib/ky-client';
import type { ApiResponse } from '@/types/api';

export interface NewData {
  id: string;
  name: string;
}

export const newApi = {
  getAll: async (): Promise<NewData[]> => {
    const response = await api.get('new-endpoint')
      .json<ApiResponse<NewData[]>>();
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to fetch data');
  },
  
  create: async (data: Partial<NewData>): Promise<NewData> => {
    const response = await api.post('new-endpoint', {
      json: data
    }).json<ApiResponse<NewData>>();
    
    if (response.success && response.data) {
      return response.data;
    }
    
    throw new Error(response.message || 'Failed to create');
  },
};
```

### Type Definitions

```tsx
// src/types/newType.ts
export interface NewType {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNewTypeInput {
  name: string;
  description?: string;
}
```

---

## 🎨 Styling Guidelines

### CSS Variables

```css
/* src/styles/variables.css */
:root {
  /* Colors */
  --color-primary: #281c17;
  --color-secondary: #896f61;
  --color-background: #f8f6f6;
  --color-text: #181311;
  --color-border: #f4f2f0;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-family: 'Epilogue', sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

### Component Styling Pattern

```css
/* Component.css */
.component {
  /* Layout */
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  /* Spacing */
  padding: var(--spacing-lg);
  margin: 0;
  
  /* Colors */
  background-color: var(--color-background);
  color: var(--color-text);
  
  /* Typography */
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  
  /* Borders */
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}
```

---

## 🔐 Authentication Flow

```
1. User visits /login
2. Enter credentials
3. Call authApi.login()
4. Store tokens in localStorage
5. Update AuthContext
6. Redirect to /home
```

### Protected Routes

```tsx
// src/components/common/ProtectedRoute/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First Approach */
.component {
  /* Mobile styles (default) */
  padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    padding: 1.5rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    padding: 2rem;
  }
}

/* Large Desktop */
@media (min-width: 1280px) {
  .component {
    padding: 3rem;
  }
}
```

---

## 🐛 Debugging

### React DevTools
- Install React DevTools extension
- Inspect component tree
- View props and state

### Network Tab
- Monitor API calls
- Check request/response
- Debug authentication issues

### Console Logging
```tsx
console.log('Debug:', { user, posts, loading });
```

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Environment Variables

```env
# .env.production
VITE_API_URL=https://api.meobeo-talk.com/api/v1
VITE_APP_ENV=production
```

### Deploy to Vercel/Netlify

```bash
# Vercel
vercel --prod

# Netlify
netlify deploy --prod
```

---

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Follow coding conventions
4. Write TypeScript types
5. Test thoroughly
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Create Pull Request

---

## 📝 Best Practices

- ✅ Sử dụng TypeScript cho type safety
- ✅ Component nhỏ, tập trung vào một nhiệm vụ
- ✅ Tái sử dụng components thông qua composition
- ✅ Custom hooks cho logic có thể tái sử dụng
- ✅ Error boundaries cho error handling
- ✅ Lazy loading cho performance
- ✅ Accessibility (a11y) considerations
- ✅ Responsive design cho mọi thiết bị

---

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/meobeo-talk-ui/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/meobeo-talk-ui/issues)
- **Email**: support@meobeo-talk.com

---

**Happy Coding! 🎨**