import type { ListingImage } from '$lib/types/listingImage';
import { query } from '$lib/data/db';

// Fetch all categories
export async function getListingImage(listing_id: Number): Promise<ListingImage[]> {
  return await query<ListingImage>('SELECT * FROM listing_image WHERE listing_id=$1', [listing_id]);
}