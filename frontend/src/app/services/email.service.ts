import BaseService from "./base.service";

export interface EmailPayload {
  subject: string;
  text: string;
  senderName: string;
  senderContact: string;
}

class EmailService extends BaseService<EmailPayload> {
  constructor() {
    super("/sendEmail");
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    await this.post(payload);
  }
}

const emailServiceInstance = new EmailService();

export default emailServiceInstance;
