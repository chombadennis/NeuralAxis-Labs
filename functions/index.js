const { onRequest } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { Resend } = require("resend");

admin.initializeApp();

// HTTPS Cloud Function (2nd Gen) to send emails via Resend
exports.sendEmail = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send({ error: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).send({ error: "Missing required fields: name, email, message" });
  }

  // Retrieve Resend API Key from environment variables
  const resendApiKey = process.env.RESEND_KEY;

  if (!resendApiKey) {
    console.error("Resend API key is not configured.");
    return res.status(500).send({ error: "Email service configuration missing on server." });
  }

  const resend = new Resend(resendApiKey);

  try {
    const data = await resend.emails.send({
      from: "NeuralAxis Leads <onboarding@resend.dev>",
      to: ["neuralaxislabs@gmail.com"], // Default recipient
      reply_to: email,
      subject: `New Lead from ${name} via NeuralAxis Contact Form`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; border-radius: 5px;">${message}</p>
      `,
    });

    console.log("Email sent successfully:", data);
    return res.status(200).send({ success: true, message: "Email sent successfully", data });
  } catch (error) {
    console.error("Error sending email via Resend:", error);
    return res.status(500).send({ error: "Failed to send email", details: error.message });
  }
});
