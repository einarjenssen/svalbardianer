<script lang="ts">

    import { readable } from "svelte/store";
    import { createTable, Subscribe, Render, createRender } from '@humanspeak/svelte-headless-table';

    const data = readable([
        { name: 'Fjellsport', url: 'https://fjellsport.no', verified: 'Yes', minShipping: '500'},
        { name: 'Komplett', url: 'https://komplett.no', verified: 'Yes', minShipping: '600' },
        { name: 'Dustin', url: 'https://dustinhome.no', verified: 'Yes', minShipping: '100' },
    ]);

    const table = createTable(data);

    const columns = table.createColumns([
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
            accessor: 'minShipping'
        }),
    ]);

    const { headerRows, rows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns)

</script>

<main class="container mx-auto px-4 py-8">
	<div class="mx-auto max-w-2xl">
		<div class="mb-8">
			<h1 class="mb-2 text-3xl font-bold text-foreground">Who is sending to Svalbard?</h1>
			<p class="leading-relaxed text-muted-foreground">
				Register, share your experience and vote for the best stores!
			</p>
		</div>
        <div class="table-auto">
            <table class="shippingtable" {...$tableAttrs}>
                <thead>
                    {#each $headerRows as headerRow (headerRow.id)}
                    <tr>
                        {#each headerRow.cells as cell (cell.id)}
                        <Subscribe attrs={cell.attrs()} let:attrs>
                            <th {...attrs}>
                            <Render of={cell.render()} />
                            </th>
                        </Subscribe>
                        {/each}
                    </tr>
                    {/each}
                </thead>
                <tbody {...$tableBodyAttrs}>
                    {#each $pageRows as row (row.id)}
                    <tr class="hover:bg-gray-50">
                        {#each row.cells as cell (cell.id)}
                        <Subscribe attrs={cell.attrs()} let:attrs>
                            <td {...attrs}>
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
    .shippingtable th {
        font-weight: bold;
        font-size: large;
        background-color: #f2f2f2;
        padding: 8px;
        text-align: left;
    }
    .shippingtable td {
        font-weight: normal;
        padding-left: 2px;
        padding-right: 2px;
        text-align: left;
    }
    .shippingtable tr:nth-child(even) {
        background-color: #f2f2f2; /* Light grey background */
    }
</style>