<script lang="ts">

    import type { PageProps } from './$types';
    import { readable } from 'svelte/store';
    import type { OnlineStore } from '$lib/types/onlinestore';
    import { createTable, Subscribe, Render, createRender } from '@humanspeak/svelte-headless-table';

    let { data }: PageProps = $props();

    const onloneStoreData = readable<OnlineStore[]>(data.onlineStores);

    const table = createTable(onloneStoreData);

    const columns = table.createColumns([
        table.column({
            header: 'Status',
            accessor: 'is_shipping',
            cell: (value) => {
                if (value.value?.toString().toUpperCase() === 'TRUE') return "YES";
                if (value.value?.toString().toUpperCase() === 'FALSE') return "NO";
                return "UNKNOWN"
            },
        }),
        table.column({
            header: 'Name',
            accessor: 'name',
        }),
        table.column({
            header: 'Url',
            accessor: 'url',
        }),
        table.column({
            header: 'Verified',
            accessor: 'verified'
        }),
        table.column({
            header: 'Min. shipping',
            accessor: 'min_shipping'
        }),
    ]);

    const { headerRows, rows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns)

</script>

<main class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-6xl space-y-6">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-foreground">Who is sending stuff to Svalbard?</h1>
			<p class="leading-relaxed text-muted-foreground">
				Register, share your experience and vote for the best stores!
			</p>
		</div>
        <div class="overflow-x-auto rounded-2xl shadow-md border border-gray-200 bg-white">
            <table class="min-w-full border-collapse text-left text-sm text-gray-600" {...$tableAttrs}>
                <thead class="bg-gray-100 text-gray-900 uppercase text-xs font-semibold">
                    {#each $headerRows as headerRow (headerRow.id)}
                    <tr>
                        {#each headerRow.cells as cell (cell.id)}
                        <Subscribe attrs={cell.attrs()} let:attrs>
                            <th class="px-6 py-4" {...attrs}>
                            <Render of={cell.render()} />
                            </th>
                        </Subscribe>
                        {/each}
                    </tr>
                    {/each}
                </thead>
                <tbody class="divide-y divide-gray-200" {...$tableBodyAttrs}>
                    {#each $pageRows as row (row.id)}
                    <tr class="hover:bg-gray-50 transition">
                        {#each row.cells as cell (cell.id)}
                        <Subscribe attrs={cell.attrs()} let:attrs>
                            <td class="px-6 py-4 font-medium text-gray-900" {...attrs}>
                            <Render of={cell.render()} />
                            </td>
                        </Subscribe>
                        {/each}
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</main>

<style>
    .shippingtable {
        display: flex flex-col;
    }
    .shippingtable th {
        font-weight: bold;
        font-size: large;
        background-color: #f2f2f2;
        padding: 8px;
        text-align: left;
    }
    .shippingtable td {
        font-weight: normal;
        padding-left: 8px;
        padding-right: 4px;
        text-align: left;
    }
    .shippingtable tr:nth-child(even) {
        background-color: #f2f2f2; /* Light grey background */
    }
</style>