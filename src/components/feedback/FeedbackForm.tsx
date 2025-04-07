
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { supabase } from '@/integrations/supabase/client';

// Feedback form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Send feedback to Supabase
      const { error } = await supabase
        .from('feedback')
        .insert([
          {
            email: data.email,
            message: data.message,
            status: 'pending',
            is_read: false,
          }
        ]) as { error: any };

      if (error) throw error;
      
      toast({
        title: "Feedback submitted!",
        description: "Thank you for your feedback. We'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Something went wrong.",
        description: "Your feedback could not be submitted. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base">Name</Label>
            <Input
              id="name"
              {...register('name')}
              className={`w-full text-base min-h-12 ${errors.name ? 'border-red-500' : ''}`}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={`w-full text-base min-h-12 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="Your email address"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message" className="text-base">Message</Label>
            <Textarea
              id="message"
              {...register('message')}
              className={`w-full text-base min-h-32 ${errors.message ? 'border-red-500' : ''}`}
              placeholder="Please share your feedback, suggestions, or questions here..."
              disabled={isSubmitting}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end border-t p-6">
          <Button 
            type="submit" 
            size={isMobile ? "default" : "lg"}
            className="min-w-32"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
