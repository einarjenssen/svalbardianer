<script lang="ts">
  import { onMount } from 'svelte';

  let events = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    try {
      const res = await fetch('/api/activities');
      if (!res.ok) throw new Error('Kunne ikke hente aktiviteter.');
      events = await res.json();
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  });

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('no-NO', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
</script>

<section class="p-6 max-w-6xl mx-auto">
  <h1 class="text-3xl font-bold text-gray-900 mb-6 text-center">
    Kommende aktiviteter i Longyearbyen - Se mer på Lokalstyret.no
  </h1>

  {#if loading}
    <div class="text-center text-gray-500 py-8 animate-pulse">Laster inn aktiviteter...</div>
  {:else if error}
    <div class="text-center text-red-600 py-8">{error}</div>
  {:else if events.length === 0}
    <div class="text-center text-gray-500 py-8">Ingen kommende aktiviteter funnet.</div>
  {:else}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {#each events as ev}
        <div class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
          {#if ev.posterUrls?.length}
            <img src={ev.posterUrls[0]} alt={ev.title} class="w-full h-40 object-cover" loading="lazy" />
          {/if}

          <div class="flex-1 p-4 flex flex-col">
            <h2 class="text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
              {ev.title}
            </h2>

            <p class="text-sm text-gray-600 mb-1">🕓 {formatDateTime(ev.eventTime)}</p>
            {#if ev.location}
              <p class="text-sm text-gray-600 mb-2">📍 {ev.location}</p>
            {/if}

            <div class="mt-auto">
              <div class="flex items-center justify-between text-sm text-gray-500">
                <span>{ev.organizerName}</span>
                <span>{ev.categoryName}</span>
              </div>

              {#if ev.ctaUrl}
                <a
                  href={ev.ctaUrl}
                  target="_blank"
                  class="block mt-3 text-center bg-[#4c002b] text-white rounded-lg py-2 hover:bg-[#5e0941] transition-colors"
                >
                  Mer info
                </a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
