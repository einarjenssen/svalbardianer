<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { X } from '@lucide/svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function handleSubmit(event: Event) {
		event.preventDefault();
		console.log('Form submitted');
	}

	function handleImageChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			const files = Array.from(input.files);
			files.forEach((file) => {
				const reader = new FileReader();
				reader.onload = (e) => {
					imagePreviews = [...imagePreviews, e.target?.result as string];
				};
				reader.readAsDataURL(file);
			});
		}
	}

	function removeImage(index: number) {
		imagePreviews = imagePreviews.filter((_, i) => i !== index);
	}

	let title = $state(data.listing.title);
	let description = $state(data.listing.description);
	let category = $state(data.listing.category);
	let location = $state(data.listing.location);
	let price: number | null = $state(data.listing.price);
	let imagePreviews: string[] = $state(data.listing.images ?? []);
</script>

<main class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-2xl">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-foreground">Edit Item</h1>
			<p class="leading-relaxed text-muted-foreground">
				Share items with your community - set price to $0 for free items
			</p>
		</div>

		<form onsubmit={handleSubmit}>
			<Card>
				<CardHeader>
					<CardTitle>Listing Details</CardTitle>
					<CardDescription>Fill in the information about your item</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-2">
						<Label for="title">Title *</Label>
						<Input
							id="title"
							placeholder="e.g., Vintage Wooden Chair"
							bind:value={title}
							required
						/>
					</div>

					<div class="space-y-2">
						<Label for="description">Description *</Label>
						<Textarea
							id="description"
							placeholder="Describe your item in detail..."
							bind:value={description}
							rows={5}
							required
						/>
					</div>

					<div class="grid gap-4 sm:grid-cols-2">
						<div class="space-y-2">
							<Label for="category">Category *</Label>
							<Select bind:value={category} type="single">
								<SelectTrigger id="category">{category || 'Select a category'}</SelectTrigger>
								<SelectContent>
									<SelectItem value="Furniture">Furniture</SelectItem>
									<SelectItem value="Electronics">Electronics</SelectItem>
									<SelectItem value="Kids & Baby">Kids & Baby</SelectItem>
									<SelectItem value="Collectibles">Collectibles</SelectItem>
									<SelectItem value="Garden & Outdoor">Garden & Outdoor</SelectItem>
									<SelectItem value="Games & Hobbies">Games & Hobbies</SelectItem>
									<SelectItem value="Home & Decor">Home & Decor</SelectItem>
									<SelectItem value="Other">Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div class="space-y-2">
							<Label for="location">Location *</Label>
							<Select bind:value={location} type="single">
								<SelectTrigger id="location">
									{location || 'Select a location'}
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="Downtown">Downtown</SelectItem>
									<SelectItem value="Northside">Northside</SelectItem>
									<SelectItem value="Southside">Southside</SelectItem>
									<SelectItem value="Eastside">Eastside</SelectItem>
									<SelectItem value="Westside">Westside</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>

					<div class="space-y-2">
						<Label for="price">Price *</Label>
						<Input
							id="price"
							type="number"
							placeholder="0.0"
							bind:value={price}
							min="0"
							step="0.01"
							required
						/>
						<p class="text-xs text-muted-foreground">
							Set price to 0 for items you want to give away
						</p>
					</div>

					<div class="space-y-2">
						<Label for="images">Images</Label>
						<Input id="images" type="file" accept="image/*" multiple onchange={handleImageChange} />
						<p class="text-xs text-muted-foreground">
							Upload photos of your item (you can select multiple)
						</p>

						{#if imagePreviews.length > 0}
							<div class="mt-4 grid grid-cols-3 gap-3">
								{#each imagePreviews as preview, index (index)}
									<div
										class="relative aspect-square overflow-hidden rounded-lg border border-border"
									>
										<img
											src={preview || '/placeholder.svg'}
											alt={`Preview ${index + 1}`}
											class="h-full w-full object-cover"
										/>
										<Button
											type="button"
											variant="destructive"
											size="icon"
											class="absolute top-1 right-1 h-6 w-6"
											onclick={() => removeImage(index)}
										>
											<X class="h-4 w-4" />
										</Button>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</CardContent>
			</Card>

			<div class="mt-6 flex gap-4">
				<Button
					type="button"
					variant="outline"
					onclick={() => window.history.back()}
					class="flex-1"
				>
					Cancel
				</Button>
				<Button type="submit" class="flex-1">Post Listing</Button>
			</div>
		</form>
	</div>
</main>
