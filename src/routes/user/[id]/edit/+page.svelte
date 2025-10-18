<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { ArrowLeft } from '@lucide/svelte';

	function handleSave() {
		console.log('Profile saved:', formData);
		// Implement save logic here
	}
	function handleCancel() {
		console.log('Edit cancelled');
		// Implement cancel logic here
	}

	let formData = $state({
		avatar: '',
		name: '',
		email: '',
		phone: '',
		location: '',
		bio: ''
	});
</script>

<main class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-2xl">
		<Button variant="ghost" href="/profile" size="sm" class="mb-4">
			<ArrowLeft class="mr-2 h-4 w-4" />
			Back to Profile
		</Button>

		<Card>
			<CardHeader>
				<CardTitle>Edit Profile</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4">
				<div class="space-y-2">
					<Label for="name">Name</Label>
					<Input id="name" bind:value={formData.name} />
				</div>
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" bind:value={formData.email} />
				</div>
				<div class="space-y-2">
					<Label for="phone">Phone</Label>
					<Input id="phone" type="tel" bind:value={formData.phone} />
				</div>
				<div class="space-y-2">
					<Label for="location">Location</Label>
					<Input id="location" bind:value={formData.location} />
				</div>
				<div class="space-y-2">
					<Label for="bio">Bio</Label>
					<Textarea
						id="bio"
						bind:value={formData.bio}
						rows={4}
						placeholder="Tell others about yourself..."
					/>
				</div>
				<div class="flex gap-2 pt-4">
					<Button onclick={handleSave}>Save Changes</Button>
					<Button onclick={handleCancel} variant="outline">Cancel</Button>
				</div>
			</CardContent>
		</Card>
	</div>
</main>
