import { supabase } from "./supabase";

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
  const { data, error } = await supabase.functions.invoke("fetch-substack-posts");

  if (error) {
    console.error("Failed to fetch Substack posts:", error);
    return [];
  }

  return (data ?? []) as SubstackPost[];
}
