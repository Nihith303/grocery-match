import { supabase } from '@/integrations/supabase/client';

export async function POST(req: Request) {
  try {
    const { email, message, timestamp } = await req.json();

    // Store feedback in Supabase
    const { error } = await supabase
      .from('feedback')
      .insert([
        {
          email,
          message,
          created_at: timestamp,
        },
      ]);

    if (error) throw error;

    // Send email notification to admin (you can implement this using your preferred email service)
    // Example using a hypothetical email service:
    /*
    await sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Feedback Received',
      body: `
        New feedback received from ${email}:
        
        Message:
        ${message}
        
        Submitted at: ${timestamp}
      `,
    });
    */

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error handling feedback:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to submit feedback' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}