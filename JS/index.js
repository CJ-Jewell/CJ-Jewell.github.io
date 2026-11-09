// Infinity loader. Shows once per visit, hides as soon as the page is ready
// (with a short minimum so it never just flashes), then removes itself.
(function () {
    var MIN_MS = 600;
    var start = Date.now();
    var seen = false;
    try { seen = sessionStorage.getItem("cj-loader-seen") === "1"; } catch (e) {}

    function hide() {
        var el = document.querySelector(".preloader");
        if (!el) return;
        if (seen) { el.remove(); return; }
        var wait = Math.max(0, MIN_MS - (Date.now() - start));
        setTimeout(function () {
            el.classList.add("is-done");
            setTimeout(function () { el.remove(); }, 400);
            try { sessionStorage.setItem("cj-loader-seen", "1"); } catch (e) {}
        }, wait);
    }

    if (seen) {
        document.addEventListener("DOMContentLoaded", hide);
    } else if (document.readyState === "complete") {
        hide();
    } else {
        window.addEventListener("load", hide);
    }
})();
