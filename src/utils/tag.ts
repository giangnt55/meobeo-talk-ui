export const POPULAR_TAGS: string[] = [
  "react",
  "typescript",
  "javascript",
  "webdev",
  "frontend",
  "backend",
  "mui",
  "golang",
];

export const DEFAULT_TAGS: string[] = [...POPULAR_TAGS];

export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}
