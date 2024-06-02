<script>
    export let data;
    $: console.log(data);
</script>

{#if data.searchResults.length>0}
<p>Matched results for "{data.searchQuery}"</p>
<ul>
    {#each data.searchResults as {address_id, full_address}}
    <li><a href="/property/{address_id}" target="_self">{full_address}</a></li>
    {/each}
</ul>
{:else}
<p>no results found for "{data.searchQuery}"</p>
{/if}