
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

// Define the Feedback interface which matches the database table structure
interface Feedback {
  id: string;
  email: string;
  message: string;
  created_at: string;
  status: 'pending' | 'reviewed' | 'resolved';
  admin_response?: string;
  is_read: boolean;
}

export default function FeedbackDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      // Use type assertion to work around TypeScript limitations with the feedback table
      const { data, error } = await supabase
        .from('feedback')
        .select('*')
        .order('created_at', { ascending: false }) as { 
          data: Feedback[] | null; 
          error: any;
        };

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast({
        title: "Error loading feedback",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (id: string, status: 'pending' | 'reviewed' | 'resolved') => {
    try {
      // Use type assertion here as well
      const { error } = await supabase
        .from('feedback')
        .update({ status })
        .eq('id', id) as {
          error: any;
        };

      if (error) throw error;

      setFeedbacks(feedbacks.map(f => 
        f.id === id ? { ...f, status } : f
      ));

      toast({
        title: "Status updated",
        description: "Feedback status has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating feedback status:', error);
      toast({
        title: "Error updating status",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // Use type assertion here as well
      const { error } = await supabase
        .from('feedback')
        .update({ is_read: true })
        .eq('id', id) as {
          error: any;
        };

      if (error) throw error;

      setFeedbacks(feedbacks.map(f => 
        f.id === id ? { ...f, is_read: true } : f
      ));
    } catch (error) {
      console.error('Error marking feedback as read:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#556B2F]">Feedback Dashboard</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF8C42]"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.map((feedback) => (
                  <TableRow 
                    key={feedback.id}
                    className={!feedback.is_read ? 'bg-blue-50' : ''}
                    onClick={() => !feedback.is_read && markAsRead(feedback.id)}
                  >
                    <TableCell className="whitespace-nowrap">
                      {formatDistanceToNow(new Date(feedback.created_at), { addSuffix: true })}
                    </TableCell>
                    <TableCell>{feedback.email}</TableCell>
                    <TableCell className="max-w-md">
                      <div className="line-clamp-2">{feedback.message}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(feedback.status)}>
                        {feedback.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateFeedbackStatus(feedback.id, 'reviewed')}
                          disabled={feedback.status === 'reviewed'}
                        >
                          Mark Reviewed
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateFeedbackStatus(feedback.id, 'resolved')}
                          disabled={feedback.status === 'resolved'}
                        >
                          Mark Resolved
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
