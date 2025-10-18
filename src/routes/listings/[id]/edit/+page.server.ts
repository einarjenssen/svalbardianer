import { mockCurrentUser, mockListings } from '$lib/mockData';
import { error } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const parentData = await parent();

	if (!parentData.isSeller) {
		error(403, 'Forbidden');
	}
}
