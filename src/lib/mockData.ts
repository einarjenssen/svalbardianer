import type { Listing, User } from './types';
export const mockUsers: User[] = [
	{
		id: 'user1',
		name: 'Sarah Johnson',
		avatar: '/diverse-woman-avatar.png',
		email: 'sarah.j@email.com',
		phone: '(555) 123-4567',
		location: 'Downtown',
		joinedDate: new Date('2024-03-15'),
		bio: 'Love finding treasures and helping neighbors! Always happy to chat about items.'
	},
	{
		id: 'user2',
		name: 'Mike Chen',
		avatar: '/man-avatar.png',
		email: 'mike.c@email.com',
		phone: '(555) 234-5678',
		location: 'Northside',
		joinedDate: new Date('2024-05-20'),
		bio: 'Father of two, always looking for good deals on kids items.'
	},
	{
		id: 'user3',
		name: 'Linda Brown',
		avatar: '/woman-avatar-3.png',
		email: 'linda.b@email.com',
		phone: '(555) 345-6789',
		location: 'Westside',
		joinedDate: new Date('2024-01-10'),
		bio: 'Gardening enthusiast and DIY lover.'
	},
	{
		id: 'user4',
		name: 'Alex Thompson',
		avatar: '/diverse-person-avatars.png',
		email: 'alex.t@email.com',
		phone: '(555) 456-7890',
		location: 'Southside',
		joinedDate: new Date('2024-08-05'),
		bio: 'Moving soon, selling lots of stuff!'
	},
	{
		id: 'user5',
		name: 'Margaret White',
		avatar: '/elderly-woman-avatar.png',
		email: 'margaret.w@email.com',
		phone: '(555) 567-8901',
		location: 'Downtown',
		joinedDate: new Date('2023-11-12'),
		bio: 'Retired quilter, love making things by hand.'
	}
];

export const mockListings: Listing[] = [
	{
		id: '1',
		title: 'Vintage Wooden Chair',
		description:
			'Beautiful handcrafted wooden chair from the 1960s. Some wear but still sturdy and comfortable.',
		type: 'fixed',
		price: 45,
		images: ['/vintage-wooden-chair.jpg', '/vintage-chair-side.jpg', '/vintage-chair-detail.jpg'],
		seller: {
			id: 'user1',
			name: 'Sarah Johnson',
			avatar: '/diverse-woman-avatar.png'
		},
		category: 'Furniture',
		location: 'Downtown',
		createdAt: new Date('2025-10-10'),
		status: 'available',
		comments: [
			{
				id: 'c1',
				text: "Is this still available? I'm interested!",
				author: {
					id: 'user2',
					name: 'Mike Chen',
					avatar: '/man-avatar.png'
				},
				timestamp: new Date('2025-10-14T10:30:00')
			}
		]
	},
	{
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
		location: 'Northside',
		createdAt: new Date('2025-10-12'),
		status: 'available',
		comments: []
	},
	{
		id: '3',
		title: 'Garden Tools Set',
		description: 'Complete set of garden tools including shovel, rake, hoe, and pruning shears.',
		type: 'fixed',
		price: 30,
		images: ['/garden-tools-set.png'],
		seller: {
			id: 'user3',
			name: 'Linda Brown',
			avatar: '/woman-avatar-3.png'
		},
		category: 'Garden & Outdoor',
		location: 'Westside',
		createdAt: new Date('2025-10-11'),
		status: 'available',
		comments: [
			{
				id: 'c2',
				text: 'Would you take $25?',
				author: {
					id: 'user6',
					name: 'John Davis',
					avatar: '/man-avatar-2.png'
				},
				timestamp: new Date('2025-10-13T14:20:00')
			},
			{
				id: 'c3',
				text: 'Sorry, price is firm. Thanks for asking!',
				author: {
					id: 'user3',
					name: 'Linda Brown',
					avatar: '/woman-avatar-3.png'
				},
				timestamp: new Date('2025-10-13T15:45:00')
			}
		]
	},
	{
		id: '4',
		title: 'Board Games Collection',
		description: 'Moving sale! 10 board games in excellent condition. Take them all!',
		type: 'fixed',
		price: 0,
		images: ['/board-games-collection.jpg', '/board-games-detail.jpg'],
		seller: {
			id: 'user4',
			name: 'Alex Thompson',
			avatar: '/diverse-person-avatars.png'
		},
		category: 'Games & Hobbies',
		location: 'Southside',
		createdAt: new Date('2025-10-14'),
		status: 'sold',
		comments: [
			{
				id: 'c4',
				text: "I'd love to take these! When can I pick them up?",
				author: {
					id: 'user7',
					name: 'Emma Wilson',
					avatar: '/woman-avatar-2.png'
				},
				timestamp: new Date('2025-10-14T16:30:00')
			},
			{
				id: 'c5',
				text: 'Great! How about tomorrow at 3pm?',
				author: {
					id: 'user4',
					name: 'Alex Thompson',
					avatar: '/diverse-person-avatars.png'
				},
				timestamp: new Date('2025-10-14T16:45:00')
			}
		]
	},
	{
		id: '5',
		title: 'Handmade Quilt',
		description: 'Beautiful handmade quilt, queen size. Made with love!',
		type: 'fixed',
		price: 95,
		images: ['/handmade-quilt-colorful.jpg', '/quilt-detail.jpg', '/quilt-pattern.jpg'],
		seller: {
			id: 'user5',
			name: 'Margaret White',
			avatar: '/elderly-woman-avatar.png'
		},
		category: 'Home & Decor',
		location: 'Downtown',
		createdAt: new Date('2025-10-13'),
		status: 'available',
		comments: []
	}
];

export const mockCurrentUser: User = {
	id: 'user1',
	name: 'Sarah Johnson',
	avatar: '/diverse-woman-avatar.png',
	email: 'sarah.j@email.com',
	phone: '(555) 123-4567',
	location: 'Downtown',
	joinedDate: new Date('2024-03-15'),
	bio: 'Love finding treasures and helping neighbors! Always happy to chat about items.'
};
