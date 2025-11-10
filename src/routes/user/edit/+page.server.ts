import { mockCurrentUser } from '$lib/mockData';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const currentUser = mockCurrentUser;
	if (params.id != currentUser.id) {
		error(403, 'Forbidden');
	}
	return {
		currentUser
	};
}
