<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import ListingCard from '$lib/ListingCard.svelte';
	import { Search, X } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import type { Category } from '$lib/types/category'
	import LLUpcomingActivities from '$lib/components/LLUpcomingActivities.svelte';
	import CategoryDropdown from '$lib/components/CategoryDropdown.svelte';

	let { data }: PageProps = $props();

	let searchQuery = $state('');
	let typeFilter = $state<'' | 'all'>('all');
	let categoryFilter = $state<number>(0);
	let selectedCategory = $state<Category | null>(null);

	const filteredListings = $derived(
		data.listings.filter((listing) => {
			const matchesSearch =
				listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				listing.description?.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesType = typeFilter === 'all' || listing.type === typeFilter;
			const matchesCategory = categoryFilter === 0 || listing.category_id === categoryFilter;
			return matchesSearch && matchesType && matchesCategory;
		})
	);

	function clearCat() {
		categoryFilter = 0;
		selectedCategory = null;
	}

</script>

<div class="min-h-screen bg-background">
	<!-- <Header /> -->
	<main class="container mx-auto px-4 py-8">
		<div class="mb-6 flex flex-col gap-4 md:flex-row">
			<div class="relative flex-1">
				<Search class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder="Search items..." bind:value={searchQuery} class="pl-10" />
			</div>
			<!-- TODO: Sortere på auksjon/fastpris når vi har det
			 <Select.Root type="single" bind:value={typeFilter} name="typeFilter">
				<Select.Trigger class="w-full md:w-[180px]"></Select.Trigger>
				<Select.Content>
					<Select.Item value="all">All Types</Select.Item>
					<Select.Item value="free">Free</Select.Item>
					<Select.Item value="fixed">Fixed Price</Select.Item>
					<Select.Item value="auction">Auction</Select.Item>
				</Select.Content>
			</Select.Root> -->
			<!--
			<Select.Root type="single" bind:value={categoryFilter} name="categoryFilter">
				{@const triggerContent = categoryFilter === 'all' ? 'All categories' : categoryFilter}
				<Select.Trigger class="w-full md:w-[180px]">{triggerContent}</Select.Trigger>
				<Select.Content>
					<Select.Item value="all">All categories</Select.Item>
					{#each data.categories.filter(c => c.parent_id === null) as cat (cat)}
						<Select.Item value={cat.name}>
							{cat.name}
						</Select.Item>
					{/each}
				</Select.Content>
			</Select.Root>
			-->
			<div class="flex items-center gap-2">
				<CategoryDropdown
					categories={data.categories}
					selected={selectedCategory}
					onSelect={(cat) => {
						selectedCategory = cat;
						categoryFilter = cat.id;
					}}
				/>
				{#if selectedCategory}
					<!--<span class="text-sm text-muted-foreground">Selected: {selectedCategory.name}</span> -->
					<button onclick={clearCat}>X</button>
				{/if}
			</div>	
		</div>

		{#if filteredListings.length === 0}
			<div
				class="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center"
			>
				<p class="mb-2 text-lg font-medium text-foreground">No items found</p>
				<p class="text-sm text-muted-foreground">Try adjusting your search or filters</p>
			</div>
		{:else}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4	">
				{#each filteredListings as listing (listing.id)}
					<ListingCard {listing} />
				{/each}
			</div>
		{/if}

		
	</main>
	<LLUpcomingActivities />
</div>
