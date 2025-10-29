import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { passkey } from "better-auth/plugins/passkey";
import { getRequestEvent } from "$app/server";
import { Pool } from "pg";
import { POSTGRES_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PASSKEY_DOMAIN, PASSKEY_APPNAME, PASSKEY_ORIGIN } from '$env/static/private';

export const auth = betterAuth({
      trustedOrigins: [
        "http://10.0.0.34:5173",
        "http://localhost:5173"
      ],
      database: new Pool({
        connectionString: POSTGRES_URL,
        ssl: {
            rejectUnauthorized: false, //accept self-signed certs
        }
      }),
      emailAndPassword: {enabled: true},
      socialProviders: { 
          github: { 
          clientId: GITHUB_CLIENT_ID, 
          clientSecret: GITHUB_CLIENT_SECRET, 
          },
      },
      plugins: [
        passkey({
          rpID: PASSKEY_DOMAIN,
          rpName: PASSKEY_APPNAME,
          origin: PASSKEY_ORIGIN
        }),
        sveltekitCookies(getRequestEvent)
      ], // make sure this is the last plugin in the array
});