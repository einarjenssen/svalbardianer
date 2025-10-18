import { mockCurrentUser } from '$lib/mockData';

export function load() {
	//get current user from db
	const currentUser = mockCurrentUser;
	return { currentUser };
}
