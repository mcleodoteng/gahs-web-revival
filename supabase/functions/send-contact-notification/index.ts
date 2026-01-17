import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Allowed origins for CORS
const allowedOrigins = [
  "https://id-preview--3074ffc0-d6ae-4a13-9315-eb9b91a01f94.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const effectiveOrigin = origin && allowedOrigins.includes(origin) 
    ? origin 
    : allowedOrigins[0];
  
  return {
    "Access-Control-Allow-Origin": effectiveOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Simple validation function
function validateInput(data: unknown): { valid: true; data: ContactNotificationRequest } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, phone, subject, message } = data as Record<string, unknown>;

  // Validate name
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, error: "Name must be between 2 and 100 characters" };
  }

  // Validate email
  if (typeof email !== 'string' || email.trim().length > 255) {
    return { valid: false, error: "Email must be less than 255 characters" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: "Invalid email format" };
  }

  // Validate phone (optional)
  if (phone !== undefined && phone !== null && typeof phone !== 'string') {
    return { valid: false, error: "Phone must be a string" };
  }
  if (typeof phone === 'string' && phone.trim().length > 20) {
    return { valid: false, error: "Phone must be less than 20 characters" };
  }

  // Validate subject
  if (typeof subject !== 'string' || subject.trim().length < 3 || subject.trim().length > 200) {
    return { valid: false, error: "Subject must be between 3 and 200 characters" };
  }

  // Validate message
  if (typeof message !== 'string' || message.trim().length < 10 || message.trim().length > 5000) {
    return { valid: false, error: "Message must be between 10 and 5000 characters" };
  }

  return {
    valid: true,
    data: {
      name: name.trim(),
      email: email.trim(),
      phone: typeof phone === 'string' ? phone.trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
    },
  };
}

// Escape HTML to prevent XSS in emails
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

async function sendEmail(to: string[], subject: string, html: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  
  if (!RESEND_API_KEY) {
    console.log("RESEND_API_KEY not set, skipping email");
    return { skipped: true, reason: "No API key configured" };
  }
  
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
    console.warn(`Resend API error (non-blocking): ${errorData}`);
    return { skipped: true, reason: errorData };
  }

  return response.json();
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Parse and validate input
    let requestData: unknown;
    try {
      requestData = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON body" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const validation = validateInput(requestData);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { name, email, phone, subject, message } = validation.data;

    console.log("Processing contact notification for:", { name: name.substring(0, 20), email: email.substring(0, 20), subject: subject.substring(0, 30) });

    // Escape all user input for HTML emails
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : null;
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message);

    // Admin notification email address (stored in code as this is intentional)
    const adminEmail = Deno.env.get("ADMIN_NOTIFICATION_EMAIL") || "ghanaadventisthealthservices@gmail.com";

    // Try to send notification to admin (non-blocking on failure)
    let adminResult = { skipped: true, reason: "Not attempted" };
    let userResult = { skipped: true, reason: "Not attempted" };
    
    try {
      adminResult = await sendEmail(
        [adminEmail],
        `New Contact Form Submission: ${safeSubject}`,
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
              New Contact Form Submission
            </h1>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #334155;">Contact Details</h3>
              <p><strong>Name:</strong> ${safeName}</p>
              <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
              ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
              <p><strong>Subject:</strong> ${safeSubject}</p>
            </div>
            
            <div style="background: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h3 style="margin-top: 0; color: #334155;">Message</h3>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
            </div>
            
            <p style="color: #64748b; font-size: 12px; margin-top: 30px;">
              This email was sent from the GAHS website contact form.
            </p>
          </div>
        `
      );
      console.log("Admin notification result:", adminResult);
    } catch (err) {
      console.warn("Admin email failed (non-blocking):", err);
    }

    // Try to send confirmation to user (non-blocking on failure)
    try {
      userResult = await sendEmail(
        [email],
        "We received your message - Ghana Adventist Health Services",
        `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af;">Thank You for Contacting Us</h1>
            
            <p>Dear ${safeName},</p>
            
            <p>Thank you for reaching out to Ghana Adventist Health Services. We have received your message regarding "<strong>${safeSubject}</strong>" and will respond within 24-48 hours.</p>
            
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #334155;">Your Message</h3>
              <p style="white-space: pre-wrap;">${safeMessage}</p>
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
      console.log("User confirmation result:", userResult);
    } catch (err) {
      console.warn("User email failed (non-blocking):", err);
    }

    // Always return success - the message is saved to DB regardless of email status
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Contact form processed successfully"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
