import { betterAuth } from "better-auth";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { passkey } from "better-auth/plugins/passkey";
import { captcha } from "better-auth/plugins";
import { getRequestEvent } from "$app/server";
import { Pool } from "pg";
import { env } from '$env/dynamic/private';

const { POSTGRES_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PASSKEY_DOMAIN, 
  PASSKEY_APPNAME, PASSKEY_ORIGIN, GOOGLE_CAPTCHA_SECRET, RESEND_API_KEY } = env;

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
      user: {
        additionalFields: {
          role: {
            type: "string",
            required: false,
            defaultValue: "user",
            input: false, // don't allow user to set role
          },
          approved: {
            type: "boolean",
            required: true,
            defaultValue: "false",
          },
          approved_by: {
            type: "string",
            required: false,
            defaultValue: "null",
          },
        },
      },
      emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
      },
      emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ( { user, url, token }, request) => {
          await resend.emails.send({
            from: 'noreply@svalbardianer.no',
            to: user.email,
            subject: "Verify your email address",
            text: `Click the link to verify your email: ${url}`,
          });
        },
      },
      socialProviders: { 
          github: { 
            clientId: GITHUB_CLIENT_ID, 
            clientSecret: GITHUB_CLIENT_SECRET, 
          },
      },
      plugins: [
        captcha({ 
            provider: "google-recaptcha", // or google-recaptcha, hcaptcha, captchafox
            secretKey: GOOGLE_CAPTCHA_SECRET!,  
        }),
        passkey({
          rpID: PASSKEY_DOMAIN,
          rpName: PASSKEY_APPNAME,
          origin: PASSKEY_ORIGIN
        }),
        sveltekitCookies(getRequestEvent)
      ], // make sure this is the last plugin in the array
});

