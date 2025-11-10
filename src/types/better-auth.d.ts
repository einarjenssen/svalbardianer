declare module "@better-auth/core/db" {
	interface User {
		role: string;
		approved: boolean;
		approved_by: string | null;
	}
}
