import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";

const apiKey = process.env.X_API_Key;
const url = process.env.URL;

if (!apiKey || !url) {
  console.error("Missing X_API_Key or URL. Set them in .env before running this script.");
  process.exit(1);
}

const response = await fetch(url, {
  headers: { "X-API-Key": apiKey },
});

if (!response.ok) {
  console.error(`Substack API responded with ${response.status}`);
  process.exit(1);
}

const { data } = await response.json();

const posts = (data ?? []).slice(0, 10).map((post) => ({
  slug: post.slug,
  title: post.title,
  url: post.url,
  description: post.description,
  excerpt: post.excerpt,
  date: post.date,
  readingTimeMinutes: post.reading_time_minutes,
}));

const outDir = path.resolve("src/data");
mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, "substack-posts.json"), JSON.stringify(posts, null, 2) + "\n");

console.log(`Saved ${posts.length} Substack post(s) to src/data/substack-posts.json`);
