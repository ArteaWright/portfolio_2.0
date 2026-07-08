// Supabase Edge Function: send-contact-email
// Sends an email notification via Resend whenever the Contact Form is submitted.
// The RESEND_API_KEY secret only ever lives here (server-side) — never in client code.

const CONTACT_RECIPIENT = "artealwright@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, organization, message } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Missing required fields: name, email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY secret is not set on this Edge Function.");
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeOrganization = escapeHtml(String(organization || "—"));
    const safeMessage = escapeHtml(String(message || "—")).replace(/\n/g, "<br/>");

    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Organization:</strong> ${safeOrganization}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage}</p>
    `;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact Form <onboarding@resend.dev>",
        to: [CONTACT_RECIPIENT],
        reply_to: email,
        subject: `New inquiry from ${safeName}`,
        html: emailHtml,
      }),
    });

    if (!resendResponse.ok) {
      const errorBody = await resendResponse.text();
      throw new Error(`Resend API error (${resendResponse.status}): ${errorBody}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("send-contact-email error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
