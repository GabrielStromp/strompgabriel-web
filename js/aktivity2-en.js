document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("mcPresentationModal");
    const openBtn = document.getElementById("openMountainCoasterModal");
    const closeBtn = document.getElementById("closeMcPresModal");
    const prevBtn = document.getElementById("prevMcSlide");
    const nextBtn = document.getElementById("nextMcSlide");
    const contentEl = document.getElementById("mcPresContent");
    const captionEl = document.getElementById("mcPresCaption");
    const counterEl = document.getElementById("mcPresCounter");

    if (!modal || !openBtn || !contentEl) return;

    // List of 58 slides based on Presentation_Mountain Coaster12345_4.pdf (EN version)
    const mcSlides = [
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-01.jpg", title: "Sunkid Mountain Coaster – Introduction" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-02.jpg", title: "Reference (T-Bar Lift): Grünberg (Austria) – 1,936 m, 2014" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-03.jpg", title: "Reference (T-Bar Lift): Elbigenalp (Austria) – 1,514 m, 2014" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-04.jpg", title: "Reference (T-Bar Lift): Katschberg (Austria) – 625 m, 2014", youtube: "https://www.youtube.com/watch?v=bdhhceFAv6o" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-05.jpg", title: "Reference (T-Bar Lift): Borsec (Romania) – 1,440 m, 2019" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-06.jpg", title: "Reference (T-Bar Lift): Durău (Romania) – 776 m, 2020", youtube: "https://www.youtube.com/watch?v=M4YGO_eXdTE" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-07.jpg", title: "Reference (T-Bar Lift): Canyon Ski Resort (Canada) – 1,350 m, 2022", youtube: "https://www.youtube.com/watch?v=fVSBDukx2qM" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-08.jpg", title: "Reference (T-Bar Lift): Hammarbybacken (Sweden) – 760 m, 2022", youtube: "https://www.youtube.com/watch?v=NXKn-iRKEkE" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-09.jpg", title: "Reference (T-Bar Lift): Trysil (Norway) – 760 m, 2023" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-10.jpg", title: "Reference (T-Bar Lift): Szczyrk (Poland) – 900 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-11.jpg", title: "Reference (T-Bar Lift): Oi Qaragai (Kazakhstan) – 933 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-12.jpg", title: "References: Mountain Coaster with T-Bar Surface Lift" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-13.jpg", title: "Reference (Lifter): Winterberg (Germany) – 556 m, 2018", youtube: "https://www.youtube.com/watch?v=FUFSSV7Bq8U" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-14.jpg", title: "Reference (Lifter): La Rosière (France) – 977 m, 2019", youtube: "https://www.youtube.com/watch?v=Xjf6-T7ysuM" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-15.jpg", title: "Reference (Lifter): Belfast (Northern Ireland) – 560 m, Year-Round Operation", youtube: "https://www.youtube.com/watch?v=_JqyhXiqvDE" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-16.jpg", title: "Reference (Lifter): Bernex (France) – 1,061 m, 2024", youtube: "https://www.youtube.com/watch?v=coE_u_nQWXE" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-17.jpg", title: "Reference (Lifter): Chamrousse (France) – 900 m, Night Rides", youtube: "https://www.youtube.com/shorts/SF4Q-Un73BY" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-18.jpg", title: "Reference (Lifter): La Clusaz (France) – 1,133 m, 139 m Elevation Gain" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-19.jpg", title: "Reference (Lifter): Predeal (Romania) – 892 m, Year-Round Operation", youtube: "https://www.youtube.com/watch?v=e_ufohuhwBs" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-20.jpg", title: "References: Mountain Coaster with Sunkid Lifter System" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-21.jpg", title: "Reference (Chairlift): Klíny (Czech Republic) – 814 m, 2018", youtube: "https://www.youtube.com/watch?v=Hxq9HMRFuww" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-22.jpg", title: "Reference (Chairlift): Camp Fortune (Canada) – 663 m, 2021", youtube: "https://www.youtube.com/watch?v=2RDvx2IiW50" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-23.jpg", title: "Reference (Chairlift): Cypress Mountain (Canada) – 1,719 m, 2021", youtube: "https://www.youtube.com/watch?v=I9HZ9r5Xh9g" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-24.jpg", title: "Reference (Chairlift): Panorama (Canada) – 1,019 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-25.jpg", title: "References: Mountain Coaster with Chairlift" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-26.jpg", title: "Reference: Fiss (Austria) – 2,200 m, 100,000 Rides per Year", youtube: "https://www.youtube.com/watch?v=S3RmS87lpQQ" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-27.jpg", title: "Reference: Revelstoke (Canada) – 2 Tracks (1,300 m + 1,400 m)", youtube: "https://www.youtube.com/watch?v=TQXTbPBW7aA&t=3s" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-28.jpg", title: "Reference: Monte Cavallo (Italy) – 1,300 m, 2022", youtube: "https://www.youtube.com/watch?v=vA1d8_fsp1Y" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-29.jpg", title: "Reference: Les Angles (France) – 2,000 m, Night Rides", youtube: "https://www.youtube.com/watch?v=e6le7hoyXLA" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-30.jpg", title: "Reference MC 2.0: Trysil (Norway) – 758 m, 2023" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-31.jpg", title: "Reference MC 2.0: Bernex (France) – 1,061 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-32.jpg", title: "Reference MC 2.0: Szczyrk (Poland) – 885 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-33.jpg", title: "Reference MC 2.0: Oi Qaragai (Kazakhstan) – 933 m, 2024" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-34.jpg", title: "Reference MC 2.0: Chamrousse (France) – 900 m, 2024", youtube: "https://www.youtube.com/shorts/SF4Q-Un73BY" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-36.jpg", title: "Reference MC 2.0: Tufandaq (Azerbaijan) – 3,082 m, 2025" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-37.jpg", title: "Reference MC 2.0: Sinaia (Romania) – 2,227 m, 2025", youtube: "https://www.youtube.com/watch?v=coE_u_nQWXE" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-38.jpg", title: "Reference MC 2.0: 3 Zinnen, Innichen (Italy) – 3,089 m, 2025", youtube: "https://www.youtube.com/watch?v=PzNcLTX3B-k" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-39.jpg", title: "Reference MC 2.0: La Clusaz (France) – 1,133 m, 2025" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-40.jpg", title: "References: Mountain Coaster 2.0" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-41.jpg", title: "Tunnels and Underpasses – Light, Sound, and Fog Effects" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-42.jpg", title: "Technical Bridge Solutions for Crossing Roads and Ski Slopes" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-43.jpg", title: "Bridges and Overpasses – Metal or Wooden Fencing (Height 6 m+)" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-44.jpg", title: "Design Elements – Spirals (Loops), Jumps, Waves, and Photo Points" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-45.jpg", title: "Fully Automatic Garage – High Capacity on a Small Footprint Without Staff" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-46.jpg", title: "Standard Parking (Gallery) and Station Storage Loop" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-47.jpg", title: "Smart Toboggan Parking and Storage Options" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-48.jpg", title: "Sunkid Lifter System – Automatic Uphill Conveyor System (up to 600 m, max. 60% gradient)" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-49.jpg", title: "Compatibility with Existing Surface Lifts, Chairlifts, and Gondolas" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-50.jpg", title: "Smart Uphill Transport Solutions for Toboggans" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-51.jpg", title: "Easy Dismantling – Ideal Solution for Ski Slopes (No Concrete Foundations)" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-52.jpg", title: "Year-Round Operation in All Weather Conditions – Made in Austria" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-53.jpg", title: "Cost-Effective and Fast Installation in Almost Any Terrain" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-54.jpg", title: "Unique Riding Experience on a Single Rail (Monorail)" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-55.jpg", title: "Key Features: Comfort 2.0, Safety 2.0, Efficiency 2.0" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-56.jpg", title: "Mountain Coaster 2.0 – Toboggan Design and Features" },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-57.jpg", title: "Sunkid – Leader in Outdoor Attractions (9,500+ Projects in 80+ Countries) " },
        { lanovky: "../lanovky/Mountain_Coaster_EN/slide-58.jpg", title: "Contact – Sunkid GmbH & Regional Representation", youtube: "https://www.youtube.com/watch?v=NSp_yk3wYM4" }
    ];

    let currentIndex = 0;

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
                videoEl.innerHTML = `<a href="${slide.youtube}" target="_blank" rel="noopener noreferrer">▶ Watch video on YouTube</a>`;
            } else {
                videoEl.innerHTML = "";
            }
        }
    }

    function openModal(e) {
        if (e) e.preventDefault();
        renderSlide(0);
        modal.setAttribute("aria-hidden", "false");
        modal.classList.add("is-open");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("is-open");
        document.body.style.overflow = "";
    }

    openBtn.addEventListener("click", openModal);
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (prevBtn) prevBtn.addEventListener("click", () => renderSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => renderSlide(currentIndex + 1));

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (modal.classList.contains("is-open")) {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowLeft") renderSlide(currentIndex - 1);
            if (e.key === "ArrowRight") renderSlide(currentIndex + 1);
        }
    });
});