document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openLanovkyPresentation');
    const modal = document.getElementById('presentationModal');
    if (!openBtn || !modal) return;

    // Cesty z podadresára /hu/ o úroveň vyššie
    const baseImgPath = '../lanovky/H_BLUECIME_AI/';
    const baseVidPath = '../lanovky/SK_BLUECIME_AI/videa/';

    // Mind a 33 dia és 17 videó pontos térképe
    const slides = [
        { type: 'image', src: baseImgPath + 'Snímka1.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka2.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka3.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka4.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka5.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka6.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka7.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka8.JPG' },
        { type: 'mixed', img: baseImgPath + 'Snímka9.JPG', video: baseVidPath + 'media1.mp4', cssStyle: 'position: absolute; top: 12%; left: 33%; width: 63%; height: 75%;' }, // 9. dia
        {
            type: 'animated-image',
            src: baseImgPath + 'Snímka10.JPG',
            dots: [
                { top: '41%', left: '16%', size: '24px', color: '#f39893', glow: '0 0 18px 8px rgba(255, 59, 48, 0.9)' }, // Bal oldali lámpa a tető alatt
                { top: '29%', left: '78.5%', size: '12px', color: '#f77f9b', glow: '0 0 14px 6px rgba(239, 171, 98, 0.9)' }, // Jobb oldali LED a kamerán (2x)
                { top: '27.5%', left: '83%', size: '12px', color: '#f77f9b', glow: '0 0 14px 6px rgba(239, 171, 98, 0.9)' }
            ]
        }, // 10. dia (animáció)
        { type: 'videos', sources: [baseVidPath + 'media2.mp4'] }, // 11. dia
        { type: 'image', src: baseImgPath + 'Snímka12.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka13.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka14.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka15.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka16.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka17.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka18.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka19.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka20.JPG' },
        { type: 'image', src: baseImgPath + 'Snímka21.JPG' },
        {
            type: 'mixed-grid',
            img: baseImgPath + 'Snímka22.JPG',
            sources: [baseVidPath + 'media3.mp4', baseVidPath + 'media4.mp4'],
            cssStyle: 'position: absolute; top: 29%; left: 3.5%; width: 93%; height: 63%; display: grid; grid-template-columns: 1fr 1fr; gap: 4%;'
        }, // 22. dia
        { type: 'image', src: baseImgPath + 'Snímka23.JPG' }, // 23. dia
        {
            type: 'mixed-grid',
            img: baseImgPath + 'Snímka24.JPG',
            sources: [baseVidPath + 'media5.mp4', baseVidPath + 'media6.mp4', baseVidPath + 'media7.mp4'],
            cssStyle: 'position: absolute; top: 22%; left: 0.1%; width: 100%; height: 100%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 1%;'
        }, // 24. dia
        {
            type: 'mixed',
            img: baseImgPath + 'Snímka25.JPG',
            video: baseVidPath + 'media8.mp4',
            cssStyle: 'position: absolute; top: 18%; left: 1%; width: 99%; height: 80%;'
        }, // 25. dia
        {
            type: 'mixed-grid',
            img: baseImgPath + 'Snímka26.JPG',
            sources: [baseVidPath + 'media9.mp4', baseVidPath + 'media10.mp4'],
            cssStyle: 'position: absolute; top: 15%; left: 0.5%; width: 100%; height: 92%; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2%;'
        }, // 26. dia
        {
            type: 'mixed',
            img: baseImgPath + 'Snímka27.JPG',
            video: baseVidPath + 'media11.mp4',
            cssStyle: 'position: absolute; top: 16%; left: 4%; width: 92%; height: 78%;'
        }, // 27. dia
        { type: 'image', src: baseImgPath + 'Snímka28.JPG' }, // 28. dia
        {
            type: 'mixed-grid',
            img: baseImgPath + 'Snímka29.JPG',
            sources: [baseVidPath + 'media12.mp4', baseVidPath + 'media13.mp4'],
            cssStyle: 'position: absolute; top: 2.5%; left: 1%; width: 47%; height: 86%; display: grid; grid-template-rows: repeat(2, 1fr); gap: 4%;'
        }, // 29. dia
        {
            type: 'mixed',
            img: baseImgPath + 'Snímka30.JPG',
            video: baseVidPath + 'media14.mp4',
            cssStyle: 'position: absolute; top: 18%; left: 0.3%; width: 99%; height: 80%;'
        }, // 30. dia
        {
            type: 'mixed-grid',
            img: baseImgPath + 'Snímka31.JPG',
            sources: [baseVidPath + 'media15.mp4', baseVidPath + 'media16.mp4'],
            cssStyle: 'position: absolute; top: 15%; left: 0.5%; width: 100%; height: 100%; display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.2%;'
        }, // 31. dia
        { type: 'videos', sources: [baseVidPath + 'media17.mp4'] }, // 32. dia
        { type: 'image', src: baseImgPath + 'Snímka33.JPG' } // 33. dia
    ];

    let currentIndex = 0;
    const contentContainer = document.getElementById('presContent');
    const counterElement = document.getElementById('presCounter');
    const closeBtn = document.getElementById('closePresModal');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    function stopAllVideos() {
        const videos = contentContainer.querySelectorAll('video');
        videos.forEach(v => {
            v.pause();
            v.currentTime = 0;
        });
    }

    function renderSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;

        stopAllVideos();
        contentContainer.innerHTML = '';
        counterElement.textContent = `${currentIndex + 1} / ${slides.length}`;

        const slide = slides[currentIndex];

        if (slide.type === 'image') {
            const img = document.createElement('img');
            img.src = slide.src;
            img.alt = `${currentIndex + 1}. dia`;
            contentContainer.appendChild(img);
        } else if (slide.type === 'videos') {
            const grid = document.createElement('div');
            grid.className = `pres-video-grid cols-${slide.sources.length}`;

            slide.sources.forEach((vidSrc) => {
                const video = document.createElement('video');
                video.src = vidSrc;
                video.controls = true;
                video.muted = true;
                video.autoplay = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'auto'; // Zabezpečí načítanie dát
                grid.appendChild(video);
            });

            contentContainer.appendChild(grid);
        } else if (slide.type === 'mixed') {
            // Kombinált dia konténer (háttérkép + videó rátét)
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;';

            const img = document.createElement('img');
            img.src = slide.img;
            img.alt = `${currentIndex + 1}. dia`;
            img.style.cssText = 'max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block;';

            const video = document.createElement('video');
            video.src = slide.video;
            video.controls = true;
            video.muted = true;
            video.autoplay = true;
            video.loop = true;
            video.playsInline = true;
            video.preload = 'auto'; // Zabezpečí načítanie dát
            video.style.cssText = slide.cssStyle + '; object-fit: fill;';

            wrapper.appendChild(img);
            wrapper.appendChild(video);
            contentContainer.appendChild(wrapper);
        } else if (slide.type === 'animated-image') {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position: relative; display: inline-flex; align-items: center; justify-content: center; max-width: 100%; max-height: 100%;';

            const img = document.createElement('img');
            img.src = slide.src;
            img.alt = `${currentIndex + 1}. dia`;
            img.style.cssText = 'max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block;';
            wrapper.appendChild(img);

            slide.dots.forEach(dot => {
                const el = document.createElement('span');
                el.className = 'beacon-dot';
                el.style.top = dot.top;
                el.style.left = dot.left;
                el.style.width = dot.size;
                el.style.height = dot.size;
                el.style.backgroundColor = dot.color;
                el.style.boxShadow = dot.glow;
                wrapper.appendChild(el);
            });

            contentContainer.appendChild(wrapper);
        } else if (slide.type === 'mixed-grid') {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = 'position: relative; display: inline-flex; align-items: center; justify-content: center; max-width: 100%; max-height: 100%;';

            const img = document.createElement('img');
            img.src = slide.img;
            img.alt = `${currentIndex + 1}. dia`;
            img.style.cssText = 'max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block;';

            const grid = document.createElement('div');
            grid.style.cssText = slide.cssStyle;

            slide.sources.forEach((vidSrc) => {
                const video = document.createElement('video');
                video.src = vidSrc;
                video.controls = true;
                video.muted = true;
                video.autoplay = true;
                video.loop = true;
                video.playsInline = true;
                video.preload = 'auto'; // Zabezpečí načítanie dát
                video.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 4px;';
                grid.appendChild(video);
            });

            wrapper.appendChild(img);
            wrapper.appendChild(grid);
            contentContainer.appendChild(wrapper);
        }
    }

    function openModal(e) {
        e.preventDefault();
        currentIndex = 0;
        renderSlide(currentIndex);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        stopAllVideos();
        contentContainer.innerHTML = '';
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => renderSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => renderSlide(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('is-open')) return;
        if (e.key === 'ArrowRight') renderSlide(currentIndex + 1);
        if (e.key === 'ArrowLeft') renderSlide(currentIndex - 1);
        if (e.key === 'Escape') closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});