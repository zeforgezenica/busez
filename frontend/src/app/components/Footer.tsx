"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { FormLabel } from "@mui/material";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailService, { EmailPayload } from "../services/email.service";
import { useToast } from "@/hooks/use-toast";
import { FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const formSchema = z.object({
  name: z.string().min(1, { message: "Required field" }),
  subject: z.string().min(1, { message: "Required field" }),
  contactInfo: z.string().optional(),
  details: z.string().min(1, { message: "Required field" }),
});

const Footer: React.FC = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", subject: "", contactInfo: "", details: "" },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const emailData: EmailPayload = {
        subject: values.subject,
        text: `
          Name: ${values.name}
          Contact: ${values.contactInfo || "N/A"}
          Details: ${values.details}
        `,
        senderName: values.name,
        senderContact: values.contactInfo || "N/A",
      };
      await emailService.sendEmail(emailData);
      toast({ title: "Message sent successfully ✅" });
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message ❌",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 mt-auto py-10">
      <div className="container mx-auto px-6 grid gap-10 md:grid-cols-3">
        {/* Left Section */}
        <div>
          <h2 className="text-lg font-bold text-white mb-2">ZeForge Zenica</h2>
          <p className="text-sm">
            Aplikacija za pretraživanje autobusnih linija 🚍 <br />
            Napravljeno sa ❤️ od strane open source zajednice Zenice
          </p>
          <p className="mt-2 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} ZeForge Zenica. All rights
            reserved.
          </p>
        </div>

        {/* Center Section */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-white mb-2">Contact Us 📞</h3>
          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:info@zeforge.ba"
              className="text-blue-400 hover:underline"
            >
              info@zeforge.ba
            </a>
          </p>
          <p>
            <span className="font-semibold">Phone:</span>{" "}
            <a
              href="tel:+38732979844"
              className="text-blue-400 hover:underline"
            >
              +387 32 979 844
            </a>
          </p>

          <Dialog>
            <DialogTrigger className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg">
              Report Issue / Suggest Feature
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report Issue / Suggest Feature</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-6 pt-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact (Optional)</FormLabel>
                        <Input placeholder="Email or phone" {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter subject" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Details *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the issue or suggestion"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="destructive">Close</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-blue-600">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="font-semibold text-white mb-3">Follow Us 🌐</h3>
          <div className="flex gap-5 text-2xl">
            <a
              href="https://github.com/zeforgezenica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
