// ===================================
// SAKUTOOLS - TEMA GLOBAL
// Berlaku untuk Beranda, Tentang, dan semua halaman tools
// ===================================

(function () {
    const themeButtons = document.querySelectorAll("#themeToggle");

    function simpanTema(tema) {
        try {
            localStorage.setItem("sakuTheme", tema);
        } catch (error) {}
    }

    function bacaTema() {
        try {
            return localStorage.getItem("sakuTheme") || "light";
        } catch (error) {
            return "light";
        }
    }

    function terapkanTema(tema) {
        const modeGelap = tema === "dark";
        document.body.classList.toggle("dark", modeGelap);
        document.documentElement.classList.toggle("dark", modeGelap);
        document.documentElement.style.colorScheme = modeGelap ? "dark" : "light";

        themeButtons.forEach(function (button) {
            button.textContent = modeGelap ? "☀️" : "🌙";
            button.setAttribute("aria-label",
                modeGelap ? "Aktifkan mode terang" : "Aktifkan mode gelap");
            button.setAttribute("title",
                modeGelap ? "Aktifkan mode terang" : "Aktifkan mode gelap");
        });
    }

    terapkanTema(bacaTema());

    themeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const temaBaru = document.body.classList.contains("dark") ? "light" : "dark";
            terapkanTema(temaBaru);
            simpanTema(temaBaru);
        });
    });

    window.addEventListener("storage", function (event) {
        if (event.key === "sakuTheme") {
            terapkanTema(event.newValue === "dark" ? "dark" : "light");
        }
    });
})();


// FITUR PENCARIAN ALAT (KHUSUS BERANDA)
const searchInput = document.getElementById("searchInput");
const toolCards = document.querySelectorAll(".tool-card");
const noResults = document.getElementById("noResults");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const keyword = this.value.toLowerCase().trim();
        let found = 0;

        toolCards.forEach(function (card) {
            const name = (card.dataset.name || "").toLowerCase();
            if (name.includes(keyword)) {
                card.style.display = "";
                found++;
            } else {
                card.style.display = "none";
            }
        });

        if (noResults) {
            noResults.hidden = found !== 0;
        }
    });
}
