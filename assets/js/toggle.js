function toggleMenu(b) { var o = document.getElementById('menu').classList.toggle('open'); b.setAttribute('aria-expanded', o) }
document.querySelectorAll('#menu a').forEach(function (a) { a.onclick = function () { document.getElementById('menu').classList.remove('open') } });
document.getElementById('yr').textContent = new Date().getFullYear();