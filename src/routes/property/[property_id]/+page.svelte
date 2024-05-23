<script>
    export let data;
    console.log(`property page data: ${data}`);
</script>

<p>{data.property.fullAddress}</p>

<ul>
    {#each data.property.uploads as upload}
    <li>
        {#each upload.reports as report} <p>{report}</p> {/each}
        {upload.comment}
    </li>
    {/each}
</ul>