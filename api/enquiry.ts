import type { VercelRequest, VercelResponse } from '@vercel/node';

const recipients = ['info@mpohloholdings.co.za', 'ntethelelom@mpohloholdings.co.za'];
const escapeHtml = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] as string);

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Email delivery is not configured yet.' });

  let body: any;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'Invalid form submission.' }); }
  const { fullName, email, phone, message } = body ?? {};
  if (![fullName, email, phone, message].every((v) => typeof v === 'string' && v.trim())) {
    return res.status(400).json({ error: 'Please complete all fields.' });
  }
  if (fullName.length > 120 || email.length > 254 || phone.length > 50 || message.length > 5000) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const safeName = escapeHtml(fullName.trim());
  const safeEmail = escapeHtml(email.trim());
  const safePhone = escapeHtml(phone.trim());
  const safeMessage = escapeHtml(message.trim()).replace(/\r?\n/g, '<br>');
  const from = process.env.RESEND_FROM_EMAIL || 'Mpohlo Holdings Website <onboarding@resend.dev>';
  const html = `
    <div style="margin:0;background:#f4f5f3;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;color:#172b25">
      <div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e4e8e4">
        <div style="background:#123b32;padding:28px 32px;text-align:center">
          <img src="https://mpohloholdings.org.za/mpohlo-holdings-logo.png" alt="Mpohlo Holdings" style="display:block;max-width:190px;max-height:72px;width:auto;height:auto;margin:0 auto 16px">
          <div style="color:#e2bd67;font-size:11px;letter-spacing:2px;text-transform:uppercase">Website enquiry</div>
          <h1 style="margin:10px 0 0;color:#fff;font-size:25px;line-height:1.3">A new message has arrived</h1>
        </div>
        <div style="padding:30px 32px">
          <p style="margin:0 0 22px;color:#52625b;line-height:1.6">A visitor has submitted the contact form on the Mpohlo Holdings website. Their details are below.</p>
          <table role="presentation" style="width:100%;border-collapse:collapse">
            <tr><td style="padding:13px 0;border-bottom:1px solid #edf0ed;color:#66736d;width:125px;font-size:13px">Full name</td><td style="padding:13px 0;border-bottom:1px solid #edf0ed;font-weight:600;color:#123b32">${safeName}</td></tr>
            <tr><td style="padding:13px 0;border-bottom:1px solid #edf0ed;color:#66736d;font-size:13px">Email address</td><td style="padding:13px 0;border-bottom:1px solid #edf0ed"><a style="color:#123b32" href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding:13px 0;border-bottom:1px solid #edf0ed;color:#66736d;font-size:13px">Phone number</td><td style="padding:13px 0;border-bottom:1px solid #edf0ed"><a style="color:#123b32" href="tel:${safePhone}">${safePhone}</a></td></tr>
          </table>
          <h2 style="margin:26px 0 10px;font-size:15px;color:#123b32">Message</h2>
          <div style="padding:18px;background:#f7f8f6;border-left:3px solid #c8a454;border-radius:4px;line-height:1.7;color:#33443c;overflow-wrap:anywhere">${safeMessage}</div>
          <p style="margin:26px 0 0;color:#66736d;font-size:12px;line-height:1.6">You can reply directly to this email to respond to the enquirer.</p>
        </div>
        <div style="background:#123b32;padding:17px 24px;text-align:center;color:#dce5df;font-size:12px">Mpohlo Holdings · Debt Counselling &amp; Financial Rehabilitation</div>
      </div>
    </div>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from, to: recipients, reply_to: email.trim(),
        subject: `New website enquiry from ${fullName.trim()}`, html,
        text: `New website enquiry for Mpohlo Holdings\n\nName: ${fullName.trim()}\nEmail: ${email.trim()}\nPhone: ${phone.trim()}\n\nMessage:\n${message.trim()}`,
      }),
    });
    if (!response.ok) {
      const details = await response.text();
      console.error('Resend email delivery failed:', response.status, details.slice(0, 500));
      return res.status(502).json({ error: 'We could not send your message right now. Please try again or contact us by phone.' });
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Enquiry email request failed:', error);
    return res.status(502).json({ error: 'We could not send your message right now. Please try again.' });
  }
}
