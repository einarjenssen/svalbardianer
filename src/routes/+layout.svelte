<script lang="ts">
	import { Home, PlusCircle, User } from '@lucide/svelte';
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
	import { page } from '$app/state';
	import type { LayoutData } from './$types';
	import type { Snippet } from 'svelte';

	let { children, data }: { data: LayoutData; children: Snippet } = $props();
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<a href="/" class="flex items-center gap-2">
			<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
				<Home class="h-6 w-6 text-primary-foreground" />
			</div>
			<span class="text-xl font-semibold text-foreground">Svalbardianer</span>
		</a>

		<nav class="flex items-center gap-2">
			<Button variant={page.url.pathname === '/' ? 'default' : 'ghost'} href="/" size="sm">
				Browse
			</Button>
			<Button
				variant={page.url.pathname === '/listings/create' ? 'default' : 'ghost'}
				href="/listings/create"
				size="sm"
			>
				<PlusCircle class="mr-2 h-4 w-4" />
				Post Item
			</Button>
			<Button
				variant={page.url.pathname === '/profile' ? 'default' : 'ghost'}
				href={'/user/' + data.currentUser.id}
				size="sm"
			>
				<User class="mr-2 h-4 w-4" />
				Profile
			</Button>
		</nav>
	</div>
</header>
{@render children?.()}
