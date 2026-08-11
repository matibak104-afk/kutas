const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/1536862222960173116/XmsopGN5NUWuIGCm3c-o_V3Jt6g8_7ZXQpTlLtSYvtne72url4zS7HBEnWWTYvldq_I7';

export const onRequestPost = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    const body = await request.json().catch(() => ({}));
    const { code, codeHash } = body;

    if (!code || !codeHash) {
      return new Response(JSON.stringify({ error: 'missing_data' }), { status: 400, headers });
    }

    // IP klienta
    const clientIP = request.headers.get('CF-Connecting-IP')
      || request.headers.get('X-Forwarded-For')
      || 'unknown';

    const userAgent = request.headers.get('User-Agent') || 'unknown';

    // Wyślij na Discord webhook
    const now = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
    const discordPayload = {
      embeds: [{
        title: '🔑 Nowy kod licencji',
        color: 0x9c27b0,
        fields: [
          { name: '📋 Kod do podania', value: `\`\`\`${code}\`\`\``, inline: false },
          { name: '🌐 IP klienta', value: `\`${clientIP}\``, inline: true },
          { name: '🕐 Czas', value: now, inline: true },
          { name: '📱 Device', value: `\`${userAgent.substring(0, 100)}\``, inline: false }
        ],
        footer: { text: 'M0bywatel License System' },
        timestamp: new Date().toISOString()
      }]
    };

    const webhookRes = await fetch(DISCORD_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordPayload)
    });

    if (!webhookRes.ok) {
      return new Response(JSON.stringify({ error: 'webhook_failed' }), { status: 502, headers });
    }

    return new Response(JSON.stringify({ ok: true, ip: clientIP }), { status: 200, headers });

  } catch (e) {
    return new Response(JSON.stringify({ error: 'server_error', detail: e.message }), { status: 500, headers });
  }
};
