// Ganti dengan nomor WhatsApp pemilik usaha (format 62)
const NOMOR_WA_PEMILIK = "6282118267902"; 

let cart = [];

function addToCart(namaProduk, harga) {
    // Cek apakah item sudah ada di keranjang
    const existingIndex = cart.findIndex(item => item.namaProduk === namaProduk);
    
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ namaProduk, harga, qty: 1 });
    }
    
    updateCartUI();
    alert(`"${namaProduk}" telah ditambahkan ke keranjang belanja.`);
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    cartItemsContainer.innerHTML = '';
    let totalHarga = 0;
    let totalQty = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Keranjang belanja Anda masih kosong.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemTotal = item.harga * item.qty;
            totalHarga += itemTotal;
            totalQty += item.qty;

            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <div>
                    <strong>${item.namaProduk}</strong><br>
                    <small>${item.qty} x ${item.harga > 0 ? 'Rp' + item.harga.toLocaleString('id-ID') : 'Nego'}</small>
                </div>
                <div>
                    <span>${item.harga > 0 ? 'Rp' + itemTotal.toLocaleString('id-ID') : 'Nego'}</span>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; margin-left:8px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(row);
        });
    }

    cartCount.textContent = totalQty;
    cartTotal.textContent = 'Rp' + totalHarga.toLocaleString('id-ID');
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function sendToWhatsApp(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Keranjang belanja Anda masih kosong!");
        return;
    }

    const nama = document.getElementById('nama').value;
    const hp = document.getElementById('hp').value;
    const alamat = document.getElementById('alamat').value;
    const catatan = document.getElementById('catatan').value || "Tidak ada";

    let rincianPesanan = "";
    let totalHarga = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.harga * item.qty;
        totalHarga += itemTotal;
        const hargaText = item.harga > 0 ? `Rp${itemTotal.toLocaleString('id-ID')}` : "Nego";
        rincianPesanan += `${index + 1}. ${item.namaProduk} (${item.qty} Qty) = ${hargaText}\n`;
    });

    const totalText = totalHarga > 0 ? `Rp${totalHarga.toLocaleString('id-ID')}` : "Menunggu Konfirmasi Nego";

    // Format Pesan Otomatis WhatsApp
    const message = `*PEMESANAN LELE KONSUMSI - WEBSITE LELE BALAP GIRINATA*\n\n` +
                    `*Data Pemesan:*\n` +
                    `• Nama: ${nama}\n` +
                    `• No. HP/WA: ${hp}\n` +
                    `• Alamat Pengiriman: ${alamat}\n` +
                    `• Catatan: ${catatan}\n\n` +
                    `*Rincian Pesanan:*\n${rincianPesanan}\n` +
                    `*Total Estimasi:* ${totalText}\n\n` +
                    `Mohon dapat dikonfirmasi ketersediaan stok dan biaya pengirimannya. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${NOMOR_WA_PEMILIK}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
}

/// ================= TOGGLE HAMBURGER MENU =================
document.addEventListener("DOMContentLoaded", function () {
    const hamburgerBtn = document.getElementById("hamburger-btn") || document.querySelector(".hamburger");
    const navMenu = document.getElementById("nav-menu") || document.querySelector(".nav-links");

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle("active");
        });

        // Menutup menu saat link diklik
        const links = navMenu.querySelectorAll("a");
        links.forEach(function (link) {
            link.addEventListener("click", function () {
                navMenu.classList.remove("active");
            });
        });
    }
});