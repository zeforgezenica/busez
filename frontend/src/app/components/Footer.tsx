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
  name: z.string().min(1, { message: "Obavezno polje" }),
  subject: z.string().min(1, { message: "Obavezno polje" }),
  contactInfo: z.string().optional(),
  details: z.string().min(1, { message: "Obavezno polje" }),
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
          Ime: ${values.name}
          Kontakt: ${values.contactInfo || "N/A"}
          Detalji: ${values.details}
        `,
        senderName: values.name,
        senderContact: values.contactInfo || "N/A",
      };
      await emailService.sendEmail(emailData);
      toast({ title: "Vaša poruka je uspješno poslana ✅" });
      form.reset();
    } catch (error) {
      toast({
        title: "Došlo je do greške prilikom slanja poruke ❌",
        variant: "destructive",
      });
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700 mt-auto py-10">
      
      <div className="container mx-auto px-6 grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] max-w-7xl items-start">
        {/* Left Section */}
        <div className="flex flex-row items-start gap-4"> 
          <div className="shrink-0">
            <img 
                src="/zeforgeLogo.png" 
                alt="ZeForge Logo" 
                className="h-28 w-auto object-contain" 
            />
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white mb-1">ZeForge Zenica</h2>
            <p className="text-sm">
              Aplikacija za pretraživanje autobusnih linija 🚍 <br />
              Napravljeno sa ❤️ od strane open source zajednice Zenice
            </p>
            <p className="mt-2 text-sm text-gray-400">
              &copy; {new Date().getFullYear()} ZeForge Zenica. <br className="md:hidden" /> All rights reserved.
            </p>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white mb-2">Kontaktirajte nas:</h3>

          <div className="flex items-center gap-2">
            <img 
              src="/email.png" 
              alt="Email Icon" 
              className="h-5 w-5 object-contain" 
            />
          <p>
            
            <span className="font-semibold">E-pošta:</span>{" "}
            <a
              href="mailto:info@zeforge.ba"
              className="text-blue-400 hover:underline"
            >
              info@zeforge.ba
            </a>
          </p>
          </div>

          <div className="flex items-center gap-2">
            <img 
              src="/phone-call.png" 
              alt="Phone Icon" 
              className="h-5 w-5 object-contain" 
            />
          <p>
            <span className="font-semibold">Broj telefona:</span>{" "}
            <a
              href="tel:+38732979844"
              className="text-blue-400 hover:underline"
            >
              +387 32 979 844
            </a>
          </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:items-end">
          <h3 className="font-semibold text-white mb-3">Pratite nas:</h3>
          <div className="flex gap-5 text-2xl mb-4">
            <a
              href="https://github.com/zeforgezenica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/company/zeforge-zenica/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/zeforge?igsh=MXR0c21qMnNzaTU3NA=="
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.twitter.com/zeforgezenica"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter />
            </a>
          </div>
          
          <Dialog>
            <DialogTrigger className="text-blue-400 hover:underline cursor-pointer">
              Prijavite problem / predložite funkcionalnost
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Prijavite problem / predložite funkcionalnost</DialogTitle>
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
                        <FormLabel>Ime *</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite vaše ime" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="contactInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kontakt (Opcionalno)</FormLabel>
                        <Input placeholder="E-pošta ili telefon" {...field} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naslov *</FormLabel>
                        <FormControl>
                          <Input placeholder="Unesite naslov" {...field} />
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
                        <FormLabel>Detalji *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Opišite problem ili prijedlog"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-2">
                    <DialogClose asChild>
                      <Button variant="destructive">Zatvorite</Button>
                    </DialogClose>
                    <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-500">
                      Pošaljite
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
