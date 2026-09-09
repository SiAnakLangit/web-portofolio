# Portofolio — Tema Pixel/Minecraft-Inspired

Website portofolio pribadi bergaya pixel-art terinspirasi Minecraft.
Dibuat **tanpa** library 3D/WebGL apa pun — murni HTML, CSS, dan JavaScript biasa (vanilla) — supaya ringan dan pasti kompatibel dijalankan di server mana saja, termasuk server sekolah.

## Struktur file
```
index.html   -> struktur halaman (6 section + navbar)
style.css    -> semua styling & tema pixel
main.js      -> navbar active-state, scroll-reveal, parallax ringan
```

## Penting soal aset Minecraft
Semua icon, warna, bentuk, dan **karakter** di sini **orisinal buatan sendiri** (SVG/CSS), *terinspirasi* gaya visual Minecraft — bukan tekstur/aset asli yang diambil dari game. Karakter voxel di section Home (siang & malam) juga desain generik orisinal, **bukan** replika Steve atau Zombie asli (keduanya karakter berhak cipta Mojang/Microsoft). Font pixel yang dipakai (`Press Start 2P`, `VT323`) juga font gratis dari Google Fonts, bukan font resmi Minecraft.

## Fitur interaktif
- **Toggle Pagi/Malam** — klik matahari di section Home untuk beralih mode malam (bintang muncul, langit gelap, karakter berganti dari sosok voxel terang ke versi gelap bermata merah). Pilihan disimpan di browser (localStorage).
- **Kursor pixel kustom** — panah pixel di seluruh halaman, berubah jadi crosshair saat hover di tombol/link.
- **Pembatas antar-section** — garis tebal + aksen pixel di tiap pergantian section.
- **Scroll reveal** — elemen muncul dengan animasi fade+slide saat di-scroll.

## Yang masih placeholder (wajib diganti sebelum online)
| Lokasi | Ganti apa |
|---|---|
| `index.html` — `<title>`, `.home-title` | Nama asli kamu |
| `index.html` — bagian About (`.body-text`) | Cerita/bio asli |
| `index.html` — bagian Journey | Sudah diisi data asli — cek lagi kalau ada koreksi |
| `index.html` — bagian Skill (`.skill-item p`, `.hearts`) | Deskripsi & level skill asli |
| `index.html` — bagian Project (`.project-card`) | Deskripsi project kalau mau diperjelas |
| `index.html` — bagian Contact (`mailto:`, GitHub, LinkedIn, Instagram) | Email, username, dan link asli |
| Foto profil (Home `.avatar-frame`, Skill `.skill-photo`) | Saat ini masih icon placeholder — ganti dengan `<img src="assets/foto.jpg">` kalau sudah punya file fotonya |

## Cara jalankan lokal
File ini **HTML/CSS/JS biasa** (bukan ES Module), jadi sebenarnya bisa langsung dibuka dengan double-click `index.html` tanpa local server. Tapi supaya perilakunya identik dengan kondisi di server sungguhan, tetap lebih disarankan pakai local server:
```bash
python3 -m http.server 8000
```
lalu buka `http://localhost:8000`.

## Cara deploy ke VPS/server sekolah (Apache/Nginx)
1. Upload `index.html`, `style.css`, `main.js` (dan folder `assets/` kalau sudah nambah foto asli) ke document root, misal `/var/www/namadomain/`.
2. Arahkan virtual host Nginx/Apache ke folder ini.
3. Aktifkan HTTPS (certbot / Cloudflare).
4. Buka domain, cek tampilan di HP & desktop, cek Console (F12) kalau ada yang aneh.

Font (`Press Start 2P`, `VT323`, `Inter`) di-load dari Google Fonts **oleh browser pengunjung**, bukan oleh server — jadi server sekolah tidak perlu akses internet keluar untuk ini, cukup pengunjungnya saja yang perlu akses internet biasa (yang memang sudah pasti mereka punya untuk buka website-nya).

## Catatan performa
Situs ini sangat ringan (tidak ada WebGL/3D), jadi seharusnya sudah cepat di semua device tanpa perlu optimasi tambahan. Kalau nanti mau ditambah foto asli, kompres dulu (misal ke format WebP, di bawah 300KB per foto) supaya tetap ringan.
