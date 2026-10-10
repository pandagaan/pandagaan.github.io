/* ===== Ganti bahasa dengan Google Translate ===== */
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'id',
        includedLanguages: 'id,en',   // tambah bahasa lain di sini, contoh: 'id,en,ar,ja'
        autoDisplay: false
    }, 'google_translate_element');
}

function getLang() {
    var m = document.cookie.match(/googtrans=\/id\/(\w+)/);
    return m ? m[1] : 'id';
}

function setLang(lang) {
    var host = location.hostname;
    if (lang === 'id') {
        var past = 'googtrans=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
        document.cookie = past;
        document.cookie = past + ';domain=' + host;
    } else {
        var val = 'googtrans=/id/' + lang + ';path=/';
        document.cookie = val;
        document.cookie = val + ';domain=' + host;
    }
    location.reload();
}

document.querySelectorAll('.lang button').forEach(function (b) {
    b.classList.toggle('on', b.dataset.lang === getLang());
    b.onclick = function () { setLang(b.dataset.lang); };
});

var gt = document.createElement('script');
gt.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
document.body.appendChild(gt);


/* ===== Efek mengetik di judul hero ===== */
var PHRASES = {
    id: [
        'Kami mengubah ide menjadi solusi teknologi nyata.',
        'Software yang dirancang untuk menyelesaikan masalah Anda.',
        'Dari aplikasi web hingga mobile, kami siap membantu.',
        'Digitalisasi bisnis dimulai dari solusi yang tepat.',
        'Teknologi yang mempermudah pekerjaan dan mendorong pertumbuhan.',
        'Sistem yang dirancang sesuai kebutuhan Anda.',
        'Otomatisasi proses kerja untuk efisiensi yang lebih baik.',
        'Menghadirkan inovasi digital untuk bisnis dan instansi.',
        'Setiap tantangan punya solusi teknologi.',
        'Punya ide? Mari wujudkan bersama Pandaga.'
    ],

    en: [
        'We turn ideas into real technology solutions.',
        'Software designed to solve your challenges.',
        'From web applications to mobile apps, we are here to help.',
        'Business digitalization starts with the right solution.',
        'Technology that simplifies work and drives growth.',
        'Systems tailored to your specific needs.',
        'Automate workflows for greater efficiency.',
        'Delivering digital innovation for businesses and institutions.',
        'Every challenge has a technology solution.',
        'Have an idea? Let’s build it with Pandaga.'
    ]

};

(function () {
    var el = document.getElementById('typed');
    if (!el) return;

    var lang = (typeof getLang === 'function') ? getLang() : 'id';
    var list = PHRASES[lang] || PHRASES.id;

    // Pengunjung yang mematikan animasi: tampilkan kalimat pertama saja
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.textContent = list[0];
        return;
    }

    var i = 0, j = 0, deleting = false;

    function tick() {
        var full = list[i], delay;
        if (!deleting) {
            j++;
            el.textContent = full.slice(0, j);
            if (j === full.length) { deleting = true; delay = 2200; }   // jeda setelah selesai mengetik
            else delay = 60;                                              // kecepatan mengetik
        } else {
            j--;
            el.textContent = full.slice(0, j);
            if (j === 0) { deleting = false; i = (i + 1) % list.length; delay = 400; }
            else delay = 28;                                              // kecepatan menghapus
        }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 600);
})();