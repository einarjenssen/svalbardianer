<script lang="ts">
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogTitle,
		AlertDialogTrigger
	} from '$lib/components/ui/alert-dialog';
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		Calendar,
		CheckCircle,
		Edit2,
		Eye,
		Mail,
		MapPin,
		Package,
		Pencil,
		Phone,
		Trash2
	} from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let formData = $state({
		avatar: data.user.avatar,
		name: data.user.name,
		email: data.user.email,
		phone: data.user.phone,
		location: data.user.location,
		bio: data.user.bio,
		joinedDate: data.user.joinedDate
	});

	function handleDelete(listingId: string, listingTitle: string) {
		console.log(`Delete listing with ID: ${listingId} and Title: ${listingTitle}`);
	}
</script>

<div class="min-h-screen bg-background">
	<main class="container mx-auto px-4 py-8">
		<div class="mx-auto max-w-6xl space-y-6">
			<Card>
				<CardHeader>
					<div class="flex items-start justify-between">
						<div class="flex items-center gap-4">
							<Avatar class="h-20 w-20">
								<AvatarImage src={formData.avatar || '/placeholder.svg'} alt={formData.name} />
								<AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<CardTitle class="text-2xl">{formData.name}</CardTitle>
								<CardDescription class="mt-1 flex items-center gap-1">
									<Calendar class="h-4 w-4" />
									Member since {formData.joinedDate.toLocaleDateString('en-US', {
										month: 'long',
										year: 'numeric'
									})}
								</CardDescription>
							</div>
						</div>
						{#if data.isCurrentUser}
							<Button href={`/user/${data.user.id}/edit`} variant="outline" size="sm">
								<Edit2 class="mr-2 h-4 w-4" />
								Edit Profile
							</Button>
						{/if}
					</div>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="flex items-center gap-2 text-muted-foreground">
							<Mail class="h-4 w-4" />
							<span>{formData.email}</span>
						</div>
						<div class="flex items-center gap-2 text-muted-foreground">
							<Phone class="h-4 w-4" />
							<span>{formData.phone}</span>
						</div>
						<div class="flex items-center gap-2 text-muted-foreground">
							<MapPin class="h-4 w-4" />
							<span>{formData.location}</span>
						</div>
						{#if formData.bio}
							<div class="rounded-lg bg-muted p-4">
								<p class="text-sm text-foreground">{formData.bio}</p>
							</div>
						{/if}
						<div class="flex items-center gap-6 pt-2 text-sm">
							<div class="flex items-center gap-2">
								<Package class="h-4 w-4 text-muted-foreground" />
								<span class="font-medium">{data.userListings.length}</span>
								<span class="text-muted-foreground">Total</span>
							</div>
							<div class="flex items-center gap-2">
								<CheckCircle class="h-4 w-4 text-green-600" />
								<span class="font-medium">{data.userListings.length}</span>
								<span class="text-muted-foreground">Active</span>
							</div>
							<div class="flex items-center gap-2">
								<CheckCircle class="h-4 w-4 text-muted-foreground" />
								<span class="font-medium">{data.userListings.length}</span>
								<span class="text-muted-foreground">Sold</span>
							</div>
						</div>
					</div>
					<!-- {/if} -->
				</CardContent>
			</Card>

			<div>
				<div class="mb-4 flex items-center justify-between">
					<h2 class="text-2xl font-bold text-foreground">
						{data.isCurrentUser ? 'My Listings' : `${data.user.name}'s Listings`}
					</h2>
					{#if data.isCurrentUser}
						<Button href="/listings/create" size="sm">Post New Item</Button>
					{/if}
				</div>

				{#if data.userListings.length === 0}
					<div
						class="flex min-h-[300px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center"
					>
						<p class="mb-2 text-lg font-medium text-foreground">No listings yet</p>
						<p class="mb-4 text-sm text-muted-foreground">Start by posting your first item</p>
						<Button href="/create">Post an Item</Button>
					</div>
				{:else}
					<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{#each data.userListings as listing (listing.id)}
							<Card class="overflow-hidden">
								<div class="relative aspect-[4/3] overflow-hidden bg-muted">
									<img
										src={listing.images?.[0] || '/placeholder.svg'}
										alt={listing.title}
										class="h-full w-full object-cover"
									/>
									{#if listing.price === 0}
										<Badge class="absolute top-3 right-3">FREE</Badge>
									{:else}
										<Badge variant="secondary" class="absolute top-3 right-3">
											${listing.price}
										</Badge>
									{/if}
									{#if listing.status === 'sold'}
										<Badge variant="destructive" class="absolute top-3 left-3">SOLD</Badge>
									{/if}
									{#if (listing.images?.length ?? 0) > 1}
										<Badge variant="outline" class="absolute right-3 bottom-3 bg-background/80">
											{listing.images?.length} photos
										</Badge>
									{/if}
								</div>
								<CardContent class="p-4">
									<h3 class="mb-2 line-clamp-1 text-lg font-semibold text-card-foreground">
										{listing.title}
									</h3>
									<p class="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
										{listing.description}
									</p>
									<div class="text-xs text-muted-foreground">
										Posted {listing.createdAt.toLocaleDateString()}
									</div>
								</CardContent>
								<CardFooter class="flex gap-2 border-t border-border bg-muted/30 p-3">
									<Button
										variant="outline"
										href={`/listings/${listing.id}`}
										size="sm"
										class="flex-1 bg-transparent"
									>
										<Eye class="mr-2 h-4 w-4" />
										View
									</Button>
									{#if data.isCurrentUser}
										<Button variant="outline" size="sm" href={`/listings/${listing.id}/edit`}>
											<Pencil class="h-4 w-4" />
										</Button>

										<AlertDialog>
											<AlertDialogTrigger
												class={buttonVariants({ variant: 'outline', size: 'sm' })}
											>
												<Trash2 class="h-4 w-4" />
											</AlertDialogTrigger>
											<AlertDialogContent>
												<AlertDialogHeader>
													<AlertDialogTitle>Delete listing?</AlertDialogTitle>
													<AlertDialogDescription>
														Are you sure you want to delete "{listing.title}"? This action cannot be
														undone.
													</AlertDialogDescription>
												</AlertDialogHeader>
												<AlertDialogFooter>
													<AlertDialogCancel>Cancel</AlertDialogCancel>
													<AlertDialogAction
														onclick={() => handleDelete(listing.id, listing.title)}
													>
														Delete
													</AlertDialogAction>
												</AlertDialogFooter>
											</AlertDialogContent>
										</AlertDialog>
									{/if}
								</CardFooter>
							</Card>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</main>
</div>
