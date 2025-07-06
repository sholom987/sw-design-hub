export const loader = async ({ request }) => {
  const DESIGN_HUDDLE_CLIENT_ID = process.env.DESIGN_HUDDLE_CLIENT_ID;
  const DESIGN_HUDDLE_CLIENT_SECRET = process.env.DESIGN_HUDDLE_CLIENT_SECRET;
  
  console.log('Client ID:', DESIGN_HUDDLE_CLIENT_ID);
  console.log('Client Secret:', DESIGN_HUDDLE_CLIENT_SECRET);

  const username = "shopify-user-123"; // ideally from session/shopify user

  const body = new URLSearchParams({
    client_id: DESIGN_HUDDLE_CLIENT_ID,
    client_secret: DESIGN_HUDDLE_CLIENT_SECRET,
    grant_type: "password",
    username: username
  });

  const response = await fetch("https://soulwise.designhuddle.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: body.toString()
  });

  if (!response.ok) {
    const errorText = await response.text();
    return new Response(JSON.stringify({ error: errorText }), {
      status: response.status,
      headers: { "Content-Type": "application/json" }
    });
  }

  const result = await response.json();

  return new Response(JSON.stringify({ access_token: result.access_token }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};