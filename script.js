/**
 * ========================================================
 * ROTIKOE BAKERY - JAVASCRIPT (script.js)
 * Interaktif, rapi, dan mudah dipahami untuk tugas PPLG
 * ========================================================
 */

// 1. DATA PRODUK ROTI (Bisa kamu tambah/ubah sesuka hati)
const products = [
  {
    id: 1,
    name: "Roti Sobek Cokelat Lumer",
    category: "sobek",
    price: 18000,
    desc: "Roti sobek super empuk isi lelehan pasta cokelat Belgia manis gurih.",
    tag: "Terlaris",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Butter Croissant Klasik",
    category: "pastry",
    price: 15000,
    desc: "Croissant berlapis renyah di luar dan lembut di dalam dengan aroma mentega Prancis.",
    tag: "Chef Pick",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Roti Keju Manis Spesial",
    category: "manis",
    price: 12000,
    desc: "Taburan keju cheddar melimpah dengan isian cream cheese yang gurih manis.",
    tag: "Favorit",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Roti Tawar Gandum Sehat",
    category: "sehat",
    price: 22000,
    desc: "Terbuat dari 100% biji gandum utuh, kaya serat, cocok untuk menu sarapan & diet.",
    tag: "Sehat",
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Cinnamon Roll Glaze",
    category: "pastry",
    price: 16000,
    desc: "Roti gulung harum kayu manis dengan topping vanilla glaze yang lumer di lidah.",
    tag: "Baru",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Roti Abon Sapi Pedas Gurih",
    category: "manis",
    price: 14000,
    desc: "Roti lembut dilapisi mayonnaise spesial dan taburan abon sapi pilihan yang melimpah.",
    tag: "Best Seller",
    image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=600&q=80"
  }
];

// 2. STATE APLIKASI (Data keranjang belanja)
let cart = [];

// 3. ELEMEN DOM (Document Object Model)
const menuGrid = document.getElementById("menuGrid");
const filterButtons = document.querySelectorAll(".filter-btn");

// Elemen Keranjang
const cartOverlay = document.getElementById("cartOverlay");
const openCartBtn = document.getElementById("openCartBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsList = document.getElementById("cartItemsList");
const cartBadge = document.getElementById("cartBadge");
const cartTotalPrice = document.getElementById("cartTotalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

// Elemen Navigasi Mobile
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

// Elemen Toast
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

// ========================================================
// 4. FUNGSI PEMBANTU (HELPER)
// ========================================================

/**
 * Format angka ke mata uang Rupiah (contoh: 15000 -> Rp 15.000)
 */
function formatRupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
}

/**
 * Menampilkan pesan toast notifikasi sementara
 */
let toastTimeout;
function showToast(message) {
  toastMessage.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ========================================================
// 5. FUNGSI RENDER MENU ROTI
// ========================================================

/**
 * Merender daftar roti berdasarkan filter kategori
 */
function renderProducts(category = "semua") {
  menuGrid.innerHTML = ""; // Bersihkan tampilan sebelumnya

  // Saring produk sesuai kategori
  const filteredProducts = category === "semua" 
    ? products 
    : products.filter(item => item.category === category);

  // Buat elemen kartu roti
  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <div class="menu-img-wrap">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="menu-badge">${product.tag}</span>
      </div>
      <div class="menu-content">
        <h3 class="menu-title">${product.name}</h3>
        <p class="menu-desc">${product.desc}</p>
        <div class="menu-footer">
          <span class="menu-price">${formatRupiah(product.price)}</span>
          <button class="add-cart-btn" onclick="addToCart(${product.id})" title="Tambah ke keranjang" aria-label="Tambah ${product.name}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

// Pasang event listener untuk tombol filter kategori
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Ubah kelas active
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const category = button.getAttribute("data-category");
    renderProducts(category);
  });
});

// ========================================================
// 6. FUNGSI KERANJANG BELANJA (CART)
// ========================================================

/**
 * Menambahkan item roti ke dalam keranjang
 */
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  updateCartUI();
  showToast(`${product.name} ditambahkan ke keranjang!`);
}

/**
 * Mengubah jumlah (quantity) item dalam keranjang (+1 atau -1)
 */
function changeQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  cart[itemIndex].qty += delta;

  // Jika jumlah 0, hapus dari keranjang
  if (cart[itemIndex].qty <= 0) {
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
}

/**
 * Memperbarui tampilan keranjang, badge hitungan, dan total harga
 */
function updateCartUI() {
  // Hitung total item & total biaya
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  // Update badge jumlah di header
  cartBadge.textContent = totalItems;

  // Update teks total harga
  cartTotalPrice.textContent = formatRupiah(totalPrice);

  // Render daftar item di modal keranjang
  if (cart.length === 0) {
    cartItemsList.innerHTML = `
      <div class="cart-empty-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <p>Keranjang belanja masih kosong.</p>
        <small>Yuk pilih roti lezat favoritmu!</small>
      </div>
    `;
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.5";
    checkoutBtn.style.cursor = "not-allowed";
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";

    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.name}</h4>
          <span class="cart-item-price">${formatRupiah(item.price)}</span>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)" aria-label="Kurangi jumlah">-</button>
          <span class="qty-number">${item.qty}</span>
          <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)" aria-label="Tambah jumlah">+</button>
        </div>
      </div>
    `).join("");
  }
}

// Buka modal keranjang
openCartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("active");
});

// Tutup modal keranjang (klik tombol silang atau area luar)
closeCartBtn.addEventListener("click", () => {
  cartOverlay.classList.remove("active");
});

cartOverlay.addEventListener("click", (e) => {
  if (e.target === cartOverlay) {
    cartOverlay.classList.remove("active");
  }
});

// ========================================================
// 7. FITUR CHECKOUT KE WHATSAPP
// ========================================================
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) return;

  // Nomor WhatsApp Toko Roti (Bisa diganti dengan nomormu)
  const phoneNumber = "6281234567890";

  // Susun format pesan pesanan
  let messageText = "Halo RotiKoe Bakery! 🍞\nSaya mau pesan roti dengan rincian berikut:\n\n";

  cart.forEach((item, index) => {
    const subtotal = item.price * item.qty;
    messageText += `${index + 1}. ${item.name} (${item.qty}x) = ${formatRupiah(subtotal)}\n`;
  });

  const grandTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  messageText += `\n*Total Tagihan:* ${formatRupiah(grandTotal)}\n`;
  messageText += `\nMohon informasi ongkir dan ketersediaannya ya. Terima kasih!`;

  // Encode URL agar aman dikirim ke link WhatsApp
  const encodedMessage = encodeURIComponent(messageText);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  // Buka tab baru ke WhatsApp
  window.open(waUrl, "_blank");
});

// ========================================================
// 8. RESPONSIF NAVIGASI MOBILE (HAMBURGER MENU)
// ========================================================
hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  const icon = hamburgerBtn.querySelector("i");
  if (navMenu.classList.contains("open")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Tutup menu saat salah satu link diklik
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    const icon = hamburgerBtn.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }

    // Aktifkan indikator menu
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// ========================================================
// 9. INISIALISASI SAAT HALAMAN DIBUKA
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(); // Tampilkan semua produk pertama kali
  updateCartUI();   // Set tampilan awal keranjang (kosong)
});

