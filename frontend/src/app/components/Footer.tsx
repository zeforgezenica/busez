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
      setError("Please fill out all required fields.");
      return;
    }

    try {
      await emailService.sendEmail({
        subject: formData.subject,
        text: `
          Name: ${formData.name}
          Contact Info: ${formData.contactInfo || "N/A"}
          Details: ${formData.details}
        `,
        senderName: formData.name,
        senderContact: formData.contactInfo,
      });

      setSuccess("Your message has been sent successfully.");
      setError("");
      setFormData({ name: "", contactInfo: "", subject: "", details: "" });
    } catch (error) {
      setError("An error occurred while sending the message.");
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
              <p className="text-gray-300">App for searching bus routes</p>
            </div>
            <div className="mt-4 sm:mt-0 text-left">
              <p className="text-left sm:text-center">
                <strong>Contact Us:</strong>
              </p>
              <p className="text-gray-300 text-left">
                Email:{" "}
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
                Phone:{" "}
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
                Report Problem / Suggest Feature
              </Button>
            </div>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <div className="text-center">
            <p className="text-gray-300">
              Made with ❤️ by the open source community of Zenica
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Report Problem / Suggest Feature
            </ModalHeader>
            <ModalBody>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <Input
                autoFocus
                label="Name *"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                variant="bordered"
                required
              />
              <Input
                label="Contact Info (Optional)"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder="Email or Phone (Optional)"
                variant="bordered"
              />
              <Input
                label="Subject *"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter the subject"
                variant="bordered"
                required
              />
              <Textarea
                label="Details *"
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Describe the issue or suggestion"
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer;
