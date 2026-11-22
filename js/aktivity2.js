document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("mcPresentationModal");
    const openBtn = document.getElementById("openMountainCoasterModal");
    const closeBtn = document.getElementById("closeMcPresModal");
    const prevBtn = document.getElementById("prevMcSlide");
    const nextBtn = document.getElementById("nextMcSlide");
    const contentEl = document.getElementById("mcPresContent");
    const captionEl = document.getElementById("mcPresCaption");
    const counterEl = document.getElementById("mcPresCounter");

    if (!modal || !openBtn) return;

    // Zoznam 58 slajdov podľa podkladu Presentation_Mountain Coaster12345_4.pdf (SK mutácia)
    const mcSlides = [
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-01.jpg", title: "Sunkid Mountain Coaster – Úvod" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-02.jpg", title: "Sunkid – Líder v oblasti outdoorových atrakcií (9500+ projektov v 80+ krajinách)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-03.jpg", title: "Mountain Coaster 2.0 – Konštrukcia a prvky vozíka" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-04.jpg", title: "Kľúčové vlastnosti: Komfort 2.0, Bezpečnosť 2.0, Efektivita 2.0" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-05.jpg", title: "Jedinečný zážitok z jazdy na jednokoľajnici (Monorail)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-06.jpg", title: "Nákladovo efektívna a rýchla inštalácia v takmer akomkoľvek teréne" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-07.jpg", title: "Celoročná prevádzka v každom počasí – Made in Austria" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-08.jpg", title: "Jednoduchá demontáž – Ideálne riešenie pre lyžiarske zjazdovky (bez betónových základov)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-09.jpg", title: "Inteligentné dopravné riešenia pre vývoz vozíkov" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-10.jpg", title: "Kompatibilita s existujúcimi vlekmi, sedačkovými a kabínkovými lanovkami" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-11.jpg", title: "Sunkid Lifter System – Automatický výťahový systém (do 600 m, sklon max. 60 %)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-12.jpg", title: "Inteligentné možnosti parkovania a skladovania vozíkov" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-13.jpg", title: "Štandardné parkovanie (galéria) a skladovacia slučka v stanici" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-14.jpg", title: "Plne automatická garáž – Vysoká kapacita na malej ploche bez obsluhy" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-15.jpg", title: "Dizajnové prvky – Špirály (Loops), skoky, vlny a fotopointy" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-16.jpg", title: "Mosty a nadjazdy – Kovové alebo drevené oplotenie (výška 6 m+)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-17.jpg", title: "Technické riešenia mostov pre križovanie ciest a zjazdoviek" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-18.jpg", title: "Tunely a podjazdy – Svetelné, zvukové a hmlové efekty" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-19.jpg", title: "Referencie: Mountain Coaster 2.0" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-20.jpg", title: "Referencia MC 2.0: La Clusaz (Francúzsko) – 1 133 m, 2025" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-21.jpg", title: "Referencia MC 2.0: 3 Zinnen, Innichen (Taliansko) – 3 089 m, 2025" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-22.jpg", title: "Referencia MC 2.0: Sinaia (Rumunsko) – 2 227 m, 2025" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-23.jpg", title: "Referencia MC 2.0: Tufandaq (Azerbajdžan) – 3 082 m, 2025" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-24.jpg", title: "Referencia MC 2.0: Predeal (Rumunsko) – 892 m, 2025" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-25.jpg", title: "Referencia MC 2.0: Chamrousse (Francúzsko) – 900 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-26.jpg", title: "Referencia MC 2.0: Oi Qaragai (Kazachstan) – 933 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-27.jpg", title: "Referencia MC 2.0: Szczyrk (Poľsko) – 885 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-28.jpg", title: "Referencia MC 2.0: Bernex (Francúzsko) – 1 061 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-29.jpg", title: "Referencia MC 2.0: Trysil (Nórsko) – 758 m, 2023" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-30.jpg", title: "Referencia: Les Angles (Francúzsko) – 2 000 m, nočné jazdy" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-31.jpg", title: "Referencia: Monte Cavallo (Taliansko) – 1 300 m, 2022" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-32.jpg", title: "Referencia: Revelstoke (Kanada) – 2 trate (1 300 m + 1 400 m)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-33.jpg", title: "Referencia: Fiss (Rakúsko) – 2 200 m, 100 000 jázd ročne" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-34.jpg", title: "Referencie: Mountain Coaster so sedačkovou lanovkou" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-35.jpg", title: "Referencia (Sedačková lanovka): Panorama (Kanada) – 1 019 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-36.jpg", title: "Referencia (Sedačková lanovka): Cypress Mountain (Kanada) – 1 719 m, 2021" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-37.jpg", title: "Referencia (Sedačková lanovka): Camp Fortune (Kanada) – 663 m, 2021" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-38.jpg", title: "Referencia (Sedačková lanovka): Klíny (Česko) – 814 m, 2018" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-39.jpg", title: "Referencie: Mountain Coaster so systémom Sunkid Lifter" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-40.jpg", title: "Referencia (Lifter): Predeal (Rumunsko) – 892 m, celoročná prevádzka" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-41.jpg", title: "Referencia (Lifter): La Clusaz (Francúzsko) – 1 133 m, prevýšenie 139 m" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-42.jpg", title: "Referencia (Lifter): Chamrousse (Francúzsko) – 900 m, nočné jazdy" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-43.jpg", title: "Referencia (Lifter): Bernex (Francúzsko) – 1 061 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-44.jpg", title: "Referencia (Lifter): Belfast (Severné Írsko) – 560 m, celoročná prevádzka" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-45.jpg", title: "Referencia (Lifter): La Rosière (Francúzsko) – 977 m, 2019" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-46.jpg", title: "Referencia (Lifter): Winterberg (Nemecko) – 556 m, 2018" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-47.jpg", title: "Referencie: Mountain Coaster s kotvovým vlekom (T-Bar)" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-48.jpg", title: "Referencia (Kotvový vlek): Oi Qaragai (Kazachstan) – 933 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-49.jpg", title: "Referencia (Kotvový vlek): Szczyrk (Poľsko) – 900 m, 2024" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-50.jpg", title: "Referencia (Kotvový vlek): Trysil (Nórsko) – 760 m, 2023" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-51.jpg", title: "Referencia (Kotvový vlek): Hammarbybacken (Švédsko) – 760 m, 2022" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-52.jpg", title: "Referencia (Kotvový vlek): Canyon Ski Resort (Kanada) – 1 350 m, 2022" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-53.jpg", title: "Referencia (Kotvový vlek): Durău (Rumunsko) – 776 m, 2020" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-54.jpg", title: "Referencia (Kotvový vlek): Borsec (Rumunsko) – 1 440 m, 2019" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-55.jpg", title: "Referencia (Kotvový vlek): Katschberg (Rakúsko) – 625 m, 2014" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-56.jpg", title: "Referencia (Kotvový vlek): Elbigenalp (Rakúsko) – 1 514 m, 2014" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-57.jpg", title: "Referencia (Kotvový vlek): Grünberg (Rakúsko) – 1 936 m, 2014" },
        { lanovky: "lanovky/Mountain_Coaster_SK/slide-58.jpg", title: "Kontakt – Sunkid GmbH & Regionálne zastúpenie" }
    ];

    let currentIndex = 0;

    function renderSlide(index) {
        if (index < 0) currentIndex = mcSlides.length - 1;
        else if (index >= mcSlides.length) currentIndex = 0;
        else currentIndex = index;

        const slide = mcSlides[currentIndex];
        contentEl.innerHTML = `<lanovky src="${slide.lanovky}" alt="${slide.title}" style="max-width:100%; max-height:78vh; object-fit:contain; border-radius:6px;">`;
        captionEl.textContent = slide.title;
        counterEl.textContent = `${currentIndex + 1} / ${mcSlides.length}`;
    }

    function openModal(e) {
        if (e) e.preventDefault();
        renderSlide(0);
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("active");
        document.body.style.overflow = "";
    }

    openBtn.addEventListener("click", openModal);
    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", () => renderSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => renderSlide(currentIndex + 1));

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (modal.getAttribute("aria-hidden") === "false") {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") renderSlide(currentIndex - 1);
            if (e.key === "ArrowRight") renderSlide(currentIndex + 1);
        }
    });
});