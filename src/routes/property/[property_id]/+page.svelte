<script>
    export let data;
    $: console.log(data);
</script>

<p>{data.property?.full_address}</p>

<ul>
    {#each data.property?.reports as report}
        <li>
            <p class="upload-time">Uploaded on {report.ts}</p>
            <iframe src={report.report_url} title="inspection report"></iframe>
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