import { mockCurrentUser, mockListings, mockUsers } from '$lib/mockData';
import { error, redirect } from '@sveltejs/kit';
import { auth } from "$lib/auth";

export async function load({ request }) {
	//const { id } = request;

	//const user = mockUsers.find((user) => user.id === id);

	//if (!user) {
	//	error(404, 'User not found');
	//}

	//const userListings = mockListings.filter((listing) => listing.seller.id === id);
	//const isCurrentUser = mockCurrentUser.id === id;

	const session = await auth.api.getSession({headers: request.headers});

	if (!session) {
		throw redirect(302, '/login');
	}

	return {
		//user,
		//userListings,
		//isCurrentUser,
		session
	};
}
