import type { Category } from '$lib/types/category';
import { query } from '$lib/data/db';

// Fetch all categories
export async function getAllCategories(): Promise<Category[]> {
  return await query<Category>('SELECT id, name, parent_id FROM categories ORDER BY name');
}

// Fetch a single category
export async function getCategoryById(id: number): Promise<Category | null> {
  const result = await query<Category>('SELECT * FROM categories WHERE id = $1', [id]);
  return result[0] ?? null;
}

// Fetch subcategories
export async function getSubcategories(parentId: number): Promise<Category[]> {
  return await query<Category>('SELECT * FROM categories WHERE parent_id = $1 ORDER BY name', [parentId]);
}