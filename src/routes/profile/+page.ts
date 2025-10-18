import { mockCurrentUser } from '$lib/mockData.js';
import { redirect } from '@sveltejs/kit';

export async function load() {
	const currentUser = mockCurrentUser;
	throw redirect(307, `/user/${currentUser.id}`);
}
