import { mockCurrentUser, mockListings } from '$lib/mockData';

export async function load() {
	//Get listings from db
	const listings = mockListings;
	//get categories from db
	const categories = Array.from(new Set(mockListings.map((l) => l.category))).sort();

	return { listings, categories };
}
