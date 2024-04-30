
<script>
    export let data;
</script>

<h1>Shnail - share your inspection reports with other homebuyers</h1>
Recently commented by other homebuyers:
<ul>
    {#each data.addresses as {id, address}}
    <li><a href='/property/{id}'>{address}</a></li>
    {/each}
</ul>