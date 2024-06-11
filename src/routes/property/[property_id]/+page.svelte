<script>
    export let data;
    $: console.log(data);
</script>

<p>{data.property?.full_address}</p>

<ul>
    {#each data.property?.uploads as upload}
        <li>
            <p class="upload-time">Uploaded on {upload.ts}</p>
            <!-- <p class="upload-time">Uploaded on {upload.ts.toDateString()}</p> -->
            {#each upload.report_urls as url}
            <iframe src={url} title="inspection report"></iframe>
            {/each}
        </li>
    {/each}
</ul>

<style>
    li {
        list-style-type: none;
    }
    p.upload-time {
        margin-bottom: 0;
        color: grey;
    }
    iframe {
        width: 100%;
        aspect-ratio: 1.294;
    }
</style>