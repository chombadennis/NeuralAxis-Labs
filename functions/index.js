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
    // 1. Notification to Admin (Critical: Must succeed)
    const adminResult = await resend.emails.send({
      from: "NeuralAxis Leads <hello@neuralaxislabs.online>",
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

    console.log("Admin notification sent successfully:", adminResult);

    // 2. Auto-confirmation to the Client (Optional: wrapped in try-catch)
    let clientResult = null;
    try {
      clientResult = await resend.emails.send({
        from: "NeuralAxis Labs <hello@neuralaxislabs.online>",
        to: [email],
        subject: "We received your message - NeuralAxis Labs",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
            <h2 style="color: #00C9FF;">Thank you for reaching out, ${name}!</h2>
            <p>We've successfully received your message sent via the contact form on our website.</p>
            <p>Our team is currently reviewing your inquiry and we will get back to you as soon as possible.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
            <p style="font-size: 12px; color: #777;">
              This is an automated confirmation of your request submitted on <a href="https://neuralaxislabs.online" style="color: #00C9FF;">neuralaxislabs.online</a>. We do not add your email to marketing lists or share your information.
            </p>
          </div>
        `,
      });
      console.log("Client auto-confirmation sent successfully:", clientResult);
    } catch (clientError) {
      // Log the error, but do not throw it, so the function still succeeds and admin gets their lead.
      console.error("Failed to send auto-confirmation email to client:", clientError);
    }

    return res.status(200).send({ success: true, message: "Lead submitted successfully", adminResult, clientResult });
  } catch (error) {
    console.error("Critical error in email function:", error);
    return res.status(500).send({ error: "Failed to process contact submission", details: error.message });
  }
});
