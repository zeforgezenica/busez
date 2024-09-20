class ResendController {
  async sendEmail(req, res) {
    res.status(200).json({ success: "Email sent successfully." });
  }
}

module.exports = new ResendController();
