// app/routes/api/design-huddle-token.jsx
import { json } from "@remix-run/node";

/**
 * This loader acts like an API route.
 * You can replace the return value with an actual token from Design Huddle.
 */
export const loader = async () => {
  // TODO: Replace this with actual logic to fetch/generate a token
  return json({
    token: "dummy-token-123",
    message: "Design Huddle token route working!",
  });
};