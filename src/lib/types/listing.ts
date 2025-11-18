export interface Listing {
  id: number;
  title: string;
  description: string | null;
  type: string;
  price: number;
  seller_id: number;
  category_id: number;
  location: string | null;
  created: Date;
  updated: Date;
  status: string;
  tags: string | null;
}

export interface CompoundListing extends Listing
{
	images: string[] | null;
	categoryName: string;
    mainCategoryName: string;
}


/*

		id: '2',
		title: 'Kids Bicycle - Free to Good Home',
		description:
			"My daughter outgrew this bike. It's in great condition and ready for a new rider!",
		type: 'fixed',
		price: 0,
		images: ['/kids-bicycle-pink.jpg', '/kids-bicycle-side.jpg'],
		seller: {
			id: 'user2',
			name: 'Mike Chen',
			avatar: '/man-avatar.png'
		},
		category: 'Kids & Baby',
		category_id: 2,
		location: 'Northside',
		createdAt: new Date('2025-10-12'),
		status: 'available',
		comments: []

*/