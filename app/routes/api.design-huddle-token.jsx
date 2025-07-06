// app/routes/api.design-huddle-token.jsx
import { json } from "@remix-run/node";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const username = url.searchParams.get("user_id_or_name");

  if (!username) {
    return json({ error: "Missing user_id_or_name parameter" }, { status: 400 });
  }

  const DESIGN_HUDDLE_CLIENT_ID = process.env.DESIGN_HUDDLE_CLIENT_ID;
  const DESIGN_HUDDLE_CLIENT_SECRET = process.env.DESIGN_HUDDLE_CLIENT_SECRET;

  const body = new URLSearchParams({
    client_id: DESIGN_HUDDLE_CLIENT_ID,
    client_secret: DESIGN_HUDDLE_CLIENT_SECRET,
    grant_type: "password",
    username
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
    return json({ error: errorText }, { status: response.status });
  }

  const result = await response.json();

  return json({ access_token: result.access_token });
};
