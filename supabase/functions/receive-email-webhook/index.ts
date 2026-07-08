// Supabase Edge Function: receive-email-webhook
// Resend calls this endpoint (event: "email.received") whenever an email
// arrives at your inbound address. We forward it straight to a real inbox
// using the Resend SDK's forward() helper, which fetches the received
// email's content/attachments and re-sends it in one call.
//
// NOTE: This endpoint is public (Resend can't attach a Supabase auth token),
// so it does not verify the caller's identity yet. Resend signs webhook
// requests via Svix — once you grab the signing secret from the webhook's
// settings in the Resend dashboard, add RESEND_WEBHOOK_SECRET as a secret
// here and verify the signature before trusting the payload.

import { Resend } from "npm:resend@4";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const FORWARD_TO = "artealwright@gmail.com";

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const event = await req.json();

    if (event.type === "email.received") {
      const { data, error } = await resend.emails.receiving.forward({
        emailId: event.data.email_id,
        to: FORWARD_TO,
        from: "onboarding@resend.dev",
      });

      if (error) {
        console.error("Failed to forward received email:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({}), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("receive-email-webhook error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
