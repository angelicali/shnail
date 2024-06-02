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
    <ul>
        <li>
            <a href="/" class="nav-block button {active_class_home}">
                Inspection Report Database
            </a>
        </li>
        <li>
            <a
                href="/contribute"
                class="nav-block button {active_class_contribute}">Contribute</a
            >
        </li>
        <li>
            <form action="/search" class="nav-block search-container">
                <input name="q" placeholder="Search..." />
                <button type="submit"><i class="fa fa-search"></i></button>
            </form>
        </li>
    </ul>
</nav>

<div class="slot-div">
    <slot />
</div>

<style>
    * {
        box-sizing: border-box;
    }
    .search-container button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1em;
    }
    .slot-div {
        /* padding: .8em; */
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        box-sizing: border-box;
    }
    nav ul {
        margin: 0;
        padding: 0em;
        /* background-color: skyblue; */
        align-items: center;
        display: inline;
    }
    nav ul li {
        display: inline-block;
    }
    .nav-block {
        border: none;
        color: rgb(182, 93, 84);
        font-size: 1.2em;
        font-weight: bold;
        text-align: center;
        padding: 0.6em;
        text-decoration: none;
        font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
            sans-serif;
        transition-duration: 0.4s;
    }
    .nav-block.search-container {
        padding-left: 0.6em;
        padding-top: 0em;
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
