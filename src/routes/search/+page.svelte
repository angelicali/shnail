<script>
    export let data;
</script>

{#if data.searchResults.length>0}
<ul>
    {#each data.searchResults as property}
    <li><a href="/property/{property.id}">{property.address}</a></li>
    {/each}
</ul>
{:else}
<p>no results found for "{data.searchQuery}"</p>
{/if}