import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    // Send notification email to tony@cosmicjs.com
    const notificationEmail = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: 'tony@cosmicjs.com',
      subject: `New Contact Form Submission: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #000; white-space: pre-wrap;">
${data.message}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the contact form on your website.</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
      from: 'tony@cosmicjs.com',
      to: data.email,
      subject: 'Thank you for contacting us',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 10px;">
            Thank You for Contacting Us
          </h2>
          
          <p>Hi ${data.name},</p>
          
          <p>Thank you for reaching out to us. We have received your message regarding "${data.subject}" and will get back to you as soon as possible.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #000; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your message:</h3>
            <div style="white-space: pre-wrap;">
${data.message}
            </div>
          </div>
          
          <p>We typically respond within 24-48 hours during business days.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>Best regards,<br>The Team</p>
          </div>
        </div>
      `,
    });

    return {
      success: true,
      notificationId: notificationEmail.data?.id,
      confirmationId: confirmationEmail.data?.id,
    };
  } catch (error) {
    console.error('Error sending emails:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}