import { createAuthClient } from "better-auth/svelte";
import { passkeyClient } from "better-auth/client/plugins";
import { InferAuth } from "better-auth/client";

type AppAuth = typeof import("$lib/auth").auth;

const baseAuthClient = createAuthClient({
	...InferAuth<AppAuth>(),
	plugins: [passkeyClient()]
});

type ServerSession = AppAuth["$Infer"]["Session"];
type BaseSessionAtom = ReturnType<typeof baseAuthClient.useSession>;
type BaseSessionValue = BaseSessionAtom extends { get(): infer Value } ? Value : never;
type SessionValueWithServerFields = BaseSessionValue extends { data: any }
	? Omit<BaseSessionValue, "data"> & { data: ServerSession | null }
	: BaseSessionValue;
type SessionAtomWithServerFields = BaseSessionAtom & {
	get(): SessionValueWithServerFields;
};

export const authClient = baseAuthClient as typeof baseAuthClient & {
	useSession: () => SessionAtomWithServerFields;
};

authClient.useSession = () => baseAuthClient.useSession() as SessionAtomWithServerFields;
