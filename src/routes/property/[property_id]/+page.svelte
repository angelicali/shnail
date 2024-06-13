<script>
    export let data;
    $: console.log(data);
</script>

<main>
    <div class="property-address">{data.property?.full_address}</div>

    {#each data.property?.uploads as upload}
        <div class="upload-section">
            <div class="upload-time">
                Uploaded on {Intl.DateTimeFormat('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  }).format(upload.ts)}
            </div>
            {#if upload.comment}
                <div class="comment">{upload.comment}</div>
            {/if}
            <!-- <p class="upload-time">Uploaded on {upload.ts.toDateString()}</p> -->
            {#each upload.report_urls as url}
                <iframe src={url} title="inspection report"></iframe>
                <a class="full-screen-link" href={url} target="_blank">View in fullscreen</a>
            {/each}
        </div>
    {/each}
</main>

<style>
    .property-address {
        background-color: lightsalmon;
        text-align: center;
        padding: 0.5rem;
        margin: 0.5rem 0;
    }
    .upload-section {
        margin-bottom: 2rem;
    }
    .upload-time {
        margin-bottom: 0;
        color: rgba(128, 128, 128, 0.896);
        text-align: center;
    }
    iframe {
        /* width: 80vw; */
        width: 100%;
        /* height: 100vh; */
        aspect-ratio: 1.294;
        resize: both;
        border: 1px solid black;
    }
    .full-screen-link {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        font-size: 0.6rem;
    }
</style>
