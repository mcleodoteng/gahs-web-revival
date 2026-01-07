import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

async function sendEmail(to: string[], subject: string, html: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "GAHS Contact Form <onboarding@resend.dev>",
      to,
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Resend API error: ${errorData}`);
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, subject, message }: ContactNotificationRequest = await req.json();

    console.log("Sending contact notification email for:", { name, email, subject });

    // Send notification to admin
    const adminResult = await sendEmail(
      ["info@gahs.org.gh"], // Change this to your admin email
      `New Contact Form Submission: ${subject}`,
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Contact Form Submission
          </h1>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Contact Details</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #334155;">Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
            This email was sent from the GAHS website contact form.
          </p>
        </div>
      `
    );

    console.log("Admin notification sent:", adminResult);

    // Send confirmation to user
    const userResult = await sendEmail(
      [email],
      "We received your message - Ghana Adventist Health Services",
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1e40af;">Thank You for Contacting Us</h1>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to Ghana Adventist Health Services. We have received your message regarding "<strong>${subject}</strong>" and will respond within 24-48 hours.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Your Message</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>If you need immediate assistance, please call us at +233 (0) 322 392 578.</p>
          
          <p>
            Best regards,<br>
            <strong>GAHS Team</strong>
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
          
          <p style="color: #64748b; font-size: 12px;">
            Ghana Adventist Health Services<br>
            Kumasi, Ghana
          </p>
        </div>
      `
    );

    console.log("User confirmation sent:", userResult);

    return new Response(
      JSON.stringify({ success: true, adminResult, userResult }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
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
