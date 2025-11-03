<script lang="ts">

	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// WENT MANUAL ON CAPTCHA
	//import { captcha } from 'better-auth/plugins';

	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');
	let svalbardSignupStatus = $state();

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let movedtosvalbard = $state('');
	let polarbear = $state('');
	let turnsignals = $state('');
	let sideoftheroad = $state('');
	let betterpast = $state('');

	let captchaSiteKey = '6Ld-ef8rAAAAADVB5kFpbBlkRwxFBue38siDq1LT';

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

			await new Promise<void>((resolve) => {
				if (grecaptcha.ready) grecaptcha.ready(resolve);
				else resolve();
			});

			const token = await grecaptcha.execute(captchaSiteKey, { action: 'signup' });

			const res = await fetch('/api/auth/sign-up/email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-captcha-response': token,
					// optionally: send user’s IP if you want to forward it per docs
					// 'x-captcha-user-remote-ip': userIp,
				},
				body: JSON.stringify({
					name,
					email,
					password,
					callbackURL: '/login?verified=true',
					// you could omit the captcha object from body
				}),
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
			if(Number.parseInt(movedtosvalbard) > 2024 || polarbear != 'yes' || turnsignals != 'no' || sideoftheroad != 'right' || betterpast != 'yes')
			{
				svalbardSignupStatus = 'Based on your answers, your status as a true Svalbardianer is questionable. We will let it pass this time...';
			}
			else
			{
				svalbardSignupStatus = 'You are a true Svalbardianer! Welcome aboard';
			}
		} catch (err) {
			console.error(err);
			errorMessage = 'Sign up failed. Please try again.';
		} finally {
			loading = false;
		}
	}

	// LNOMX STUFF

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

<svelte:head>
	<!-- ✅ Load Google reCAPTCHA v3 -->
	<script src="https://www.google.com/recaptcha/api.js?render={captchaSiteKey}" async defer></script>
</svelte:head>

<img src="/assets/graphics/lnomx.svg" class="lnomx" alt="" bind:this={imgEl} />

<div
	class="min-h-screen flex items-center justify-center bg-gray-100"
	style="background-image: url('/assets/backgrounds/arctic_wildlife_bg02.png'); background-repeat: repeat; background-size: 400px;"
