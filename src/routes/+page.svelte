<script>
    export let data;
</script>

<main>
    <div class="title">Recently shared by other homebuyers</div>
    {#each data.addresses as { address_id, full_address }}
        <div>
            <a
                data-sveltekit-preload-data="tap"
                href="/property/{address_id}"
                target="_self">{full_address}</a
            >
        </div>
    {/each}
</main>

<style>
    * {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        /* box-sizing: border-box; */
    }
</style>
