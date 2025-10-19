<script lang="ts">
	import { CirclePlus, House, Menu, User } from '@lucide/svelte';
	import '../app.css';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';
	import * as Sheet from '$lib/components/ui/sheet';

	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<a href="/" class="flex items-center gap-2">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
				<House class="h-6 w-6 text-primary-foreground" />
			</div>
			<span class="text-xl font-semibold text-foreground">Svalbardianer</span>
		</a>

		<nav class="hidden items-center gap-2 md:flex">
			<Button variant={page.url.pathname === '/' ? 'default' : 'ghost'} href="/" size="sm">
				Browse
			</Button>
			<Button
				variant={page.url.pathname === '/listings/create' ? 'default' : 'ghost'}
				href="/listings/create"
				size="sm"
			>
				<CirclePlus class="mr-2 h-4 w-4" />
				Post Item
			</Button>
			<Button
				variant={page.url.pathname.includes('user') ? 'default' : 'ghost'}
				href={'/user/' + data.currentUser.id}
				size="sm"
			>
				<User class="mr-2 h-4 w-4" />
				Profile
			</Button>
		</nav>
		<Sheet.Root>
			<Sheet.Trigger class={buttonVariants({ variant: 'ghost' }) + ' md:hidden'}>
				<Menu class="h-6 w-6" />
				<span class="sr-only">Toggle menu</span>
			</Sheet.Trigger>
			<Sheet.Content side="right" class="w-64">
				<nav class="flex flex-col gap-4 pt-8">
					<Button
						href="/"
						variant={page.url.pathname === '/' ? 'default' : 'ghost'}
						class="justify-start"
					>
						<House class="mr-2 h-4 w-4" />
						Browse
					</Button>
					<Button
						variant={page.url.pathname === '/listings/create' ? 'default' : 'ghost'}
						class="justify-start"
						href="/listings/create"
					>
						<CirclePlus class="mr-2 h-4 w-4" />
						Post Item
					</Button>
					<Button
						variant={page.url.pathname.includes('user') ? 'default' : 'ghost'}
						class="justify-start"
						href="/profile"
					>
						<User class="mr-2 h-4 w-4" />
						Profile
					</Button>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</div>
</header>
{@render children?.()}
