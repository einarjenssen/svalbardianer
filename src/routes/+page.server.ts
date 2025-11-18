import { getAllCategories } from '$lib/data/categories';
import { getNewestListingsWithImages } from '$lib/data/listings';

export async function load() {
	//Get listings from db
	const listings = await getNewestListingsWithImages();
	const categories = await getAllCategories();

	return { listings, categories };
}
