<script lang="ts">
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuSub,
		DropdownMenuSubContent,
		DropdownMenuSubTrigger,
		DropdownMenuTrigger,
		DropdownMenuSeparator
	} from "$lib/components/ui/dropdown-menu";
	import type { Category } from "$lib/types/category";

	let {
		categories,
		selected,
		onSelect
	}: {
		categories: Category[];
		selected: Category | null;
		onSelect?: (cat: Category) => void;
	} = $props();

	const getChildren = (parentId: number | null) =>
		categories.filter((c) => c.parent_id === parentId);

	function handleSelect(cat: Category) {
		//console.log("Category selected:", cat);
		selected = cat;
		onSelect?.(cat);
	}
</script>

<DropdownMenu>
	<DropdownMenuTrigger class="btn">
		{#if selected}
			{selected.name}
		{:else}
			Choose category
		{/if}
	</DropdownMenuTrigger>

	<DropdownMenuContent class="w-56">
		<!-- All categories -->
		<DropdownMenuItem onSelect={() => handleSelect({ id: 0, name: "All Categories", parent_id: null })}>
			All categories
		</DropdownMenuItem>

		<DropdownMenuSeparator />

		<!-- Top-level categories -->
		{#each getChildren(null) as parent}
			{#if getChildren(parent.id).length > 0}
				<DropdownMenuSub>
					<DropdownMenuSubTrigger class="flex justify-between items-center" onSelect={() => handleSelect(parent)}>
						<span>{parent.name}</span>
						<!--
						<svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
						-->
					</DropdownMenuSubTrigger>

					<DropdownMenuSubContent>
						{#each getChildren(parent.id) as child}
							<DropdownMenuItem onSelect={() => handleSelect(child)} class="cursor-pointer">
								{child.name}
							</DropdownMenuItem>
						{/each}
					</DropdownMenuSubContent>
				</DropdownMenuSub>
			{:else}
				<DropdownMenuItem onSelect={() => handleSelect(parent)} class="cursor-pointer">
					{parent.name}
				</DropdownMenuItem>
			{/if}
		{/each}
	</DropdownMenuContent>
</DropdownMenu>
