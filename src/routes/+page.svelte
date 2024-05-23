<script>
    export let data;
</script>


<!-- <form action="/search">
    <label>Look up an address: <input name="q" /> </label> <button aria-label="Search" />  {searchErrorMsg}
</form> -->


<p>Recently shared by other homebuyers:</p>
<ul>
    {#each data.addresses as { id, address }}
        <li><a href="/property/{id}">{address}</a></li>
    {/each}
</ul>

<style>
    * {
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        box-sizing: border-box;
    }
    p {
        margin: 0;
    }

</style>
