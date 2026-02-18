import { mockCurrentUser, mockListings } from '$lib/mockData';
import { getAllCategories } from '$lib/data/categories';


export async function load() {
	//Get listings from db
	const listings = mockListings;
	//get categories from db
	const categories = await getAllCategories();
	

	return { listings, categories };
}
