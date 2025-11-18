<script lang="ts">
	import { Badge } from './components/ui/badge';
	import Card from './components/ui/card/card.svelte';
	import { CheckCircle2, MapPin } from '@lucide/svelte';
	import type { CompoundListing } from '$lib/types/listing';
	import CardContent from './components/ui/card/card-content.svelte';
	import CardFooter from './components/ui/card/card-footer.svelte';
	import { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
	type Props = {
		listing: CompoundListing;
	};

	let { listing }: Props = $props();

	const nokFormatter = new Intl.NumberFormat('nb-NO', {
		style: 'currency',
		currency: 'NOK',
	});


	function getTypeLabel() {
		if (listing.price === 0) {
			return { label: 'FREE', variant: 'default' as const };
		}
		return { label: nokFormatter.format(listing.price), variant: 'secondary' as const };
	}

	const typeInfo = getTypeLabel();
</script>

<a href={`/listings/${listing.id}`}>
	<Card class="group overflow-hidden transition-all hover:shadow-lg">
		<div class="relative aspect-[4/3] overflow-hidden bg-muted">
			<img
				src={listing.images?.[0] ?? '/placeholder.svg'}
				alt={listing.title}
				class="h-full w-full object-cover transition-transform group-hover:scale-105"
			/>

			<div class="absolute top-3 right-3 flex flex-col gap-2">
				<Badge variant={typeInfo.variant} class="font-semibold">
					{typeInfo.label}
				</Badge>
				{#if listing.status === 'sold'}
					<Badge variant="outline" class="bg-background/90 backdrop-blur-sm">
						<CheckCircle2 class="mr-1 h-3 w-3" />
						SOLD
					</Badge>
				{/if}
			</div>
			<!--
			{#if listing.images?.length ?? 0 > 1}
				<div class="absolute right-3 bottom-3">
					<Badge variant="secondary" class="bg-background/90 text-xs backdrop-blur-sm">
						{listing.images?.length} photos
					</Badge>
				</div>
			{/if}
			-->
		</div>
		<CardContent class="p-4">
			<h3 class="mb-2 line-clamp-1 text-lg font-semibold text-card-foreground">
				{listing.title}
			</h3>
			<p class="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
				{listing.description}
			</p>
			<div class="flex items-center gap-2 text-xs text-muted-foreground">
				<MapPin class="h-3 w-3" />
				<span>{listing.location}</span>
				<span class="mx-1">•</span>
				<span>{listing.mainCategoryName}</span>
			</div>
		</CardContent>
		<CardFooter class="border-t border-border bg-muted/30 p-3">
			<div class="flex items-center gap-2">
				<Avatar class="h-6 w-6">
					<!-- <AvatarImage src={listing.seller.avatar || '/placeholder.svg'} /> -->
					 <AvatarImage src="/placeholder.svg" />
					<!-- <AvatarFallback>{listing.seller.name[0]}</AvatarFallback> -->
					 <AvatarFallback>Kjell T. Ring</AvatarFallback>
				</Avatar>
				<span class="text-xs text-muted-foreground">{listing.seller_id}</span>
			</div></CardFooter
		>
	</Card>
</a>
