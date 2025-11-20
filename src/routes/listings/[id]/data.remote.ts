import * as v from 'valibot';
import type { Comment } from '$lib/types/comment';
import { query2 } from '$lib/data/db';
import { query } from '$app/server';


export const getCommentsByListing = query(v.number(), async (listingId) => {
	return await query2<Comment>(
            'SELECT * FROM Listing_comments WHERE listing_id = $1',
            [listingId]
    );
});