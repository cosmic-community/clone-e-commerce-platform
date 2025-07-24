import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, ContactFormData } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Send emails
    const result = await sendContactEmail(body);
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Emails sent successfully',
        notificationId: result.notificationId,
        confirmationId: result.confirmationId,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to send emails' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}