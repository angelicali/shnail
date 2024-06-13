<script>
    export let data;
    $: console.log(data);
</script>

<main>
    {#if data.searchResults.length > 0}
        <div class="title">Matched results for "{data.searchQuery}"</div>
        {#each data.searchResults as { address_id, full_address }}
            <a href="/property/{address_id}" target="_self">{full_address}</a>
        {/each}
    {:else}
        <p>no results found for "{data.searchQuery}"</p>
    {/if}
</main>

<style>
    .title {
        margin: 1rem 0;
    }

    a {
        display: block;
    }
</style>
