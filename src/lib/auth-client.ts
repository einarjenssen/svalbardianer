import { createAuthClient } from "better-auth/svelte";
import { InferAuth } from "better-auth/client";
import { passkeyClient } from "better-auth/client/plugins";

type AppAuth = typeof import("$lib/auth").auth;

export const authClient = createAuthClient({
  ...InferAuth<AppAuth>(),
  plugins: [
    passkeyClient()
  ]
});
