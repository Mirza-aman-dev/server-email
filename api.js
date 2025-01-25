const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Default route to show "hello world" when the server is accessed
app.get('/', (req, res) => {
  res.send('Hello World');
});

// POST endpoint for sending emails
app.post('/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: "mzawyd@gmail.com",
        pass: "ouij awjl nujj lvft",
      },
    });

    // Mail options
    const mailOptions = {
      from: {
        name: 'This is the sender',
        address: process.env.EMAIL,
      },
      to: 'reactnative43@gmail.com', // Default email if none provided
      subject: subject || 'Sending Email using Node.js',
      text: text || 'That was easy!',
      html: html || '<h1>Welcome</h1><p>That was easy!</p>',
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', response: info.response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error sending email', details: error });
  }
});

// Catch-all route for unsupported methods
app.use((req, res) => {
  res.status(405).json({ error: 'Method Not Allowed' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
