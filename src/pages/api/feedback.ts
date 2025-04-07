
import { supabase } from '@/integrations/supabase/client';

export async function POST(req: Request) {
  try {
    const { email, message, timestamp } = await req.json();

    // Store feedback in Supabase with type assertion
    const { error } = await supabase
      .from('feedback')
      .insert([
        {
          email,
          message,
          created_at: timestamp,
          status: 'pending',
          is_read: false
        }
      ]) as { error: any };

    if (error) throw error;

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
