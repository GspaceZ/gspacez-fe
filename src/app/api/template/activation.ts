import { fullName } from '@/helpers/user/full-name'

interface ActivationMailProps {
  firstName: string
  lastName: string
  activationLink: string
}

export const activationTemplate = ({
  firstName,
  lastName,
  activationLink
}: ActivationMailProps) => {
  return `
    <div style="width: 600px; border: 1px solid #ccc; border-radius: 8px; padding: 16px; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
    <img src="https://res.cloudinary.com/dszkt92jr/image/upload/v1718752710/pgkips7b67y7plb0xn6w.png" style="width: 300px"/>
    <hr>
    <p><b>Dear ${fullName(firstName, lastName)},</b></p>
    <p>Thank you for choosing GspaceZ! We hope you're enjoying your experience with our platform.</p>
    <p>This is your activation link for your account: <a href="${activationLink}">Activation Link</a></p>
    <p>Please keep in mind that GspaceZ is currently in its beta testing phase. We apologize for any inconvenience you may encounter during this time. We are committed to continuously improving your experience and making GspaceZ the best it can be.</p>
    <p>Here are some things to keep in mind:</p>
    <ul>
      <li><b>Features may still be under development: </b>Some features may not be fully functional or may be missing certain functionalities.</li>
      <li><b>Bugs and glitches may occur: </b>We are actively working to identify and fix any bugs or glitches that may arise.</li>
      <li><b>Feedback is appreciated: </b>Please share your feedback with us so we can continue to improve GspaceZ.</li>
    </ul>
    <p>We appreciate your patience and understanding as we work to make GspaceZ the best social media platform for you.</p>
    <p>Thank you for being a part of the GspaceZ community!</p>
    <br>
    <p>Sincerely, </p>
    <p>The GspaceZ Team</p>
    <hr>
    <small style="color: #666">2024 GspaceZ</small>
  </div>`
}
