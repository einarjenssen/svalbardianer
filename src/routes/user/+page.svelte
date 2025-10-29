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
	import { authClient } from "$lib/auth-client"; 
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	let formData = $state({
		avatar: data.session?.user.image,//data.user.avatar,
		name: data.session?.user.name, //data.user.name,
		email: data.session?.user.email,//data.user.email,
		//location: 'bobo', //data.user.location,
		//bio: 'lala',//data.user.bio,
		joinedDate: data.session?.user.createdAt//data.user.joinedDate
	});

	function handleDelete(listingId: string, listingTitle: string) {
		console.log(`Delete listing with ID: ${listingId} and Title: ${listingTitle}`);
	}

	async function signOut() {
		await authClient.signOut();
		goto('/login');
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
							<div class="flex flex-end">
								<button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50" onclick={signOut}>Sign out</button>

							</div>
						</div>
						<!--
						{#if data.isCurrentUser}
							<Button href={`/user/${data.user.id}/edit`} variant="outline" size="sm">
								<Edit2 class="mr-2 h-4 w-4" />
								Edit Profile
							</Button>
						{/if}
					-->
					</div>
				</CardHeader>
				<CardContent class="space-y-6">
					<div class="space-y-4">
						<div class="flex items-center gap-2 text-muted-foreground">
							<Mail class="h-4 w-4" />
							<span>{formData.email}</span>
						</div>

						<div class="flex items-center gap-6 pt-2 text-sm">
							<div class="flex items-center gap-2">
								<Package class="h-4 w-4 text-muted-foreground" />
								<span class="font-medium">5</span>
								<span class="text-muted-foreground">Total</span>
							</div>
							<div class="flex items-center gap-2">
								<CheckCircle class="h-4 w-4 text-green-600" />
								<span class="font-medium">5</span>
								<span class="text-muted-foreground">Active</span>
							</div>
							<div class="flex items-center gap-2">
								<CheckCircle class="h-4 w-4 text-muted-foreground" />
								<span class="font-medium">5</span>
								<span class="text-muted-foreground">Sold</span>
							</div>
						</div>
					</div>
					<!-- {/if} -->
				</CardContent>
			</Card>
		</div>
	</main>
</div>
