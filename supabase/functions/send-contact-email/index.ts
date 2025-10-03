

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

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  address?: string;
  message: string;
  services: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function invoked: send-contact-email");
    
    // Get business email from settings or use fallback
    let businessEmail = "info@nmlandscapingllc.com"; // Default fallback
    
    try {
      const { data: settings, error: settingsError } = await supabase
        .from('business_settings')
        .select('business_email')
        .single();

      if (settingsError) {
        console.error("Error fetching business settings:", settingsError);
      } else if (settings && settings.business_email) {
        businessEmail = settings.business_email;
        console.log("Using business email from settings:", businessEmail);
      }
    } catch (settingsErr) {
      console.error("Failed to fetch business settings:", settingsErr);
    }

    const requestData = await req.json();
    console.log("Request data:", requestData);
    
    const { name, email, phone, address, message, services }: ContactEmailRequest = requestData;

    // Send confirmation email to the customer
    // IMPORTANT CHANGE: Using a noreply address for the "from" field but configuring "reply-to" 
    // to allow proper replies that go to the actual business email
    console.log("Sending confirmation email to customer:", email);
    const customerEmailResponse = await resend.emails.send({
      from: "N&M Landscaping <onboarding@resend.dev>", // Using Resend's verified domain
      reply_to: businessEmail, // Business email will receive replies
      to: [email],
      subject: "Thank you for contacting N&M Landscaping!",
      html: `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a summary of your message:</p>
        <p><strong>Services Requested:</strong><br>${services.join(', ')}</p>
        <p><strong>Your Message:</strong><br>${message}</p>
        <p>Best regards,<br>N&M Landscaping Team</p>
      `,
    });
    
    console.log("Customer email response:", customerEmailResponse);

    // Send notification email to the business
    console.log("Sending notification email to business:", businessEmail);
    const businessEmailResponse = await resend.emails.send({
      from: "N&M Landscaping Website <onboarding@resend.dev>", // Using Resend's verified domain
      reply_to: email, // Customer email as reply-to so business can reply directly to the customer
      to: [businessEmail],
      subject: "New Contact Form Submission",
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${address ? `<p><strong>Address:</strong> ${address}</p>` : ''}
        <p><strong>Services Requested:</strong><br>${services.join(', ')}</p>
        <p><strong>Message:</strong><br>${message}</p>
      `,
    });
    
    console.log("Business email response:", businessEmailResponse);

    return new Response(JSON.stringify({ 
      success: true,
      customerEmail: customerEmailResponse,
      businessEmail: businessEmailResponse
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
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
