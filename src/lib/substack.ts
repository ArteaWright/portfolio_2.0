import substackPosts from "../data/substack-posts.json";

export interface SubstackPost {
  slug: string;
  title: string;
  url: string;
  description: string;
  excerpt: string;
  date: string;
  readingTimeMinutes: number;
}

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  return substackPosts as SubstackPost[];
}
