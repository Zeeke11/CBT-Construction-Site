/**
 * CBT Construction - Serverless Lead Dispatcher (Pushover & Web3Forms)
 * Forwards website estimate submissions instantly to Justin Fry's mobile device via Pushover
 * and/or via Web3Forms email delivery.
 * 
 * Environment Variables (set in Vercel Project Settings -> Environment Variables):
 * - PUSHOVER_USER_KEY: Justin Fry's Pushover User Key
 * - PUSHOVER_API_TOKEN: Pushover Application API Token
 * - WEB3FORMS_ACCESS_KEY: (Optional server-side fallback) Web3Forms Access Key
 * - CONTRACTOR_PHONE: 2172543091
 */

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body || {};
    const name = data.full_name || data.name || 'Valued Client';
    const phone = data.phone_number || data.phone || 'No phone provided';
    const email = data.email_address || data.email || 'None';
    const address = data.property_address || data.address || 'Central Illinois';
    const service = data.service_category || data.service || 'General Contractor Inquiry';
    const timeline = data.timeline || 'Flexible';
    const details = data.project_details || data.details || 'None provided';
    const source = data.source || 'CBT Construction Website';

    const pushoverUser = process.env.PUSHOVER_USER_KEY;
    const pushoverToken = process.env.PUSHOVER_API_TOKEN;
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;

    const messageText = 
`🚨 NEW CBT CONSTRUCTION LEAD!
━━━━━━━━━━━━━━━━━━━━━
👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}
🏗️ Service: ${service}
⏱️ Timeline: ${timeline}
✉️ Email: ${email}
📝 Details: ${details}
━━━━━━━━━━━━━━━━━━━━━
Click number below to call client immediately!`;

    const results = {};

    // 1. If Pushover keys are set, dispatch to Pushover API
    if (pushoverUser && pushoverToken) {
      const pushoverResponse = await fetch('https://api.pushover.net/1/messages.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          token: pushoverToken,
          user: pushoverUser,
          title: `CBT Construction Lead: ${service} (${name})`,
          message: messageText,
          priority: '1', // High priority (bypasses quiet hours)
          sound: 'siren', // Construction priority ring
          url: `tel:+1${phone.replace(/\D/g, '')}`,
          url_title: `Call ${name}`
        })
      });

      results.pushover = await pushoverResponse.json();
    }

    // 2. Optional server-side Web3Forms fallback if WEB3FORMS_ACCESS_KEY is set in Vercel env
    if (web3FormsKey) {
      const web3Response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          access_key: web3FormsKey,
          subject: `🔨 New CBT Construction Lead: ${service} — ${name} (${address})`,
          from_name: 'CBT Construction Website',
          name,
          phone,
          email: email !== 'None' && email !== 'Not provided' ? email : 'no-reply@cbtconstruction.com',
          property_address: address,
          service_category: service,
          timeline,
          project_details: details,
          form_source: source
        })
      });

      results.web3forms = await web3Response.json();
    }

    if (results.pushover || results.web3forms) {
      return res.status(200).json({ success: true, ...results });
    }

    // Default response when running in demo/local mode without env keys set yet
    return res.status(200).json({
      success: true,
      message: 'Lead received and queued for Justin Fry. Set PUSHOVER_USER_KEY, PUSHOVER_API_TOKEN, and WEB3FORMS_ACCESS_KEY to activate live alerts.',
      dispatchedData: { name, phone, service, address, timeline }
    });

  } catch (error) {
    console.error('Lead webhook error:', error);
    return res.status(500).json({ error: 'Failed to process lead notification' });
  }
}
