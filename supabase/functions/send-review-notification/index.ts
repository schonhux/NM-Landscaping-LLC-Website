
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewNotificationRequest {
  rating: number;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get business email from settings
    const { data: settings, error: settingsError } = await supabase
      .from('business_settings')
      .select('business_email')
      .single();

    if (settingsError) throw settingsError;
    if (!settings) throw new Error('Business settings not found');

    const { rating, message }: ReviewNotificationRequest = await req.json();

    // Send notification email to the business owners
    const businessEmailResponse = await resend.emails.send({
      from: "N&M Landscaping Website <onboarding@resend.dev>",
      to: [settings.business_email],
      subject: "New Review Submitted",
      html: `
        <h1>New Review Submitted</h1>
        <p><strong>Rating:</strong> ${rating} stars</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });

    console.log("Review notification email sent successfully:", businessEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-review-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
