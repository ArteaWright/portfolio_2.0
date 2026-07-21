// Supabase Edge Function: fetch-substack-posts
// Fetches the latest Substack posts server-side using a secret API key.
// The key only ever lives here (Supabase secrets) — never in a local .env
// file read during the Vite build, and never in client code.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("SUBSTACK_API_KEY");
    const url = Deno.env.get("SUBSTACK_API_URL");

    if (!apiKey || !url) {
      throw new Error("SUBSTACK_API_KEY or SUBSTACK_API_URL secret is not set on this Edge Function.");
    }

    const response = await fetch(url, {
      headers: { "X-API-Key": apiKey },
    });

    if (!response.ok) {
      throw new Error(`Substack API responded with ${response.status}`);
    }

    const { data } = await response.json();

    const posts = (data ?? []).slice(0, 10).map((post: any) => ({
      slug: post.slug,
      title: post.title,
      url: post.url,
      description: post.description,
      excerpt: post.excerpt,
      date: post.date,
      readingTimeMinutes: post.reading_time_minutes,
    }));

    return new Response(JSON.stringify(posts), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("fetch-substack-posts error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
