import { mockCurrentUser, mockListings } from '$lib/mockData';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;

	const listing = mockListings.find((listing) => listing.id === id);

	if (!listing) {
		error(404, 'Listing not found');
	}

	const currentUser = mockCurrentUser;

	const isSeller = listing?.seller.id === currentUser.id;

	return {
		listing,
		isSeller
	};
};
