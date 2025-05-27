// index.js
import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

// Set API key from environment variable (never hardcode keys)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const msg = {
    to, // Array of recipient emails
    from: 'niftalemrex@gmail.com', // Your verified sender email in SendGrid
    subject,
    text,
  };

  try {
    await sgMail.sendMultiple(msg); // send to multiple recipients
    res.status(200).send({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
