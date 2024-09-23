"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import emailService from "../services/email.service";

const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactInfo: "",
    subject: "",
    details: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    setError("");
    setSuccess("");
  };
  const handleClose = () => setIsOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const { name, subject, details } = formData;

    if (!name || !subject || !details) {
      setError("Molimo popunite sva obavezna polja (*).");
      return;
    }

    try {
      await emailService.sendEmail({
        subject: formData.subject,
        text: `
          Ime: ${formData.name}
          Kontakt: ${formData.contactInfo || "N/A"}
          Detalji: ${formData.details}
        `,
        senderName: formData.name,
        senderContact: formData.contactInfo,
      });

      setSuccess("Vaša poruka je uspješno poslana.");
      setError("");
      setFormData({ name: "", contactInfo: "", subject: "", details: "" });
    } catch (error) {
      setError("Došlo je do greške prilikom slanja poruke.");
    }
  };

  return (
    <>
      <footer className="bg-content1 border-t border-gray-300 mt-auto py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <div className="text-center sm:text-left">
              <p className="text-gray-300">
                &copy; {new Date().getFullYear()}{" "}
                <a
                  href={"https://zeforge.ba"}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--primary-blue)",
                    textDecoration: "underline",
                  }}
                >
                  ZeForge Zenica
                </a>
              </p>
              <p className="text-gray-300">
                Aplikacija za pretraživanje autobusnih linija
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-left">
              <p className="text-left sm:text-center">
                <strong>Kontaktirajte nas:</strong>
              </p>
              <p className="text-gray-300 text-left">
                E-pošta:{" "}
                <a
                  href={`mailto:${"info@zeforge.ba"}`}
                  style={{
                    color: "var(--primary-blue)",
                    textDecoration: "underline",
                  }}
                >
                  info@zeforge.ba
                </a>
              </p>
              <p className="text-gray-300 text-left">
                Broj telefona:{" "}
                <a
                  href={`tel:${"+38732979844"}`}
                  style={{
                    color: "var(--primary-blue)",
                    textDecoration: "underline",
                  }}
                >
                  +387 32 979 844
                </a>
              </p>

              <Button onPress={handleOpen} color="primary" className="mt-4">
                Prijavite problem / Predložite funkciju
              </Button>
            </div>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <div className="text-center">
            <p className="text-gray-300">
              Napravljeno sa ❤️ od strane open source zajednice Zenice
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Prijavite problem / Predložite funkciju
            </ModalHeader>
            <ModalBody>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <Input
                autoFocus
                label="Ime *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Unesite Vaše ime"
                variant="bordered"
                required
              />
              <Input
                label="Kontakt Informacije (Nije obavezno)"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="E-pošta ili Telefon (Nije obavezno)"
                variant="bordered"
              />
              <Input
                label="Predmet *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Unesite naslov poruke"
                variant="bordered"
                required
              />
              <Textarea
                label="Detalji *"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Opišite problem ili prijedlog"
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleClose}>
                Zatvori
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Pošalji
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer;
