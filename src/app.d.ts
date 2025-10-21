// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		    interface Locals {
				session: ReturnType<typeof import("$lib/auth").auth.api.getSession>["session"] | null;
				user: ReturnType<typeof import("$lib/auth").auth.api.getSession>["user"] | null;
    		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
