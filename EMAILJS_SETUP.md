# EmailJS Setup Instructions

This project uses EmailJS to send form submissions from the Join Us page to `logicsync4518@gmail.com`.

## Setup Steps

1. **Create an EmailJS Account**

   - Go to https://www.emailjs.com/
   - Sign up for a free account (allows 200 emails/month)

2. **Add Email Service**

   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the setup instructions
   - Copy the **Service ID**

3. **Create Email Template**

   - Go to "Email Templates" in the dashboard
   - Click "Create New Template"
   - Use this template structure (IMPORTANT: variable names must match exactly):

   ```
   To Email: logicsync4518@gmail.com

   Subject: {{subject}}

   Email Content:

   New Join Us Form Submission

   Name: {{user_name}}
   Email: {{user_email}}
   Phone: {{user_phone}}
   Message: {{user_message}}

   Full Details:
   {{message}}
   ```

   **Important:** Make sure you use these EXACT variable names in your template:

   - `{{user_name}}` - Full name
   - `{{user_email}}` - User's email
   - `{{user_phone}}` - Phone number
   - `{{user_message}}` - Message/reason
   - `{{subject}}` - Email subject
   - `{{message}}` - Formatted full message

   - Set the "To Email" field to: `logicsync4518@gmail.com`
   - Save the template and copy the **Template ID**

4. **Get Public Key**

   - Go to "Account" → "General" in the dashboard
   - Copy your **Public Key**

5. **Configure Environment Variables**

   - Copy `.env.example` to `.env` in the root directory
   - Fill in the values:

   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

6. **Restart Development Server**
   - Stop your dev server (Ctrl+C)
   - Run `npm run dev` again to load the new environment variables

## Testing

Once configured, test the form:

1. Fill out the Join Us form
2. Submit it
3. Check `logicsync4518@gmail.com` for the email

## Troubleshooting

### Common Issues:

1. **400 Error:**

   - Check that all environment variables are set correctly in `.env` file
   - Verify the Service ID, Template ID, and Public Key are correct
   - Make sure you restarted your dev server after adding environment variables
   - Verify the template variable names match exactly (e.g., `{{user_name}}`, not `{{from_name}}`)

2. **Template Variables Not Working:**

   - Variable names are case-sensitive
   - Use double curly braces: `{{variable_name}}`
   - Make sure variable names in your template match the code exactly

3. **Environment Variables Not Loading:**

   - Make sure your `.env` file is in the root directory (same level as `package.json`)
   - Variables must start with `VITE_` prefix
   - Restart your dev server after changing `.env` file
   - In production, set these variables in your hosting platform (Netlify, Vercel, etc.)

4. **Email Not Received:**
   - Check spam folder
   - Verify the "To Email" is set correctly in the template
   - Check EmailJS dashboard for sent emails log
   - Verify your email service is connected and verified in EmailJS

### Debug Steps:

1. Check browser console for detailed error messages
2. Verify environment variables are loaded: `console.log(import.meta.env.VITE_EMAILJS_SERVICE_ID)`
3. Check EmailJS dashboard → Email Logs to see if emails were attempted
4. Make sure your email service is verified in EmailJS dashboard
