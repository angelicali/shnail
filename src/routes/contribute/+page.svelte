<script context="module">
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

</script>

<script>
    export let form;
    $: {
        console.log("component prop `form` updated:");
        console.log(form);
    }
    // https://vercel.com/guides/using-sveltekit-form-actions
    let fileUrls = [];


    function handleFileUpload(files) {
        [...files].forEach((file, i) => {
            const objectURL = URL.createObjectURL(file);
            fileUrls.push({url: objectURL, title: file.name});
            fileUrls = fileUrls;
        });
    }

    function processFile() {
        const fileList = this.files;
        console.log(`${fileList.length} file(s) added on client side`);
        if (fileList.length > 0) {
            const file = fileList[0];
            console.log(
                `Added file: ${file.name} | ${file.size} byte | ${file.type}`,
            );
        }
        handleFileUpload(fileList);
    }

    // Drag and drop functions
    // function dropFile(e) {
    //     console.log(`file dropped!`);
    //     e.preventDefault();
    //     const dropZone = document.getElementById("dropZone");
    //     dropZone.classList.remove("drop-hover");

    //     const dt = e.dataTransfer;
    //     const files = dt.files;

    //     handleFileUpload(files);
    // }

    // function dragenterHandler(e) {
    //     const dropZone = document.getElementById("dropZone");
    //     dropZone.classList.add("drop-hover");
    //     console.log(`drag entered!`);
    // }

    // function dragleaveHandler(e) {
    //     console.log(`drag leave`);
    //     const dropZone = document.getElementById("dropZone");
    //     dropZone.classList.remove("drop-hover");
    // }

    // function dragoverHandler(e) {
    //     e.preventDefault();
    // }
</script>

<!-- TODO: check out the example here: https://github.com/vercel/examples/tree/main/storage/blob-sveltekit -->

<p>Share your inspection results with other homebuyers!</p>
<form method="POST" action="?/upload" enctype="multipart/form-data">
    <!-- TODO: add email optional -->
    <div class="form-section">
        <label>Address: <input name="address-street" required /></label>
        <label>City: <input name="address-city" required /></label>
        <label
            >State: <select name="address-state" required>
                <option disabled selected value>SELECT</option>
                {#each states as state}
                    <option value={state}>{state}</option>
                {/each}
            </select></label
        >
        <label>Zip code: <input name="address-zipcode" required maxlength="5"/></label>
    </div>
    <div class="form-section">
        <label>Inpsection Report(s):
        <input
                name="report"
                id="report-file"
                type="file"
                accept=".pdf"
                multiple
                on:change={processFile}
            />
            </label>
        <!-- <div
            id="dropZone"
            on:drop={dropFile}
            on:dragover={dragoverHandler}
            on:dragenter={dragenterHandler}
            on:dragleave={dragleaveHandler}
        >
            Or drop files here!
        </div> -->
    </div>

    <div class="form-section" id="preview">
        {#each fileUrls as {url, title}}
        <iframe class='pdf-preview' src={url} {title} on:load={(e)=>{console.log(`revoking ${url}`); URL.revokeObjectURL(url);}} />
        {/each}
    </div>

    <div class="form-section">
        <button class="form-section" id="submit-btn"
            >Upload</button
        >
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
    #submit-btn {
        border: 1.5px;
        border-style:solid;
        border-color: rgb(36, 74, 108);
        padding: 0.5em;
        background-color: lightblue;
        cursor: pointer;
        color: darkslategrey;
        border-radius: 2px;
        transition-duration: 0.4s;
        /* box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19); */
    }
    #submit-btn:hover {
        background-color: lightseagreen;
    }
    #submit-btn:disabled {
        cursor: not-allowed;
        background-color: lightgrey;
        color: grey;
    }
    /* #dropZone {
        background-color: salmon;
        border: 5px solid blue;
        width: 300px;
        height: 100px;
        margin: auto;
        text-align:center;
    }
    #dropZone:global(.drop-hover) {
        background-color: lightsalmon;
    } */
    #preview {
        align-items: center;
        width:100%;
        
    }
    iframe {
        width:100%;
        margin: auto;
        aspect-ratio: 1.294;
        border: none;
    }
</style>
