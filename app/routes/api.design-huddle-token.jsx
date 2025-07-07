import { json } from "@remix-run/node";

const ALLOWED_ORIGIN = "https://w1budy-qz.myshopify.com"; // your Shopify store URL

export const loader = async ({ request }) => {
  if (request.method === "OPTIONS") {
    // Handle preflight request
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  const url = new URL(request.url);
  const username = url.searchParams.get("user_id_or_name");

  if (!username) {
    return json(
      { error: "Missing user_id_or_name parameter" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  }

  const DESIGN_HUDDLE_CLIENT_ID = process.env.DESIGN_HUDDLE_CLIENT_ID;
  const DESIGN_HUDDLE_CLIENT_SECRET = process.env.DESIGN_HUDDLE_CLIENT_SECRET;

  const body = new URLSearchParams({
    client_id: DESIGN_HUDDLE_CLIENT_ID,
    client_secret: DESIGN_HUDDLE_CLIENT_SECRET,
    grant_type: "password",
    username,
  });

  const response = await fetch("https://soulwise.designhuddle.com/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    return json(
      { error: errorText },
      {
        status: response.status,
        headers: {
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  }

  const result = await response.json();

  return json(
    { access_token: result.access_token },
    {
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      },
    }
  );
};
