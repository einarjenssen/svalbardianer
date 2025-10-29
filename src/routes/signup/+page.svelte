<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');

	async function handleSocialLogin(provider: string) {
		loading = true;
		errorMessage = '';
		successMessage = '';
		try {
			const res = await authClient.signIn.social({
				provider,
				callbackURL: '/'
			});

			if (res?.url) {
				window.location.href = res.url;
			} else if (res?.session) {
				goto('/');
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Social sign up failed. Please try again.';
		} finally {
			loading = false;
		}
	}

	async function handleEmailSignUp(event: SubmitEvent) {
		event.preventDefault();

		if (password !== confirmPassword) {
			errorMessage = 'Passwords do not match.';
			return;
		}

		loading = true;
		errorMessage = '';
		successMessage = '';

		try {
			const res = await authClient.signUp.email({
				name,
				email,
				password,
				callbackURL: '/'
			});

			if (res?.error) {
				errorMessage = res.error.message || 'Sign up failed. Please try again.';
				return;
			}

			if (res?.session) {
				goto('/');
				return;
			}

			successMessage = 'Account created! Please check your email to verify your account.';
		} catch (err) {
			console.error(err);
			errorMessage = 'Sign up failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
	<div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
		<h1 class="text-3xl font-bold text-center mb-4">Create your account</h1>
		<p class="text-sm text-gray-600 text-center mb-6">
			Join the community to post listings, manage your profile, and more.
		</p>

		{#if errorMessage}
			<p class="text-red-600 text-center mb-4">{errorMessage}</p>
		{/if}

		{#if successMessage}
			<p class="text-green-600 text-center mb-4">{successMessage}</p>
		{/if}

		<form onsubmit={handleEmailSignUp} class="space-y-4 mb-8">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full name</label>
				<input
					id="name"
					type="text"
					bind:value={name}
					class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
				<input
					id="email"
					type="email"
					bind:value={email}
					class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div>
				<label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
				<input
					id="password"
					type="password"
					bind:value={password}
					minlength={8}
					class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<div>
				<label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
					Confirm password
				</label>
				<input
					id="confirmPassword"
					type="password"
					bind:value={confirmPassword}
					minlength={8}
					class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
				disabled={loading}
			>
				{loading ? 'Creating account...' : 'Sign up'}
			</button>
		</form>

		<div class="flex items-center mb-6">
			<hr class="flex-grow border-gray-300" />
			<span class="px-3 text-gray-500 text-sm">or continue with</span>
			<hr class="flex-grow border-gray-300" />
		</div>

		<div class="grid gap-3">
			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('google')}
				disabled={loading}
			>
				<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="h-5 w-5" />
				<span>Continue with Google</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('facebook')}
				disabled={loading}
			>
				<img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" class="h-5 w-5" />
				<span>Continue with Facebook</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('apple')}
				disabled={loading}
			>
				<img src="https://www.svgrepo.com/show/303128/apple-logo.svg" alt="Apple" class="h-5 w-5" />
				<span>Continue with Apple</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('microsoft')}
				disabled={loading}
			>
				<img src="https://www.svgrepo.com/show/373669/microsoft.svg" alt="Microsoft" class="h-5 w-5" />
				<span>Continue with Microsoft</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('github')}
				disabled={loading}
			>
				<img src="https://www.svgrepo.com/show/475654/github-color.svg" alt="GitHub" class="h-5 w-5" />
				<span>Continue with GitHub</span>
			</button>
		</div>

		<p class="text-sm text-gray-500 text-center mt-6">
			Already have an account?
			<a href="/login" class="text-blue-600 hover:underline">Sign in</a>
		</p>
	</div>
</div>
