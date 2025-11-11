import type { OnlineStore } from '$lib/types/onlinestore';
import { query } from '$lib/data/db';

// Fetch all categories
export async function getAllOnlineStores(): Promise<OnlineStore[]> {
  return query<OnlineStore>('SELECT * FROM online_store ORDER BY name ASC');
}