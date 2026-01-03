import type { Memory, MemoryFilter } from "../types/memory";

export const filterMemories = (memories: Memory[], filter: MemoryFilter): Memory[] => {
  let filtered = [...memories];

  if (filter.year) {
    filtered = filtered.filter(
      (m) => new Date(m.date).getFullYear() === filter.year
    );
  }

  if (filter.tags && filter.tags.length > 0) {
    filtered = filtered.filter((m) =>
      filter.tags!.some((tag) => m.tags.includes(tag))
    );
  }

  if (filter.mood) {
    filtered = filtered.filter((m) => m.mood === filter.mood);
  }

  // Sort
  switch (filter.sortBy) {
    case 'newest':
      filtered.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      break;
    case 'oldest':
      filtered.sort((a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
      break;
    case 'mostLiked':
      filtered.sort((a, b) => b.likes_count - a.likes_count);
      break;
  }

  return filtered;
};

export const formatMemoryDate = (date: string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};