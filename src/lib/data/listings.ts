import type { Listing, CompoundListing } from '$lib/types/listing';
import { SVB_VERCEL_BLOB_BASE } from '$env/static/private';
import { query } from '$lib/data/db';


export async function getNewestListings(): Promise<Listing[]> {
  return await query<Listing>('SELECT * FROM listings ORDER BY updated LIMIT 100');
}

export async function getNewestListingsWithImages(): Promise<CompoundListing[]> {
    const sql = `
        WITH RECURSIVE

        recent_listings AS (
            SELECT *
            FROM listings
            ORDER BY updated DESC
            LIMIT 100
        ),

        category_tree AS (
            SELECT c.id, c.name, c.parent_id
            FROM categories c
            WHERE c.id IN (SELECT category_id FROM recent_listings)

            UNION ALL

            SELECT c2.id, c2.name, c2.parent_id
            FROM categories c2
            INNER JOIN category_tree ct ON c2.id = ct.parent_id
        )

        SELECT
            rl.*,

            -- Selected category name
            c.name AS "categoryName",

            -- Root (top-level) category
            (
                SELECT name
                FROM category_tree ct
                WHERE ct.parent_id IS NULL
                AND ct.id = rl.category_id
                LIMIT 1
            ) AS "mainCategoryName",

            -- IMAGE ARRAY (same behavior as your original function)
            (
                SELECT COALESCE(
                    json_agg($1 || li.id || '.' || li.ext),
                    '[]'
                )
                FROM listing_image li
                WHERE li.listing_id = rl.id
            ) AS images

        FROM recent_listings rl
        LEFT JOIN categories c ON rl.category_id = c.id

        ORDER BY rl.updated DESC;
    `;

    return await query<CompoundListing>(sql, [SVB_VERCEL_BLOB_BASE]);
}





export async function getCompoundListingWithId(id: number): Promise<CompoundListing | null> {
    const sql = `
        WITH RECURSIVE cat_hierarchy AS (
            -- Start with the listing’s category
            SELECT c.id, c.name, c.parent_id
            FROM categories c
            WHERE c.id = (SELECT category_id FROM listings WHERE id = $2)

            UNION ALL

            -- Walk upward through parents
            SELECT c2.id, c2.name, c2.parent_id
            FROM categories c2
            INNER JOIN cat_hierarchy ch ON c2.id = ch.parent_id
        )
        SELECT 
            l.*,

            -- Selected category (exact match)
            c.name AS "categoryName",

            -- Top-level category (where parent_id IS NULL)
            (SELECT name FROM cat_hierarchy WHERE parent_id IS NULL LIMIT 1)
            AS "mainCategoryName",

            -- Image aggregation
            COALESCE(
                json_agg($1 || li.id || '.' || li.ext)
                FILTER (WHERE li.id IS NOT NULL),
                '[]'
            ) AS images

        FROM listings l
        LEFT JOIN listing_image li 
            ON l.id = li.listing_id
        LEFT JOIN categories c
            ON l.category_id = c.id

        WHERE l.id = $2
        GROUP BY l.id, c.name
        LIMIT 1;
    `;

    const rows = await query<CompoundListing>(sql, [SVB_VERCEL_BLOB_BASE, id]);
    return rows[0] ?? null;
}
