import type { Handle } from "@sveltejs/kit";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { auth } from "$lib/auth";

export const handle: Handle = async ({ event, resolve }) => {
  // Let Better Auth intercept its routes first
  const response = await svelteKitHandler({ event, resolve, auth, building });
  if (response) return response;

  // Attach session for your own routes
  const session = await auth.api.getSession({ headers: event.request.headers });
  event.locals.session = session?.session ?? null;
  event.locals.user = session?.user ?? null;

  // Continue to normal routing
  return resolve(event);
};
