import { NextRequest, NextResponse } from 'next/server';
const nodemailer = require('nodemailer');

export async function POST(request: NextRequest) {
  try {
    const { 
      customerEmail, 
      vincode, 
      reportType, 
      vehicleInfo, 
      reportLinks, 
      paymentIntent,
      amountPaid 
    } = await request.json();

    // Validate required fields
    if (!customerEmail || !vincode || !reportType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const vehicleDetails = vehicleInfo 
      ? `${vehicleInfo.brand} ${vehicleInfo.model} ${vehicleInfo.year}`
      : 'Vehicle';

    const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Vehicle History Report - VIN AUDIT</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
        .container { max-width: 600px; margin: 0 auto; background-color: white; }
        .header { background-color: #003366; color: white; padding: 30px 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
        .content { padding: 30px 20px; }
        .report-card { border: 2px solid #e9ecef; border-radius: 12px; padding: 20px; margin: 20px 0; background-color: #f8f9fa; }
        .report-card.carfax { border-color: #003366; }
        .report-card.autocheck { border-color: #0099FF; }
        .download-btn { display: inline-block; background-color: #0099FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; }
        .download-btn.carfax { background-color: #003366; }
        .order-details { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        .important-note { background-color: #e3f2fd; border-left: 4px solid #2196f3; padding: 15px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <div class="logo">🚗 VIN AUDIT</div>
          <h1>Your Vehicle History Report is Ready!</h1>
          <p>Thank you for choosing VIN AUDIT for your vehicle history needs</p>
        </div>

        <!-- Content -->
        <div class="content">
          <h2>Hello!</h2>
          <p>Your vehicle history report has been successfully processed and is ready for viewing. Below you'll find your report links and order details.</p>

          <!-- Order Details -->
          <div class="order-details">
            <h3>📋 Order Details</h3>
            <p><strong>Vehicle:</strong> ${vehicleDetails}</p>
            <p><strong>VIN:</strong> ${vincode}</p>
            <p><strong>Report Type:</strong> ${reportType.toUpperCase()}</p>
            <p><strong>Amount Paid:</strong> $${(amountPaid / 100).toFixed(2)}</p>
            <p><strong>Payment ID:</strong> ${paymentIntent}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>

          <!-- Report Links -->
          <h3>📄 Your Vehicle History Reports</h3>
          
          ${reportLinks?.carfax ? `
          <div class="report-card carfax">
            <h4>🔍 Carfax Report</h4>
            <p>Comprehensive vehicle history from Carfax, including accident history, service records, and ownership details.</p>
            <a href="${reportLinks.carfax}" class="download-btn carfax" target="_blank">View Carfax Report</a>
          </div>
          ` : ''}

          ${reportLinks?.autocheck ? `
          <div class="report-card autocheck">
            <h4>🔍 AutoCheck Report</h4>
            <p>Detailed vehicle history from AutoCheck with accident history, title information, and market value insights.</p>
            <a href="${reportLinks.autocheck}" class="download-btn" target="_blank">View AutoCheck Report</a>
          </div>
          ` : ''}

          <!-- Important Information -->
          <div class="important-note">
            <h4>📌 Important Information</h4>
            <ul>
              <li>Your report links will remain active for <strong>60 days</strong> from the purchase date</li>
              <li>Bookmark these links for future access to your reports</li>
              <li>Reports are best viewed on desktop computers or tablets</li>
              <li>If you have any issues accessing your reports, please contact our support team</li>
            </ul>
          </div>

          <!-- Support -->
          <h3>🛟 Need Help?</h3>
          <p>If you have any questions or need assistance, our support team is here to help:</p>
          <p>
            📧 Email: <a href="mailto:support@vinaudit.co">support@vinaudit.co</a><br>
            💬 WhatsApp: <a href="https://wa.me/40750255771">+40 750 255 771</a><br>
            🌐 Website: <a href="https://vinaudit.co/contact">vinaudit.co/contact</a>
          </p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p><strong>VIN AUDIT</strong> - Your trusted source for vehicle history reports</p>
          <p>This email was sent to ${customerEmail} regarding your vehicle report purchase.</p>
          <p style="font-size: 12px; color: #999;">
            Disclaimer: VIN AUDIT is an independent reseller of official vehicle history reports. 
            Carfax and AutoCheck are trademarks of their respective owners.
          </p>
        </div>
      </div>
    </body>
    </html>
    `;

    // GoDaddy SMTP Email Integration
    // Make sure you have set up your environment variables:
    // GODADDY_EMAIL_USER=reports@vinaudit.co
    // GODADDY_EMAIL_PASS=your_email_password
    
    // Create transporter with GoDaddy SMTP settings
    const transporter = nodemailer.createTransporter({
      host: 'smtp.secureserver.net', // GoDaddy SMTP server
      port: 587, // or 465 for SSL
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GODADDY_EMAIL_USER, // your GoDaddy email: reports@vinaudit.co
        pass: process.env.GODADDY_EMAIL_PASS, // your GoDaddy email password
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Send email
    const mailOptions = {
      from: {
        name: 'VIN AUDIT',
        address: process.env.GODADDY_EMAIL_USER // reports@vinaudit.co
      },
      to: customerEmail,
      subject: `Your Vehicle History Report - ${vehicleDetails} (VIN: ${vincode})`,
      html: emailHtml,
      // Optional: add text version
      text: `Your VIN AUDIT vehicle history report for ${vehicleDetails} (VIN: ${vincode}) is ready. Please view this email in HTML format to access your report links.`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    // Store report delivery in database
    // You should save this information to track email deliveries
    /*
    await db.query(`
      INSERT INTO report_deliveries (
        customer_email, 
        vincode, 
        report_type, 
        payment_intent, 
        delivered_at,
        email_status
      ) VALUES (?, ?, ?, ?, NOW(), 'sent')
    `, [customerEmail, vincode, reportType, paymentIntent]);
    */

    return NextResponse.json({
      success: true,
      message: 'Report email sent successfully',
      emailSent: true
    });

  } catch (error) {
    console.error('Error sending report email:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send report email',
        emailSent: false
      },
      { status: 500 }
    );
  }
}