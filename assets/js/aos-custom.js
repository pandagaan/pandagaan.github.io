function toggleMenu(b) { var o = document.getElementById('menu').classList.toggle('open'); b.setAttribute('aria-expanded', o) }
document.querySelectorAll('#menu a').forEach(function (a) { a.onclick = function () { document.getElementById('menu').classList.remove('open') } });
document.getElementById('yr').textContent = new Date().getFullYear();

/* ===== Animasi AOS ===== */
// setAos(selector, jenis animasi, jeda antar elemen (ms), jumlah kolom)
function setAos(sel, anim, step, cols) {
    document.querySelectorAll(sel).forEach(function (el, i) {
        el.setAttribute('data-aos', anim);
        if (step) el.setAttribute('data-aos-delay', (i % (cols || 3)) * step);
    });
}

setAos('section h2, .sub, .more', 'fade-up');     // judul tiap section
setAos('.card', 'fade-up', 120, 3);               // kartu proyek, bergantian per kolom
setAos('.skills > div', 'fade-up', 100, 4);
setAos('.steps li', 'fade-up', 120, 4);
setAos('.contact', 'zoom-in');

AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,        // animasi hanya sekali, tidak berulang saat scroll naik
    offset: 80,
    disable: function () { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
});
window.addEventListener('load', function () { AOS.refresh(); });

// Supaya efek hover kartu tetap cepat setelah animasi masuk selesai
document.addEventListener('aos:in', function (e) {
    if (e.detail.classList.contains('card')) {
        setTimeout(function () { e.detail.removeAttribute('data-aos'); }, 1200);
    }
});