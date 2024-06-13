<script>
    import { page } from "$app/stores";
    $: pageName = $page.url.pathname.substr(
        $page.url.pathname.lastIndexOf("/"),
    );
    $: active_class_home = pageName === "/" ? "active" : "";
    $: active_class_contribute = pageName === "/contribute" ? "active" : "";
    // $: active_class_search = pageName === "/search" ? "active" : "";
</script>

<nav>
    <a href="/" class="nav-block button {active_class_home}">
        Inspection Report Database
    </a>
    <a href="/contribute" class="nav-block button {active_class_contribute}"
        >Contribute</a
    >
    <form action="/search" class="nav-block search-container">
        <input name="q" placeholder="Search..." />
        <button type="submit"><i class="fa fa-search"></i></button>
    </form>
</nav>

<div class="slot-div">
    <slot />
</div>

<style>
    :global(.title) {
        margin: 1rem 0;
        text-align: center;
    }
    .search-container button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1em;
    }
    .slot-div {
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        display: flex;
        justify-content: center;
    }
    nav {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .nav-block {
        /* border: 5px black solid; */
        margin: 0.5rem;
        color: rgb(182, 93, 84);
        font-size: 1.1rem;
        font-weight: bold;
        /* text-align: center; */
        /* padding: 0.6em; */
        text-decoration: none;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        transition-duration: 0.4s;

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .nav-block.active {
        /* background-color: skyblue; */
        /* text-decoration: underline; */
        /* text-underline-offset: 11px; */
        color: rgb(95, 60, 48);
    }
    .nav-block.button:hover {
        /* background-color: beige; */
        color: rgb(91, 117, 40);
    }
    /* .active-search {
        color: rgb(91, 117, 40);
    } */
</style>
