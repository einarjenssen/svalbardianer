export type ListingType = 'fixed';
export type ListingStatus = 'available' | 'sold';

export interface Listing {
	id: string;
	title: string;
	description: string;
	type: ListingType;
	price: number;
	images?: string[];
	seller: {
		id: string;
		name: string;
		avatar: string;
	};
	category: string;
	category_id: number;
	location: string;
	createdAt: Date;
	status: ListingStatus;
	comments: Comment[];
}

export interface Comment {
	id: string;
	text: string;
	author: {
		id: string;
		name: string;
		avatar: string;
	};
	timestamp: Date;
}

export interface User {
	id: string;
	name: string;
	avatar: string;
	email: string;
	phone: string;
	location: string;
	joinedDate: Date;
	bio: string;
}
