# GoDaddy Email Setup Guide for VIN AUDIT

## Step 1: Set up GoDaddy Email Account

### Option A: GoDaddy Professional Email (Recommended for SMTP)
1. Go to your GoDaddy dashboard
2. Purchase "Professional Email" for your domain (vinaudit.co)
3. Create email account: `reports@vinaudit.co`
4. Set a strong password
5. Enable SMTP access in email settings

### Option B: GoDaddy Email Marketing (For higher volumes)
1. Go to GoDaddy Email Marketing
2. Sign up for transactional email service
3. Get API credentials
4. Verify your domain

## Step 2: Install Required Dependencies

Run this command in your VIN AUDIT project:

```bash
npm install nodemailer @types/nodemailer
```

## Step 3: Environment Variables

Add these to your `.env.local` file:

```env
# GoDaddy SMTP Settings (Option A)
GODADDY_EMAIL_USER=reports@vinaudit.co
GODADDY_EMAIL_PASS=your_email_password_here

# Alternative: GoDaddy Email Marketing API (Option B)
GODADDY_EMAIL_API_KEY=your_api_key_here
GODADDY_EMAIL_API_SECRET=your_api_secret_here
```

## Step 4: GoDaddy SMTP Settings

### SMTP Configuration:
- **Server**: `smtp.secureserver.net`
- **Port**: `587` (STARTTLS) or `465` (SSL)
- **Security**: STARTTLS or SSL/TLS
- **Authentication**: Yes (username/password)

### Common Issues & Solutions:

#### 1. Authentication Failed
- Make sure you're using the full email address as username
- Check if SMTP is enabled in GoDaddy email settings
- Try using an app-specific password if available

#### 2. Connection Timeout
- Try port 465 with SSL instead of 587
- Check firewall settings
- Verify domain DNS settings

#### 3. Emails Going to Spam
- Set up SPF record: `v=spf1 include:secureserver.net ~all`
- Set up DKIM (available in GoDaddy email settings)
- Set up DMARC policy

## Step 5: DNS Records Setup

Add these DNS records in your GoDaddy domain management:

### SPF Record (TXT):
```
Name: @
Value: v=spf1 include:secureserver.net ~all
```

### DKIM Record (TXT):
```
Name: k1._domainkey
Value: [Get this from GoDaddy email settings]
```

### DMARC Record (TXT):
```
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:reports@vinaudit.co
```

## Step 6: Test Email Sending

Create a test script to verify everything works:

```javascript
// test-email.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  host: 'smtp.secureserver.net',
  port: 587,
  secure: false,
  auth: {
    user: 'reports@vinaudit.co',
    pass: 'your_password'
  }
});

transporter.sendMail({
  from: 'VIN AUDIT <reports@vinaudit.co>',
  to: 'your-test-email@gmail.com',
  subject: 'VIN AUDIT Email Test',
  html: '<h1>Test email successful!</h1>'
}).then(info => {
  console.log('Email sent:', info.messageId);
}).catch(error => {
  console.error('Email failed:', error);
});
```

## Step 7: Production Checklist

- [ ] Professional email account created
- [ ] SMTP credentials added to environment variables
- [ ] DNS records configured (SPF, DKIM, DMARC)
- [ ] Test emails sent successfully
- [ ] Email templates tested on multiple devices
- [ ] Spam folder testing completed
- [ ] Error handling tested

## Alternative: GoDaddy Email Marketing API

If you prefer API-based sending (better for high volume):

```javascript
// Using GoDaddy Email Marketing API
const fetch = require('node-fetch');

const sendEmailViaAPI = async (emailData) => {
  const response = await fetch('https://api.godaddy-email.com/v1/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GODADDY_EMAIL_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'reports@vinaudit.co',
      to: emailData.customerEmail,
      subject: emailData.subject,
      html: emailData.html
    })
  });
  
  return await response.json();
};
```

## Security Best Practices

1. **Use App Passwords**: If available, create app-specific passwords
2. **Environment Variables**: Never commit email credentials to code
3. **Rate Limiting**: Implement rate limiting for email sending
4. **Monitoring**: Log email delivery status for debugging
5. **Backup Method**: Have a secondary email service as backup

## Cost Considerations

- **Professional Email**: ~$5-10/month per mailbox
- **Email Marketing**: Pay per email sent (usually $0.01-0.05 per email)
- **Domain verification**: Usually free with domain purchase

## Support Contacts

- GoDaddy Email Support: 480-624-2505
- Email configuration help available 24/7
- Live chat support for setup issues

Choose Option A (SMTP) for simplicity, or Option B (API) for better scalability and delivery tracking.