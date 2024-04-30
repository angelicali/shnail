<script>
    export let data;
    console.log(`property page data: ${data}`);
</script>

<p>{data.property.address}</p>

<ul>
    {#each data.property.comments as comment}
    <li>{comment}</li>
    {/each}
</ul>