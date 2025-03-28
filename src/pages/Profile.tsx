
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/database.types";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address").optional(),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .refine(
      (value) => {
        // Basic phone validation - allows digits, spaces, and common phone characters
        return /^[0-9\s\+\-\(\)]{10,15}$/.test(value);
      },
      {
        message: "Please enter a valid phone number",
      }
    ),
  address: z.string().min(5, "Please enter a complete address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [fromCheckout, setFromCheckout] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    },
  });

  useEffect(() => {
    // Check if coming from checkout flow
    const searchParams = new URLSearchParams(location.search);
    const fromCart = searchParams.get('from') === 'cart';
    setFromCheckout(fromCart);
  }, [location]);

  useEffect(() => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to view your profile",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        
        // Transform the data to match the Profile type
        const profileData: Profile = {
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email || user.email,
          phone_number: data.phone_number || null,
          address: data.address || null,
          profile_image_url: data.profile_image_url || null,
          created_at: data.created_at,
          updated_at: data.updated_at
        };
        
        setProfile(profileData);
        
        form.reset({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || user.email || "",
          phoneNumber: data.phone_number || "",
          address: data.address || "",
        });
      } catch (error: any) {
        console.error("Error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error loading profile",
          description: error.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate, form]);

  const formatPhoneNumber = (input: string) => {
    // Strip all non-digit characters
    const digits = input.replace(/\D/g, '');
    
    // Format for standard 10-digit US number (XXX) XXX-XXXX
    if (digits.length === 10) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
    
    // Return input as is if not 10 digits
    return input;
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formatted = formatPhoneNumber(input);
    form.setValue("phoneNumber", formatted);
  };

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;

    try {
      setIsLoading(true);
      
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          phone_number: values.phoneNumber,
          address: values.address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });

      // If coming from checkout, redirect back to cart
      if (fromCheckout) {
        navigate("/cart");
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Profile update failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !profile) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          Loading profile...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          {fromCheckout && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-amber-800">
              <h2 className="font-semibold text-lg mb-1">Complete Your Profile</h2>
              <p>Please provide your delivery address and phone number to proceed with checkout.</p>
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        disabled
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number 
                      {fromCheckout && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel" 
                        placeholder="(123) 456-7890" 
                        {...field}
                        onChange={(e) => {
                          handlePhoneInput(e);
                          field.onChange(e);
                        }}
                        className={fromCheckout && !field.value ? "border-red-300 focus:border-red-500" : ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Address
                      {fromCheckout && <span className="text-red-500 ml-1">*</span>}
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main St, City, State, Zip" 
                        {...field}
                        className={fromCheckout && !field.value ? "border-red-300 focus:border-red-500" : ""} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center pt-4">
                {fromCheckout && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate("/cart")}
                    disabled={isLoading}
                  >
                    Back to Cart
                  </Button>
                )}
                <Button 
                  type="submit" 
                  className={fromCheckout ? "" : "w-full"} 
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : fromCheckout ? "Save and Continue" : "Update Profile"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
