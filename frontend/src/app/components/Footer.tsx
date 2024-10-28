"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import emailService from "../services/email.service";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { FormLabel } from "@mui/material";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { useToast } from "@/hooks/use-toast";
import { EmailPayload } from "../services/email.service"; 

const formSchema = z.object({
  name: z.string().min(1, { message: "Obavezno polje" }),
  subject: z.string().min(1, { message: "Obavezno polje" }),
  contactInfo: z.string().optional(), 
  details: z.string().min(1, { message: "Obavezno polje" })
});

const Footer: React.FC = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      subject: "",
      contactInfo: "",
      details: ""
    }
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
      
      toast({
        title: "Vaša poruka je uspješno poslana."
      });
      form.reset();
    } catch (error) {
      
      toast({
        title: "Došlo je do greške prilikom slanja poruke.",
        variant: "destructive"
      });
    }
  };

  return (
      <>
        <footer className="bg-white border-t border-gray-200 mt-auto py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-between sm:flex-row">
              <div className="text-center sm:text-left space-y-4">
                <p className="text-gray-400">
                  &copy; {new Date().getFullYear()}{" "}
                  <a
                      href={"https://zeforge.ba"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={"text-indigo-400 underline"}
                  >
                    ZeForge Zenica
                  </a>
                </p>
                <p className="text-gray-400">
                  Aplikacija za pretraživanje autobusnih linija
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-left space-y-4">
                <p className="text-xl mb-5 text-left sm:text-left">
                  <strong>Kontakt</strong>
                </p>
                <p className="text-gray-400 text-left">
                  E-pošta:{" "}
                  <a
                      href={`mailto:${"info@zeforge.ba"}`}
                      className={"text-indigo-400 underline"}
                  >
                    info@zeforge.ba
                  </a>
                </p>
                <p className="text-gray-400 text-left">
                  Broj telefona:{" "}
                  <a
                      href={`tel:${"+38732979844"}`}
                      className={"text-indigo-400 underline"}
                  >
                    +387 32 979 844
                  </a>
                </p>
                <Dialog>
                  <DialogTrigger className="bg-indigo-400 text-white p-2 mt-2 rounded-lg">Prijavite problem / Predložite funkciju</DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Prijavite problem / Predložite funkciju</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 pt-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                  <FormLabel className="text-sm text-white font-semibold">Ime *</FormLabel>
                                  <FormControl>
                                      <Input
                                          placeholder="Unesite Vaše ime"
                                          {...field}
                                          className="bg-gray-200 outline-0 focus:border-0 focus:outline-none"
                                      />
                                  </FormControl>
                                  <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name="contactInfo"
                            render={({field}) => (
                                <FormItem>
                                  <FormLabel className="text-sm text-white font-semibold">Kontakt informacije (Nije obavezno)</FormLabel>
                                  <Input
                                      placeholder="E-pošta ili telefon (Nije obavezno)" {...field}
                                  />
                                </FormItem>
                            )}/>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (
                                <FormItem>
                                  <FormLabel className="text-sm text-white font-semibold">Predmet *</FormLabel>
                                  <FormControl>
                                    <Input
                                        placeholder="Unesite naslov poruke" {...field}
                                    />
                                  </FormControl>
                                  <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            control={form.control}
                            name="details"
                            render={({field}) => (
                                <FormItem>
                                  <FormLabel className="text-sm text-white font-semibold">Detalji *</FormLabel>
                                  <FormControl>
                                    <Textarea
                                        placeholder="Opišite problem ili prijedlog" {...field}
                                    />
                                  </FormControl>
                                  <FormMessage/>
                                </FormItem>
                            )}/>
                        <div className="w-full flex justify-end gap-5">
                          <DialogClose asChild>
                            <Button className="bg-red-600 hover:bg-red-500 text-white font-semibold">Zatvori</Button>
                          </DialogClose>
                          <Button type="submit" className="bg-indigo-500 hover:bg-indigo-400 text-white font-semibold">Pošalji</Button>
                        </div>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </footer>
        <div className="py-4 text-center bg-indigo-400">
          <p className="text-white">
            Napravljeno sa ❤️ od strane open source zajednice Zenice
          </p>
        </div>
      </>
  );
};

export default Footer;