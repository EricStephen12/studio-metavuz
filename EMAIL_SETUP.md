# Email Setup for Studio Metavuz

## 📧 Nodemailer Configuration

The website now uses Nodemailer to send emails from the contact and booking forms. Follow these steps to set up email functionality:

### 1. Create Environment File

Create a `.env.local` file in the root directory with your email credentials:

```env
# Email Configuration for Nodemailer
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 2. Gmail Setup (Recommended)

If using Gmail, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password in `EMAIL_PASS` (not your regular Gmail password)

### 3. Alternative Email Providers

You can also use other email providers by modifying the transporter configuration in:
- `src/app/api/contact/route.ts`
- `src/app/api/booking/route.ts`

Example for other providers:
```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### 4. Test the Setup

1. Start the development server: `npm run dev`
2. Go to the Contact page and fill out the form
3. Check your email for the contact form submission
4. Go to the Booking page and submit a booking request
5. Check your email for the booking request

### 5. Email Templates

The emails include:
- **Contact Form**: Client details, subject, and message
- **Booking Form**: Client details, service type, date/time, and additional message

Both emails are sent to: `deamirclothingstores@gmail.com`

### 6. Troubleshooting

- Make sure `.env.local` is in the root directory
- Verify your email credentials are correct
- Check that 2FA is enabled for Gmail
- Ensure you're using an App Password, not your regular password
- Check the console for any error messages

## 🎵 Ready to Go!

Once configured, your Studio Metavuz website will automatically send emails for all contact and booking form submissions!
