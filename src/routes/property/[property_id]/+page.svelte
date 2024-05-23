<script>
    export let data;
    console.log(`property page data: ${data}`);
</script>

<p>{data.property.fullAddress}</p>

<ul>
    {#each data.property.uploads as upload}
    <li>{upload.comment}</li>
    {/each}
</ul>