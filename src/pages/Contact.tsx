import React from "react";
import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import emailjs from "emailjs-com";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // const onSubmit = (data: FormValues) => {
  //   console.log("Form data:", data);
  //   toast({
  //     title: "Message Sent!",
  //     description: "Thank you for reaching out. We'll get back to you soon.",
  //   });
  //   form.reset();
  // };
  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);

    const emailParams = {
      to_email: "99220040551@klu.ac.in",
      subject: data.subject || "Message from Grocery Match",
      message: JSON.stringify(data, null, 2),
    };

    emailjs
      .send("service_id", "template_id", emailParams, "user_id")
      .then(() => {
        toast({
          title: "Message Sent!",
          description:
            "Thank you for reaching out. We'll get back to you soon.",
        });
        form.reset();
      })
      .catch((error) => {
        console.error("Email sending failed:", error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
        });
      });
  };

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-600">99220040551@klu.ac.in</p>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-gray-600">+91 903-268-2005</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-1 text-primary" />
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-gray-600">
                    123 Culinary Street
                    <br />
                    Foodie City, FC 12345
                    <br />
                    India
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <div className="rounded-md overflow-hidden h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.2379549170582!2d77.67721322478779!3d9.57474519051006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06dbc06968e9eb%3A0x6cfd8f94e42f98c4!2sKalasalingam%20Academy%20of%20Research%20and%20Education!5e0!3m2!1sen!2sin!4v1741721735152!5m2!1sen!2sin"
                  width="100%"
                  height="500"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
  );
};

export default Contact;
