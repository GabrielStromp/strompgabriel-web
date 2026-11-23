// Súbor: /js/aktivity2.js
// Interaktívna modálna prezentácia Sunkid Mountain Coaster (SK mutácia obrázkov a slovenských popiskov)

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("mcPresentationModal");
    const openBtn = document.getElementById("openMountainCoasterModal");
    const closeBtn = document.getElementById("closeMcPresModal");
    const prevBtn = document.getElementById("prevMcSlide");
    const nextBtn = document.getElementById("nextMcSlide");
    const contentEl = document.getElementById("mcPresContent");
    const captionEl = document.getElementById("mcPresCaption");
    const counterEl = document.getElementById("mcPresCounter");

    // Ukončenie, ak na stránke chýbajú kľúčové prvky modálneho okna alebo spúšťacie tlačidlo
    if (!modal || !openBtn || !contentEl) return;

    // Zoznam snímok prezentácie (zdroj obrázkov: ../lanovky/Mountain_Coaster_SK/)
    const mcSlides = [
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-01.jpg", title: "Sunkid Mountain Coaster – Úvod" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-02.jpg", title: "Referencia (Kotvový vlek): Grünberg (Rakúsko) – 1 936 m, 2014" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-03.jpg", title: "Referencia (Kotvový vlek): Elbigenalp (Rakúsko) – 1 514 m, 2014" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-04.jpg", title: "Referencia (Kotvový vlek): Katschberg (Rakúsko) – 625 m, 2014", youtube: "https://www.youtube.com/watch?v=bdhhceFAv6o" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-05.jpg", title: "Referencia (Kotvový vlek): Borsec (Rumunsko) – 1 440 m, 2019" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-06.jpg", title: "Referencia (Kotvový vlek): Durău (Rumunsko) – 776 m, 2020", youtube: "https://www.youtube.com/watch?v=M4YGO_eXdTE" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-07.jpg", title: "Referencia (Kotvový vlek): Canyon Ski Resort (Kanada) – 1 350 m, 2022", youtube: "https://www.youtube.com/watch?v=fVSBDukx2qM" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-08.jpg", title: "Referencia (Kotvový vlek): Hammarbybacken (Švédsko) – 760 m, 2022", youtube: "https://www.youtube.com/watch?v=NXKn-iRKEkE" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-09.jpg", title: "Referencia (Kotvový vlek): Trysil (Nórsko) – 760 m, 2023" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-10.jpg", title: "Referencia (Kotvový vlek): Szczyrk (Poľsko) – 900 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-11.jpg", title: "Referencia (Kotvový vlek): Oi Qaragai (Kazachstan) – 933 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-12.jpg", title: "Referencie: Mountain Coaster s kotvovým vlekom" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-13.jpg", title: "Referencia (Lifter): Winterberg (Nemecko) – 556 m, 2018", youtube: "https://www.youtube.com/watch?v=FUFSSV7Bq8U" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-14.jpg", title: "Referencia (Lifter): La Rosière (Francúzsko) – 977 m, 2019", youtube: "https://www.youtube.com/watch?v=Xjf6-T7ysuM" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-15.jpg", title: "Referencia (Lifter): Belfast (Severné Írsko) – 560 m, celoročná prevádzka", youtube: "https://www.youtube.com/watch?v=_JqyhXiqvDE" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-16.jpg", title: "Referencia (Lifter): Bernex (Francúzsko) – 1 061 m, 2024", youtube: "https://www.youtube.com/watch?v=coE_u_nQWXE" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-17.jpg", title: "Referencia (Lifter): Chamrousse (Francúzsko) – 900 m, nočné jazdy", youtube: "https://www.youtube.com/shorts/SF4Q-Un73BY" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-18.jpg", title: "Referencia (Lifter): La Clusaz (Francúzsko) – 1 133 m, prevýšenie 139 m" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-19.jpg", title: "Referencia (Lifter): Predeal (Rumunsko) – 892 m, celoročná prevádzka", youtube: "https://www.youtube.com/watch?v=e_ufohuhwBs" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-20.jpg", title: "Referencie: Mountain Coaster so systémom Sunkid Lifter" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-21.jpg", title: "Referencia (Sedačková lanovka): Klíny (Česko) – 814 m, 2018", youtube: "https://www.youtube.com/watch?v=Hxq9HMRFuww" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-22.jpg", title: "Referencia (Sedačková lanovka): Camp Fortune (Kanada) – 663 m, 2021", youtube: "https://www.youtube.com/watch?v=2RDvx2IiW50" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-23.jpg", title: "Referencia (Sedačková lanovka): Cypress Mountain (Kanada) – 1 719 m, 2021", youtube: "https://www.youtube.com/watch?v=I9HZ9r5Xh9g" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-24.jpg", title: "Referencia (Sedačková lanovka): Panorama (Kanada) – 1 019 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-25.jpg", title: "Referencie: Mountain Coaster so sedačkovou lanovkou" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-26.jpg", title: "Referencia: Fiss (Rakúsko) – 2 200 m, 100 000 jázd ročne", youtube: "https://www.youtube.com/watch?v=S3RmS87lpQQ" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-27.jpg", title: "Referencia: Revelstoke (Kanada) – 2 trate (1 300 m + 1 400 m)", youtube: "https://www.youtube.com/watch?v=TQXTbPBW7aA&t=3s" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-28.jpg", title: "Referencia: Monte Cavallo (Taliansko) – 1 300 m, 2022", youtube: "https://www.youtube.com/watch?v=vA1d8_fsp1Y" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-29.jpg", title: "Referencia: Les Angles (Francúzsko) – 2 000 m, nočné jazdy", youtube: "https://www.youtube.com/watch?v=e6le7hoyXLA" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-30.jpg", title: "Referencia MC 2.0: Trysil (Nórsko) – 758 m, 2023" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-31.jpg", title: "Referencia MC 2.0: Bernex (Francúzsko) – 1 061 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-32.jpg", title: "Referencia MC 2.0: Szczyrk (Poľsko) – 885 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-33.jpg", title: "Referencia MC 2.0: Oi Qaragai (Kazachstan) – 933 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-34.jpg", title: "Referencia MC 2.0: Chamrousse (Francúzsko) – 900 m, 2024", youtube: "https://www.youtube.com/shorts/SF4Q-Un73BY" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-36.jpg", title: "Referencia MC 2.0: Tufandaq (Azerbajdžan) – 3 082 m, 2025" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-37.jpg", title: "Referencia MC 2.0: Sinaia (Rumunsko) – 2 227 m, 2025", youtube: "https://www.youtube.com/watch?v=coE_u_nQWXE" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-38.jpg", title: "Referencia MC 2.0: 3 Zinnen, Innichen (Taliansko) – 3 089 m, 2025", youtube: "https://www.youtube.com/watch?v=PzNcLTX3B-k" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-39.jpg", title: "Referencia MC 2.0: La Clusaz (Francúzsko) – 1 133 m, 2025" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-40.jpg", title: "Referencie: Mountain Coaster 2.0" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-41.jpg", title: "Tunely a podjazdy – Svetelné, zvukové a hmlové efekty" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-42.jpg", title: "Technické riešenia mostov pre križovanie ciest a zjazdoviek" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-43.jpg", title: "Mosty a nadjazdy – Kovové alebo drevené oplotenie (výška 6 m+)" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-44.jpg", title: "Dizajnové prvky – Špirály, skoky, vlny a fotopointy" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-45.jpg", title: "Plne automatická garáž – Vysoká kapacita na malej ploche bez obsluhy" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-46.jpg", title: "Štandardné parkovanie (galéria) a skladovacia slučka v stanici" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-47.jpg", title: "Inteligentné možnosti parkovania a skladovania vozíkov" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-48.jpg", title: "Sunkid Lifter System – Automatický výťahový systém (do 600 m, sklon max. 60 %)" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-49.jpg", title: "Kompatibilita s existujúcimi vlekmi, sedačkovými a kabínkovými lanovkami" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-50.jpg", title: "Inteligentné dopravné riešenia pre vývoz vozíkov" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-51.jpg", title: "Jednoduchá demontáž – Ideálne riešenie pre lyžiarske zjazdovky (bez betónových základov)" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-52.jpg", title: "Celoročná prevádzka v každom počasí – Made in Austria" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-53.jpg", title: "Nákladovo efektívna a rýchla inštalácia v takmer akomkoľvek teréne" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-54.jpg", title: "Jedinečný zážitok z jazdy na jednokoľajnici (Monorail)" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-55.jpg", title: "Kľúčové vlastnosti: Komfort 2.0, Bezpečnosť 2.0, Efektivita 2.0" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-56.jpg", title: "Mountain Coaster 2.0 – Konštrukcia a prvky vozíka" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-57.jpg", title: "Sunkid – Líder v oblasti outdoorových atrakcií (9 500+ projektov v 80+ krajinách)" },
        { lanovky: "../lanovky/Mountain_Coaster_SK/slide-58.jpg", title: "Kontakt – Sunkid GmbH & Regionálne zastúpenie", youtube: "https://www.youtube.com/watch?v=NSp_yk3wYM4" }
    ];

    // Index aktuálne zobrazenej snímky
    let currentIndex = 0;

    // Vykreslí snímku, slovenský popis, počítadlo a prípadný YouTube odkaz
    function renderSlide(index) {
        if (index < 0) currentIndex = mcSlides.length - 1;
        else if (index >= mcSlides.length) currentIndex = 0;
        else currentIndex = index;

        const slide = mcSlides[currentIndex];
        contentEl.innerHTML = `<img src="${slide.lanovky}" alt="${slide.title}">`;
        if (captionEl) captionEl.textContent = slide.title;
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${mcSlides.length}`;

        const videoEl = document.getElementById("mcPresVideo");
        if (videoEl) {
            if (slide.youtube) {
                videoEl.innerHTML = `<a href="${slide.youtube}" target="_blank" rel="noopener noreferrer">▶ Pozrieť video na YouTube</a>`;
            } else {
                videoEl.innerHTML = "";
            }
        }
    }

    // Otvorí modálne okno a zobrazí prvú snímku
    function openModal(e) {
        if (e) e.preventDefault();
        renderSlide(0);
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    // Zatvorí modálne okno a obnoví rolovanie stránky
    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    // Ovládanie tlačidlami a kliknutím mimo obsahu
    openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (prevBtn) prevBtn.addEventListener("click", () => renderSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => renderSlide(currentIndex + 1));

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    // Ovládanie klávesnicou (Escape, šípky vľavo/vpravo) pri otvorenom modale
    document.addEventListener("keydown", (e) => {
        if (modal.classList.contains("is-open")) {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") renderSlide(currentIndex - 1);
            if (e.key === "ArrowRight") renderSlide(currentIndex + 1);
        }
    });
});