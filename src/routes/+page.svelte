<script>
    export let data;
</script>

<p>Recently shared by other homebuyers:</p>
<ul>
    {#each data.addresses as { address_id, full_address}}
        <li><a data-sveltekit-preload-data="tap" href="/property/{address_id}" target="_self">{full_address}</a></li>
    {/each}
</ul>

<style>
    * {
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        box-sizing: border-box;
    }
    p {
        margin: 0;
    }

</style>
