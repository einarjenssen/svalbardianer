<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    import { page } from '$app/state';

    const isVerified = page.url.searchParams.get('verified');

	// Svelte 5 runes
	let loading = $state(false);
	let errorMessage = $state('');

	let email = $state('');
	let password = $state('');

	async function handleSocialLogin(provider: string) {
		loading = true;
		errorMessage = '';
		try {
			// You can optionally add: callbackURL: '/'
			const res = await authClient.signIn.social({ provider, callbackURL: '/' });

			// If the client returns a redirect URL (depends on config), follow it:
			if (res?.url) window.location.href = res.url;
			// Otherwise if a session is already present, go home
			else if (res?.session) goto('/');
		} catch (err) {
			console.error(err);
			errorMessage = 'Social login failed. Please try again.';
		} finally {
			loading = false;
		}
	}

	async function handleEmailLogin(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		errorMessage = '';
		try {
			// For credentials-based email+password:
			const res = await authClient.signIn.email({
				email,
				password,
				callbackURL: '/'
			});
			if (res?.error) {
				errorMessage = res.error.message || 'Invalid credentials.';
			} else if (res?.session) {
				goto('/');
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Login failed. Please try again.';
		} finally {
			loading = false;
		}
	}


    // POLARSYSSEL STUFF

    let imgEl: HTMLImageElement;

    // Target and current positions
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    // Easing factors
    const positionEase = 0.001;  // smaller = more lag
    const rotationEase = 0.01; // smaller = slower turning

    // Rotation handling
    let currentAngle = 0;
    let targetAngle = 0;

    let lastX = 0;
    let lastY = 0;

    onMount(() => {
        const handleMove = (e: MouseEvent) => {
        targetX = e.clientX;
        targetY = e.clientY;
        };

        window.addEventListener('mousemove', handleMove);

        const update = () => {
        // Smoothly follow mouse
        currentX += (targetX - currentX) * positionEase;
        currentY += (targetY - currentY) * positionEase;

        // Compute movement delta
        const dx = currentX - lastX;
        const dy = currentY - lastY;

        // Only compute angle if moving
        if (Math.abs(dx) + Math.abs(dy) > 0.1) {
            targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        }

        // Smoothly ease rotation toward target angle
        const angleDiff = ((targetAngle - currentAngle + 540) % 360) - 180; // shortest rotation direction
        currentAngle += angleDiff * rotationEase;

        // Apply transform
        if (imgEl) {
            imgEl.style.transform = `
            translate3d(${currentX - imgEl.width / 2}px, ${currentY - imgEl.height / 2}px, 0)
            rotate(${currentAngle}deg)
            `;
        }

        // Update last position
        lastX = currentX;
        lastY = currentY;

        requestAnimationFrame(update);
        };

        update();

        return () => {
        window.removeEventListener('mousemove', handleMove);
        };
    });


</script>

<div
	class="min-h-screen flex items-center justify-center bg-gray-100 bg-cover bg-center bg-no-repeat"
	style="background-image: url('/assets/backgrounds/arctic_wildlife_bg02.png'); background-repeat: repeat; background-size: 400px;"
>
    <img src="/assets/graphics/polarsyssel.svg" class="polarsyssel" alt="" bind:this={imgEl} />
	<div class="loginstuff bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        {#if isVerified && isVerified === "true"}<h3 class="text-center pb-2 text-green-600">Your email was verified OK!</h3>{/if}
		<h1 class="text-3xl font-bold text-center mb-6">Sign in to your account</h1>

		{#if errorMessage}
			<p class="text-red-600 text-center mb-4">{errorMessage}</p>
		{/if}

		<form onsubmit={handleEmailLogin} class="space-y-4 mb-8">
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
					class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
					required
				/>
			</div>

			<button
				type="submit"
				class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
				disabled={loading}
			>
				{loading ? 'Signing in...' : 'Sign In'}
			</button>

			<div class="mt-2 text-right">
				<a href="/forgot-password" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
			</div>
		</form>

		<div class="flex items-center mb-6">
			<hr class="flex-grow border-gray-300" />
			<span class="px-3 text-gray-500 text-sm">or</span>
			<hr class="flex-grow border-gray-300" />
		</div>

		<div class="grid gap-3">
			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('google')}
				disabled={loading}
			>
				<img src="/assets/logos/google-color.svg" alt="Google" class="h-5 w-5" />
				<span>Continue with Google</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('facebook')}
				disabled={loading}
			>
				<img src="/assets/logos/facebook-color.svg" alt="Facebook" class="h-5 w-5" />
				<span>Continue with Facebook</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('microsoft')}
				disabled={loading}
			>
				<img src="/assets/logos/mssymbol_19.svg" alt="Microsoft" class="h-5 w-5" />
				<span>Continue with Microsoft</span>
			</button>

			<button
				class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
				onclick={() => handleSocialLogin('github')}
				disabled={loading}
			>
				<img src="/assets/logos/github-color.svg" alt="GitHub" class="h-5 w-5" />
				<span>Continue with GitHub</span>
			</button>
		</div>

		<p class="text-sm text-gray-500 text-center mt-6">
			Don’t have an account?
			<a href="/signup" class="text-blue-600 hover:underline">Create one</a>
		</p>
	</div>
</div>

<style>
    .polarsyssel {
        position: fixed;
        top: 0;
        left: 0;
        width: 200px; /* Adjust as needed */
        height: auto;
        pointer-events: none; /* Don't block clicks */
        transform-origin: center center; /* rotate around center */
        will-change: transform;
        z-index: 0;
    }

    .loginstuff {
        z-index: 10;
    }
</style>
