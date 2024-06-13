<script>
    export let data;
    $: console.log(data);
</script>

<main>
    <div class="property-address">{data.property?.full_address}</div>

    {#each data.property?.uploads as upload}
        <div class="upload-time">Uploaded on {upload.ts}</div>
        <!-- <p class="upload-time">Uploaded on {upload.ts.toDateString()}</p> -->
        {#each upload.report_urls as url}
        <iframe src={url} title="inspection report"></iframe>
        <a class="full-screen-link" href={url}>View in fullscreen</a>
        {/each}
    {/each}
</main>

<style>
    .property-address {
        background-color: lightsalmon;
        text-align: center;
        padding: 0.5rem;
        margin: 0.5rem 0;
    }
    .upload-time {
        margin-bottom: 0;
        color: grey;
        text-align: center;
    }
    iframe {
        /* width: 80vw; */
        width: 100%;
        /* height: 100vh; */
        aspect-ratio: 1.294;
        resize:both;
        border: 1px solid black;
    }
    .full-screen-link {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
    }
</style>
