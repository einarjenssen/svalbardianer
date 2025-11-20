export interface Comment {
	id: number;
	comment: string;
    listing_id: number;
	user_id: string;
	created: Date;
    updated: Date;
}