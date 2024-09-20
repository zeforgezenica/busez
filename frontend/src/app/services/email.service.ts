import BaseService from "./base.service";

export interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  text: string;
}

class EmailService extends BaseService<EmailPayload> {
  constructor() {
    super("/sendEmail");
  }

  async sendEmail(payload: EmailPayload): Promise<void> {
    await this.post(payload, "");
  }
}

const emailServiceInstance = new EmailService();

export default emailServiceInstance;
