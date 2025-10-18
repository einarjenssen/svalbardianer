import { mockCurrentUser, mockListings, mockUsers } from '$lib/mockData';
import { error } from '@sveltejs/kit';

export function load({ params }) {
	const { id } = params;

	const user = mockUsers.find((user) => user.id === id);

	if (!user) {
		error(404, 'User not found');
	}

	const userListings = mockListings.filter((listing) => listing.seller.id === id);
	const isCurrentUser = mockCurrentUser.id === id;

	return {
		user,
		userListings,
		isCurrentUser
	};
}
