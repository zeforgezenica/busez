"use client";
import { useTranslation } from 'react-i18next'; // Import useTranslation
import '../i18n'; // Import i18n configuration
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
  const { t } = useTranslation();
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
      setError(t('errorRequiredFields')); // Ensure this key exists in your translation file
      return;
    }

    try {
      await emailService.sendEmail({
        subject: formData.subject,
        text: `
          Name: ${formData.name}
          Contact: ${formData.contactInfo || "N/A"}
          Details: ${formData.details}
        `,
        senderName: formData.name,
        senderContact: formData.contactInfo,
      });

      setSuccess(t('successMessage')); // Use t() for translations
      setError("");
      setFormData({ name: "", contactInfo: "", subject: "", details: "" });
    } catch (error) {
      setError(t('errorMessage')); // Use t() for translations
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
                  href="https://zeforge.ba"
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
                {t('appNameFooter')}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-left">
              <p className="text-left sm:text-center">
                <strong>{t('contactUs')}</strong>
              </p>
              <p className="text-gray-300 text-left">
                {t('emailLabel')}:{" "}
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
                {t('phoneLabel')}:{" "}
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
                {t('reportIssue')}
              </Button>
            </div>
          </div>
          <div className="my-4 border-t border-gray-300" />
          <div className="text-center">
            <p className="text-gray-300">
              {t('madeWithLove')}
            </p>
          </div>
        </div>
      </footer>

      <Modal isOpen={isOpen} onClose={handleClose} placement="top-center">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('modalHeader')}
            </ModalHeader>
            <ModalBody>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <Input
                autoFocus
                label={t('nameLabel')} // Use translation for label
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('placeholderName')} // Add this translation key
                variant="bordered"
                required
              />
              <Input
                label={t('contactInfoLabel')} // Use translation for label
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                placeholder={t('placeholderContactInfo')} // Add this translation key
                variant="bordered"
              />
              <Input
                label={t('subjectLabel')} // Use translation for label
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('placeholderSubject')} // Add this translation key
                variant="bordered"
                required
              />
              <Textarea
                label={t('detailsLabel')} // Use translation for label
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder={t('placeholderDetails')} // Add this translation key
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleClose}>
                {t('closeButton')}
              </Button>
              <Button color="primary" onPress={handleSubmit}>
                {t('sendButton')}
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Footer;
