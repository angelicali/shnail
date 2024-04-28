<script>
    function submitEntry(){
        console.log('placeholder for submitEntry');
    }
</script>

<h1>Shnail - share your inspection reports with other homebuyers</h1>
Address: <input /> <br>
Inspection results: <br>
<textarea>This house was...</textarea> <br>
<input type='file' multiple="multiple"/>
<br> <button on:click={submitEntry}>Submit</button>