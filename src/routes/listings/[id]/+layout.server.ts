import { mockCurrentUser } from '$lib/mockData';
import { getCompoundListingWithId } from '$lib/data/listings';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const { id } = params;

	const listing = await getCompoundListingWithId(Number.parseInt(id)); //mockListings.find((listing) => listing.id === id);

	if (!listing) {
		error(404, 'Listing not found');
	}

	const currentUser = mockCurrentUser;

	const isSeller = listing?.seller_id.toString() === currentUser.id;

	return {
		listing,
		isSeller
	};
};
