<script lang="ts">
	import { Avatar, AvatarFallback, AvatarImage } from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import Card from '$lib/components/ui/card/card.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Textarea } from '$lib/components/ui/textarea';
	import {
		ArrowLeft,
		CheckCircle2,
		ChevronLeft,
		ChevronRight,
		DollarSign,
		Gift,
		MapPin,
		Calendar,
		Tag,
		Pencil
	} from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let currentImageIndex = $state(0);
	let commentText = $state('');

	function handlePostComment() {
		console.log('Posting comment:', commentText);
		//TODO: Should be form action?
	}
	function handleMarkAsSold() {
		console.log('Marking data.listing as sold');
		//TODO: Should be form action?
	}

	function prevImage() {
		currentImageIndex =
			(currentImageIndex - 1 + (data.listing.images?.length || 0)) %
			(data.listing.images?.length || 1);
	}
	function nextImage() {
		currentImageIndex = (currentImageIndex + 1) % (data.listing.images?.length || 1);
	}
</script>

<div class="min-h-screen bg-background">
	<main class="container mx-auto px-4 py-8">
		<Button variant="ghost" size="sm" onclick={() => window.history.back()} class="mb-6">
			<ArrowLeft class="mr-2 h-4 w-4" />
			Back to listings
		</Button>

		<div class="grid gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<div class="mb-6 overflow-hidden rounded-lg">
					<div class="relative aspect-[4/3] bg-muted">
						<img
							src={data.listing.images?.[currentImageIndex] || '/placeholder.svg'}
							alt={`${data.listing.title} - Image ${currentImageIndex + 1}`}
							class="h-full w-full object-cover"
						/>

						{#if data.listing.images?.length ?? 0 > 1}
							<Button
								variant="secondary"
								size="icon"
								class="absolute top-1/2 left-3 -translate-y-1/2 bg-background/90 backdrop-blur-sm hover:bg-background"
								onclick={prevImage}
							>
								<ChevronLeft class="h-5 w-5" />
							</Button>
							<Button
								variant="secondary"
								size="icon"
								class="absolute top-1/2 right-3 -translate-y-1/2 bg-background/90 backdrop-blur-sm hover:bg-background"
								onclick={nextImage}
							>
								<ChevronRight class="h-5 w-5" />
							</Button>

							<div class="absolute right-3 bottom-3">
								<Badge variant="secondary" class="bg-background/90 backdrop-blur-sm">
									{currentImageIndex + 1} / {data.listing.images?.length || 1}
								</Badge>
							</div>
						{/if}
					</div>

					{#if data.listing.images?.length ?? 0 > 1}
						<div class="mt-3 flex gap-2 overflow-x-auto">
							{#each data.listing.images as image, index (index)}
								<button
									onclick={() => (currentImageIndex = index)}
									class={`relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
										index === currentImageIndex
											? 'border-primary'
											: 'border-transparent opacity-60 hover:opacity-100'
									}`}
								>
									<img
										src={image || '/placeholder.svg'}
										alt={`Thumbnail ${index + 1}`}
										class="h-full w-full object-cover"
									/>
								</button>
							{/each}
						</div>
					{/if}
				</div>

				<div class="mb-6">
					<div class="mb-4 flex items-start justify-between gap-4">
						<h1 class="text-3xl font-bold text-balance text-foreground">{data.listing.title}</h1>
						<div class="flex flex-col gap-2">
							{#if data.listing.price === 0}
								<Badge variant="default" class="flex items-center gap-1">
									<Gift class="h-3 w-3" />
									FREE
								</Badge>
							{:else}
								<Badge variant="secondary" class="flex items-center gap-1 text-lg">
									<DollarSign class="h-4 w-4" />
									{data.listing.price}
								</Badge>
							{/if}
							{#if data.listing.status === 'sold'}
								<Badge variant="outline" class="flex items-center gap-1 bg-muted">
									<CheckCircle2 class="h-3 w-3" />
									SOLD
								</Badge>
							{/if}
						</div>
					</div>

					<div class="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
						<div class="flex items-center gap-1">
							<MapPin class="h-4 w-4" />
							<span>{data.listing.location}</span>
						</div>
						<div class="flex items-center gap-1">
							<Tag class="h-4 w-4" />
							<span>{data.listing.category}</span>
						</div>
						<div class="flex items-center gap-1">
							<Calendar class="h-4 w-4" />
							<span>Posted {data.listing.createdAt.toLocaleDateString()}</span>
						</div>
					</div>

					<Separator class="my-6" />

					<div>
						<h2 class="mb-3 text-xl font-semibold text-foreground">Description</h2>
						<p class="leading-relaxed text-muted-foreground">{data.listing.description}</p>
					</div>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Comments</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="space-y-6">
							{#if data.listing.comments.length === 0}
								<p class="py-4 text-center text-sm text-muted-foreground">
									No comments yet. Be the first to ask a question!
								</p>
							{:else}
								<div class="space-y-4">
									{#each data.listing.comments as comment (comment.id)}
										<div class="flex gap-3">
											<a href={`/user/${comment.author.id}`}>
												<Avatar
													class="h-8 w-8 shrink-0 cursor-pointer transition-opacity hover:opacity-80"
												>
													<AvatarImage src={comment.author.avatar || '/placeholder.svg'} />
													<AvatarFallback>{comment.author.name[0]}</AvatarFallback>
												</Avatar>
											</a>
											<div class="flex-1">
												<div class="flex items-baseline gap-2">
													<a href={`/user/${comment.author.id}`}>
														<p
															class="cursor-pointer text-sm font-medium text-foreground hover:underline"
														>
															{comment.author.name}
														</p>
													</a>
													<p class="text-xs text-muted-foreground">
														{comment.timestamp.toLocaleDateString()} at{' '}
														{comment.timestamp.toLocaleTimeString([], {
															hour: '2-digit',
															minute: '2-digit'
														})}
													</p>
												</div>
												<p class="mt-1 text-sm leading-relaxed text-muted-foreground">
													{comment.text}
												</p>
											</div>
										</div>
									{/each}
								</div>
							{/if}

							<Separator />

							<div class="space-y-3">
								<Textarea
									placeholder="Ask a question or leave a comment..."
									bind:value={commentText}
									rows={3}
									disabled={data.listing.status === 'sold'}
								/>
								<Button onclick={handlePostComment} disabled={data.listing.status === 'sold'}>
									Post Comment
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<div class="lg:col-span-1">
				<Card class="sticky top-20">
					<CardHeader>
						<CardTitle>Seller Information</CardTitle>
					</CardHeader>
					<CardContent class="space-y-6">
						<a
							href={`/user/${data.listing.seller.id}`}
							class="flex items-center gap-3 transition-opacity hover:opacity-80"
						>
							<Avatar class="h-12 w-12">
								<AvatarImage src={data.listing.seller.avatar || '/placeholder.svg'} />
								<AvatarFallback>{data.listing.seller.name[0]}</AvatarFallback>
							</Avatar>
							<div>
								<p class="font-medium text-foreground hover:underline">
									{data.listing.seller.name}
								</p>
								<p class="text-sm text-muted-foreground">{data.listing.location}</p>
							</div>
						</a>

						{#if data.isSeller}
							<div class="space-y-3">
								<p class="text-sm text-muted-foreground">You are the seller of this item</p>
								{#if data.listing.status === 'available'}
									<div class="flex gap-2">
										<Button
											onclick={handleMarkAsSold}
											variant="outline"
											class="flex-1 bg-transparent"
										>
											Mark as Sold
										</Button>
										<Button variant="outline" size="sm" href={`/listings/${data.listing.id}/edit`}>
											<Pencil class="h-4 w-4" />
										</Button>
									</div>
								{:else}
									<div class="rounded-lg bg-muted p-3 text-center">
										<p class="text-sm font-medium text-muted-foreground">This item is sold</p>
									</div>
								{/if}
							</div>
						{:else}
							<div class="space-y-3">
								{#if data.listing.status === 'sold'}
									<div class="rounded-lg bg-muted p-4 text-center">
										<p class="text-sm font-medium text-muted-foreground">This item has been sold</p>
									</div>
								{:else}
									<div class="rounded-lg border border-primary/20 bg-primary/5 p-4">
										<p class="mb-1 text-sm font-medium text-foreground">
											{data.listing.price === 0 ? 'Free Item' : `Price: $${data.listing.price}`}
										</p>
										<p class="text-xs text-muted-foreground">
											Use the comments section to contact the seller
										</p>
									</div>
								{/if}
							</div>
						{/if}
					</CardContent>
				</Card>
			</div>
		</div>
	</main>
</div>
