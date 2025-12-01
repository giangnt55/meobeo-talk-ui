export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  // Navigation
  TRENDING: "/trending",
  FOLLOWING: "/following",
  SEARCH: "/search",
  SETTINGS: "/settings",
  // Auth
  LOGIN: "/login",
  REGISTER: "/register",
  // Post 
  POSTS: "/posts",
  MY_POSTS: "/posts/mine",
  POST_CREATE: "/posts/create",
  POST_DETAIL: (id: string) => `/posts/${id}`,
  // Profile
  USERS: "/users",
  PROFILE: (userId: string) => `/users/${userId}`,
  NOTIFICATIONS: "/notifications",
};