<script>
    function submitEntry() {
        console.log("placeholder for submitEntry");
    }

    const states = ["TX", "CA", ""];
</script>

<p>Share your inspection results with other homebuyers!</p>
<form method="POST" action="?/upload" enctype="multipart/form-data">
    <div class="form-section">
        <label>Street: <input name="address-street" /></label>
        <label>City: <input name="address-city" /></label>
        <label
            >State: <select name="address-state">
                {#each states as state}
                    <option value={state}>{state}</option>
                {/each}
            </select></label
        >
        <label>Zip code: <input name="address-zip" /></label>
    </div>
    <div class="form-section">
        <label>
            Inspection reports:
            <input name="report" type="file" multiple="multiple" />
        </label>
    </div>
    <div class="form-section">
        <label>Other comments: <br /><textarea name="comment" /></label>
    </div>
    <div class="form-section">
        <button class="form-section">Submit</button>
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
        background-color: lightsalmon;
        cursor: pointer;
        color: brown;
    }
    form button:hover {
        background-color: Salmon;
    }
</style>
