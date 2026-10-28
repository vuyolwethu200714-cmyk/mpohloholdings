export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Email delivery is not configured yet. Please contact us by phone or WhatsApp.' });

  let body: Record<string, unknown>;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return res.status(400).json({ error: 'Invalid form submission.' }); }
  if (!body || typeof body !== 'object') return res.status(400).json({ error: 'Invalid form submission.' });

  const clean = (v: unknown) => typeof v === 'string' ? v.trim() : typeof v === 'boolean' ? (v ? 'Yes' : 'No') : '';
  const formType = clean(body.formType) || 'Website enquiry';
  const fields = Object.entries(body).filter(([key]) => key !== 'formType' && key !== 'website').map(([key, value]) => [key, clean(value)] as const).filter(([, value]) => value);
  const values = Object.fromEntries(fields);
  const fullName = clean(body.fullName);
  const email = clean(body.email);
  const phone = clean(body.phone);
  if (!fullName || !phone) return res.status(400).json({ error: 'Please provide your name and phone number.' });
  if (fullName.length > 120 || email.length > 254 || phone.length > 50 || fields.some(([, v]) => v.length > 5000)) {
    return res.status(400).json({ error: 'One or more fields are too long.' });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const escapeHtml = (v: unknown) => String(v ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
  const label = (key: string) => key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
  const rows = fields.map(([key, value]) => '<tr><td style="padding:13px 0;border-bottom:1px solid #edf0ed;color:#66736d;width:160px;font-size:13px;vertical-align:top">' + escapeHtml(label(key)) + '</td><td style="padding:13px 0;border-bottom:1px solid #edf0ed;color:#123b32;overflow-wrap:anywhere">' + escapeHtml(value).replace(/\r?\n/g, '<br>') + '</td></tr>').join('');
  const from = process.env.RESEND_FROM_EMAIL || 'Mpohlo Holdings Website <onboarding@resend.dev>';
  const html = '<div style="margin:0;background:#f4f5f3;padding:32px 12px;font-family:Arial,Helvetica,sans-serif;color:#172b25"><div style="max-width:640px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e4e8e4"><div style="background:#123b32;padding:28px 32px;text-align:center"><img src="https://mpohloholdings.org.za/mpohlo-holdings-logo.png" alt="Mpohlo Holdings" style="display:block;max-width:190px;max-height:72px;width:auto;height:auto;margin:0 auto 16px"><div style="color:#e2bd67;font-size:11px;letter-spacing:2px;text-transform:uppercase">' + escapeHtml(formType) + '</div><h1 style="margin:10px 0 0;color:#fff;font-size:25px;line-height:1.3">A new message has arrived</h1></div><div style="padding:30px 32px"><p style="margin:0 0 22px;color:#52625b;line-height:1.6">A visitor has submitted a form on the Mpohlo Holdings website. Their details are below.</p><table role="presentation" style="width:100%;border-collapse:collapse">' + rows + '</table><p style="margin:26px 0 0;color:#66736d;font-size:12px;line-height:1.6">Please handle this enquiry confidentially. You can reply directly to this email if the visitor supplied an email address.</p></div><div style="background:#123b32;padding:17px 24px;text-align:center;color:#dce5df;font-size:12px">Mpohlo Holdings · Debt Counselling &amp; Financial Rehabilitation</div></div></div>';
  const plain = 'New ' + formType + ' for Mpohlo Holdings\n\n' + fields.map(([key, value]) => label(key) + ': ' + value).join('\n');
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: ['info@mpohloholdings.co.za', 'ntethelelom@mpohloholdings.co.za'], ...(email ? { reply_to: email } : {}), subject: 'New ' + formType + ' from ' + fullName, html, text: plain }),
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