>
	<div class="bg-white shadow-xl rounded-2xl p-10 w-full max-w-4xl signupstuff">
		<!-- Header -->
		{#if !successMessage}
		<h1 class="text-3xl font-bold text-center mb-2">Create your account</h1>
		<p class="text-sm text-gray-600 text-center mb-8">
			You are welcome to join if you are able to pass the difficult questions below
		</p>
		{/if}

		{#if errorMessage}
			<p class="text-red-600 text-center mb-4">{errorMessage}</p>
		{/if}

		{#if successMessage}
			<div class="text-center py-10">
				<h2 class="text-2xl font-bold mb-4">Signup successful!</h2>
				<p class="p-4">
					{svalbardSignupStatus}
				</p>
				<p class="text-gray-700">
					An email has been sent to <strong>{email}</strong>. Please verify your account before logging in.
				</p>
			</div>
		{:else}

		<!-- Two-column form -->
		<form on:submit={handleEmailSignUp} class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
			<!-- Left column -->
			<div class="space-y-4">
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
			</div>

			<!-- Right column (new additional fields) -->
			<div class="space-y-4">


				<!-- Example of extra fields -->
				<div>
					<label for="movedtosvalbard" class="block text-sm font-medium text-gray-700 mb-1">Year moved/moving to Svalbard</label>
					<input
						id="movedtosvalbard"
						bind:value={movedtosvalbard}
						type="number"
						placeholder="2025"
						class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>

				<div>
					<label for="polarbear" class="block text-sm font-medium text-gray-700 mb-1">
						Have you ever seen a polar bear?
					</label>

					<div class="flex items-center gap-6 mt-1">
						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="polarbear-yes"
								name="polarbear"
								value="yes"
								bind:group={polarbear}
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
								required
							/>
							<span class="text-gray-700 text-sm">Yes</span>
						</label>

						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="polarbear-no"
								name="polarbear"
								bind:group={polarbear}
								value="no"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="text-gray-700 text-sm">No</span>
						</label>
					</div>
				</div>

				<div>
					<label for="turnsignals" class="block text-sm font-medium text-gray-700 mb-1">
						Do you use your turn signals when driving?
					</label>

					<div class="flex items-center gap-6 mt-1">
						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="turnsignals-yes"
								name="turnsignals"
								bind:group={turnsignals}
								value="yes"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
								required
							/>
							<span class="text-gray-700 text-sm">Yes</span>
						</label>

						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="turnsignals-no"
								name="turnsignals"
								bind:group={turnsignals}
								value="no"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="text-gray-700 text-sm">No</span>
						</label>
					</div>
				</div>

				<div>
					<label for="sideoftheroad" class="block text-sm font-medium text-gray-700 mb-1">
						At which side of the road are you walking?
					</label>

					<div class="flex items-center gap-6 mt-1">
						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="sideoftheroad-right"
								name="sideoftheroad"
								bind:group={sideoftheroad}
								value="right"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
								required
							/>
							<span class="text-gray-700 text-sm">Right</span>
						</label>

						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="sideoftheroad-left"
								name="sideoftheroad"
								bind:group={sideoftheroad}
								value="left"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="text-gray-700 text-sm">Left</span>
						</label>
					</div>
				</div>

				<div>
					<label for="betterpast" class="block text-sm font-medium text-gray-700 mb-1">
						Was everything better in the past?
					</label>

					<div class="flex items-center gap-6 mt-1">
						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="betterpast-yes"
								name="betterpast"
								bind:group={betterpast}
								value="yes"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
								required
							/>
							<span class="text-gray-700 text-sm">Yes</span>
						</label>

						<label class="flex items-center gap-2">
							<input
								type="radio"
								id="betterpast-no"
								name="betterpast"
								bind:group={betterpast}
								value="no"
								class="text-blue-600 focus:ring-blue-500 border-gray-300"
							/>
							<span class="text-gray-700 text-sm">No</span>
						</label>
					</div>
				</div>

			</div>

			<!-- Full-width footer -->
			<div class="md:col-span-2 flex justify-center mt-4">
				<button
					type="submit"
					class="w-full md:w-1/3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
					disabled={loading}
				>
					{loading ? 'Creating account...' : 'Sign up'}
				</button>
			</div>
		</form>

		<!-- Optional social login section -->
		<div class="border-t border-gray-200 pt-6">
			<p class="text-center text-gray-500 text-sm mb-4">or continue with</p>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-lg mx-auto">
				<button
					class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
					on:click={() => handleSocialLogin('google')}
					disabled={loading}
				>
					<img src="/assets/logos/google-color.svg" alt="Google" class="h-5 w-5" />
					<span>Google</span>
				</button>

				<button
					class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
					on:click={() => handleSocialLogin('facebook')}
					disabled={loading}
				>
					<img src="/assets/logos/facebook-color.svg" alt="Facebook" class="h-5 w-5" />
					<span>Facebook</span>
				</button>

				<button
					class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
					on:click={() => handleSocialLogin('microsoft')}
					disabled={loading}
				>
					<img src="/assets/logos/mssymbol_19.svg" alt="Microsoft" class="h-5 w-5" />
					<span>Microsoft</span>
				</button>

				<button
					class="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 hover:bg-gray-50"
					on:click={() => handleSocialLogin('github')}
					disabled={loading}
				>
					<img src="/assets/logos/github-color.svg" alt="GitHub" class="h-5 w-5" />
					<span>GitHub</span>
				</button>
			</div>
		</div>

		<p class="text-sm text-gray-500 text-center mt-6">
			Already have an account?
			<a href="/login" class="text-blue-600 hover:underline">Sign in</a>
		</p>

		{/if}
	</div>
</div>



<style>
    .lnomx {
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

    .signupstuff {
        z-index: 10;
    }
</style>

