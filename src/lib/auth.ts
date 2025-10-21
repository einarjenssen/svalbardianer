import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import { Pool } from "pg";
import { POSTGRES_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
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
  plugins: [sveltekitCookies(getRequestEvent)], // make sure this is the last plugin in the array
});