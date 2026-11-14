// Spoločné drobnosti pre všetky stránky.

// Rok v pätičke
document.querySelectorAll('#year').forEach(function(el) {
    el.textContent = new Date().getFullYear();
});

// Mobilné menu
var navToggle = document.getElementById('navToggle');
var navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
        var isOpen = navLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("openContactModal");
    const cancelBtn = document.getElementById("cancelContactModal");
    const modal = document.getElementById("contactModal");

    if (openBtn && modal && cancelBtn) {
        // Otvorenie okna
        openBtn.addEventListener("click", (e) => {
            e.preventDefault();
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        });

        // Zatvorenie tlačidlom Cancel
        cancelBtn.addEventListener("click", () => {
            modal.classList.remove("active");
            modal.setAttribute("aria-hidden", "true");
        });

        // Zatvorenie kliknutím mimo formulára
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                modal.setAttribute("aria-hidden", "true");
            }
        });

        // Zatvorenie klávesou Escape
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("active")) {
                modal.classList.remove("active");
                modal.setAttribute("aria-hidden", "true");
            }
        });
    }
});