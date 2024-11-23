import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD
  }
})

interface SendEmailProps {
  to: string
  subject: string
  html: string
}

const sendEmail = async ({ to, subject, html }: SendEmailProps) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to,
    subject,
    html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export default sendEmail
