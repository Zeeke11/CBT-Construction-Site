/**
 * CBT Construction - Serverless Lead Dispatcher
 * Forwards website estimate submissions instantly to Justin Fry's mobile device via Pushover.
 * 
 * Works seamlessly with Vercel Serverless Functions or as a Formspree Webhook endpoint.
 * Environment Variables Required (set in Vercel or your hosting environment):
 * - PUSHOVER_USER_KEY: Justin Fry's Pushover User Key
 * - PUSHOVER_API_TOKEN: Pushover Application API Token
 * - CONTRACTOR_PHONE: 2172543091
 */

export default async function handler(req, res) {
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
    const data = req.body;
    const name = data.full_name || data.name || 'Valued Homeowner';
    const phone = data.phone_number || data.phone || 'No phone provided';
    const email = data.email_address || data.email || 'None';
    const address = data.property_address || data.address || 'Central Illinois';
    const service = data.service_category || data.service || 'General Contractor Inquiry';
    const timeline = data.timeline || 'Flexible';
    const details = data.project_details || data.details || 'None provided';

    const pushoverUser = process.env.PUSHOVER_USER_KEY;
    const pushoverToken = process.env.PUSHOVER_API_TOKEN;

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
Click number above to call client immediately!`;

    // If Pushover keys are set, dispatch to Pushover API
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

      const pushoverResult = await pushoverResponse.json();
      return res.status(200).json({ success: true, pushover: pushoverResult });
    }

    // Default response when running in demo/mock mode
    return res.status(200).json({
      success: true,
      message: 'Lead received and queued for Justin Fry. Set PUSHOVER_USER_KEY and PUSHOVER_API_TOKEN in Vercel to activate live push alerts.',
      dispatchedData: { name, phone, service, address, timeline }
    });

  } catch (error) {
    console.error('Pushover webhook error:', error);
    return res.status(500).json({ error: 'Failed to process lead notification' });
  }
}
