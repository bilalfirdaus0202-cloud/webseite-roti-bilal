# 🍞 RotiKoe Bakery - Website Landing Page 1 Halaman

Website 1 halaman (single page) untuk bisnis toko roti rumahan modern (**RotiKoe Bakery**). Dibuat menggunakan **HTML, CSS, dan JavaScript murni (Vanilla)** yang dirancang responsif, interaktif, rapi, dan mudah dipahami untuk keperluan tugas sekolah/jurusan PPLG (Pengembangan Perangkat Lunak dan GIM).

---

## ✨ Fitur-Fitur Utama

1. **Desain Responsif & Estetik**:
   - Menyesuaikan tampilan di smartphone, tablet, maupun layar desktop/laptop.
   - Menggunakan tema palet warna hangat khas bakery (*golden brown, cream, warm white*).
2. **Navigasi Interaktif**:
   - Menu sticky di bagian atas dengan efek *glassmorphism* lembut.
   - Hamburger menu untuk tampilan mobile.
   - Smooth scroll ke setiap bagian (*section*).
3. **Filter Kategori Menu Dinamis**:
   - Pengunjung dapat memfilter pilihan roti: *Semua*, *Roti Manis*, *Roti Sobek*, *Pastry & Croissant*, dan *Roti Sehat*.
4. **Keranjang Belanja Interaktif (Shopping Cart Modal)**:
   - Tombol tambah roti ke keranjang dengan indikator badge jumlah barang di navigasi.
   - Tambah/kurang kuantitas barang secara *real-time*.
   - Otomatis menghitung total belanja dalam format mata uang Rupiah (`Rp`).
5. **Pesan Langsung via WhatsApp**:
   - Saat menekan tombol checkout, data belanjaan secara otomatis dirangkum dan diteruskan ke pesan WhatsApp Admin toko.
6. **Toast Notifikasi**:
   - Notifikasi pop-up elegan saat pengguna berhasil memasukkan roti ke keranjang.

---

## 📁 Struktur File

```text
tugaspplg2/
├── index.html   # Struktur halaman web (HTML5 Semantik)
├── style.css    # Gaya, warna, tipografi, dan responsivitas layout
├── script.js    # Logika interaktif: data roti, filter, keranjang, WA checkout
└── README.md    # Panduan penggunaan dan kustomisasi
```

---

## 🛠️ Cara Menjalankan Website

1. Cukup klik ganda (**double-click**) file `index.html` pada File Explorer untuk membukanya di browser apa saja (Google Chrome, Microsoft Edge, Mozilla Firefox, dll).
2. Atau jika menggunakan VS Code, kamu bisa klik kanan `index.html` lalu pilih **Open with Live Server**.

---

## ✏️ Panduan Kustomisasi Sederhana

### 1. Mengubah Nomor WhatsApp Toko
Buka file [script.js](file:///d:/ai/javascript/tugaspplg2/script.js) dan cari baris:
```javascript
const phoneNumber = "6281234567890";
```
Ganti dengan nomormu (gunakan format internasional diawali kode negara `62` tanpa tanda `+` atau `0` di depan).

### 2. Menambah atau Mengubah Roti
Buka file [script.js](file:///d:/ai/javascript/tugaspplg2/script.js) pada bagian array `products`:
```javascript
{
  id: 7,
  name: "Donat Gula Klasik",
  category: "manis",
  price: 8000,
  desc: "Donat empuk bertabur gula halus salju.",
  tag: "Murah Meriah",
  image: "URL_GAMBAR"
}
```

### 3. Mengubah Warna Tema
Buka file [style.css](file:///d:/ai/javascript/tugaspplg2/style.css) di bagian `:root` paling atas:
```css
:root {
  --primary: #c97a2e;       /* Ubah warna utama di sini */
  --primary-hover: #b0651c; /* Warna hover */
  --bg-body: #fdfaf6;       /* Warna latar belakang halaman */
}
```

---

*Selamat belajar dan sukses untuk tugas PPLG-nya!* 🚀

