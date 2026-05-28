const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT) || 465,
  secure: true, // SSL on port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send a notification email to the admin when a form is submitted.
 * Fires and forgets — never blocks the API response.
 */
async function sendFormNotification(formType, data) {
  const to = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  if (!to) return;

  const labels = {
    visitor:      '🧑‍💼 New Visitor Registration',
    stall:        '🏪 New Stall Booking Inquiry',
    contact:      '✉️  New Contact Message',
  };

  const subject = labels[formType] || '📬 New Form Submission — EngiTech Expo';

  // Build a clean HTML table of all submitted fields
  const rows = Object.entries(data)
    .filter(([k]) => !['_id', '__v', 'status', 'submittedAt', 'createdAt', 'updatedAt'].includes(k))
    .map(([k, v]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap;text-transform:capitalize;border-bottom:1px solid #f0f0f0;">
          ${k.replace(/([A-Z])/g, ' $1').trim()}
        </td>
        <td style="padding:8px 12px;color:#222;border-bottom:1px solid #f0f0f0;">${v || '—'}</td>
      </tr>`)
    .join('');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#e8301b;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:20px;">${subject}</h2>
        <p style="color:#ffd5d0;margin:4px 0 0;font-size:13px;">EngiTech Expo — ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>
      </div>
      <div style="background:#fff;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;overflow:hidden;">
        <table style="width:100%;border-collapse:collapse;">
          ${rows}
        </table>
      </div>
      <p style="color:#999;font-size:11px;margin-top:12px;text-align:center;">
        This is an automated notification from EngiTech Expo website.
      </p>
    </div>`;

  try {
    await transporter.sendMail({
      from: `"EngiTech Expo" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`[MAIL] Notification sent → ${to} (${formType})`);
  } catch (err) {
    console.error('[MAIL] Failed to send notification:', err.message);
  }
}

module.exports = { sendFormNotification };
