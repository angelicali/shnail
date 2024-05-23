<script>
    const states = ["TX", "CA", ""];
    const disableButton = () => {
        document.getElementById('submit-btn').prop('disabled', true);
    };
</script>

<!-- TODO: check out the example here: https://github.com/vercel/examples/tree/main/storage/blob-sveltekit -->

<p>Share your inspection results with other homebuyers!</p>
<form method="POST" action="?/upload" enctype="multipart/form-data">
    <div class="form-section">
        <label>Address: <input name="address-street" /></label>
        <label>City: <input name="address-city" /></label>
        <label
            >State: <select name="address-state">
                {#each states as state}
                    <option value={state}>{state}</option>
                {/each}
            </select></label
        >
        <label>Zip code: <input name="address-zipcode" /></label>
    </div>
    <div class="form-section">
        <label>
            Inspection reports:
            <input name="report" id="report-file" type="file" multiple="multiple" accept=".pdf"/>
        </label>
    </div>
    <div class="form-section">
        <label>Other comments: <br /><textarea name="comment" /></label>
    </div>
    <div class="form-section">
        <button class="form-section" id="submit-btn" on:click={disableButton}>Submit</button>
    </div>
</form>

<style>
    p {
        margin: 0;
    }
    form div label {
        display: inline-block;
        margin: 0.2em;
    }
    form .form-section {
        display: block;
        margin: 0.5em;
    }
    form textarea {
        height: auto;
    }
    form button {
        border: none;
        padding: 0.5em;
        background-color: lightblue;
        cursor: pointer;
        color: darkslategrey;
        border-radius: 2px;
        transition-duration: 0.4s;
        /* box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); */
    }
    form button:hover {
        background-color: lightseagreen;
    }
    form button:disabled {
        cursor:not-allowed;
        background-color: lightgrey;
        color: grey;
    }
</style>
