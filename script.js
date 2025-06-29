// Loading Animation Functions
function startLoadingAnimation() {
    const loadingScreen = document.getElementById('loadingScreen');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random progress between 5-20%
        if (progress > 100) progress = 100;
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.floor(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    // Trigger confetti when loading completes
                    if (window.confetti) {
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                }, 500);
            }, 500);
        }
    }, 200);
}

// Start loading animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    startLoadingAnimation();
    
    // Setup wish form
    const wishForm = document.getElementById('wishForm');
    const wishOverlayLoading = document.getElementById('wishOverlayLoading');
    const wishBtn = wishForm ? wishForm.querySelector('.wish-btn') : null;
    if (wishForm) {
        wishForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const name = document.getElementById('wishName').value.trim();
            const text = document.getElementById('wishText').value.trim();
            const status = wishForm.querySelector('input[name="status"]:checked')?.value;
            if (!name || !text || !status) {
                alert('Mohon lengkapi semua data');
                return;
            }
            // Tampilkan overlay loading dan disable tombol
            if (wishOverlayLoading) wishOverlayLoading.style.display = 'flex';
            if (wishBtn) wishBtn.disabled = true;
            try {
                await addWish(name, text, status);
                await renderWishes();
                document.getElementById('wishText').value = '';
                wishForm.querySelectorAll('input[name="status"]').forEach(radio => radio.checked = false);
                setTimeout(() => {
                    alert('Ucapan berhasil dikirim!');
                }, 100);
            } finally {
                // Sembunyikan overlay loading dan enable tombol
                if (wishOverlayLoading) wishOverlayLoading.style.display = 'none';
                if (wishBtn) wishBtn.disabled = false;
            }
        });
    }
    
    // Setup music button
    updateMusicButton();
});

// Konfigurasi JSONBin.io
const JSONBIN_API_KEY = '$2a$10$VTEE8vFrxTmOFh/FVFr6kOb221/SZ1YixE5vDm15QUB2ONA2cDDZ6';
const JSONBIN_BIN_ID = '6861a0518561e97a502e6263';
const JSONBIN_URL = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;

// Ambil data dari JSONBin.io
async function getData() {
    const res = await fetch(JSONBIN_URL, {
        headers: { 'X-Master-Key': JSONBIN_API_KEY }
    });
    const json = await res.json();
    return json.record; // {guests:[], wishes:[]}
}

// Simpan data ke JSONBin.io
async function saveData(newData) {
    await fetch(JSONBIN_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_API_KEY
        },
        body: JSON.stringify(newData)
    });
}

// Tambah tamu
async function addGuest(name) {
    const data = await getData();
    data.guests = data.guests || [];
    data.guests.push({ name, createdAt: new Date().toISOString() });
    await saveData(data);
}

// Ambil daftar tamu
async function getGuests() {
    const data = await getData();
    return (data.guests || []).map((g, i) => ({ id: i + 1, ...g }));
}

// Tambah ucapan
async function addWish(name, text, status) {
    const data = await getData();
    data.wishes = data.wishes || [];
    data.wishes.push({ name, text, status, createdAt: new Date().toISOString() });
    await saveData(data);
}

// Ambil daftar ucapan
async function getWishes() {
    const data = await getData();
    return (data.wishes || []).map((w, i) => ({ id: i + 1, ...w }));
}

// Nama tamu otomatis ke undangan dan form
function setGuestName(name) {
    document.getElementById('invitationName').textContent = name;
    document.getElementById('wishName').value = name;
}

// Countdown Timer ke 5 Juli 2025 19:00 WIB
function startCountdown() {
    const eventDate = new Date('2025-07-05T19:00:00+07:00');
    function updateCountdown() {
        const now = new Date();
        let diff = eventDate - now;
        if (diff < 0) diff = 0;
        const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
        const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Render wishes dari JSONBin.io
async function renderWishes() {
    const wishList = document.getElementById('wishList');
    const wishes = await getWishes();
    wishList.innerHTML = wishes.map(w => `
        <div class="wish-item">
            <div class="wish-text">${w.text}</div>
            <div class="wish-meta"><span class="wish-name">${w.name}</span> &middot; <span class="wish-status-${w.status === 'Hadir' ? 'hadir' : 'tidak'}">${w.status}</span></div>
            <div class="wish-date">${new Date(w.createdAt).toLocaleString('id-ID', { 
                day: '2-digit', 
                month: '2-digit', 
                year: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
            })}</div>
        </div>
    `).join('');
}

// Event Listeners
const landing = document.getElementById('landing');
const invitation = document.getElementById('invitation');
const openBtn = document.getElementById('openInvitation');
const guestNameInput = document.getElementById('guestName');
openBtn.addEventListener('click', async function() {
    const guestName = guestNameInput.value.trim();
    if (!guestName) {
        guestNameInput.focus();
        guestNameInput.style.border = '2px solid #ff1493';
        return;
    }
    await addGuest(guestName);
    landing.style.display = 'none';
    invitation.style.display = 'flex';
    if (window.confetti) {
        confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 }
        });
    }
    setGuestName(guestName);
    startCountdown();
    renderWishes();
    localStorage.setItem('guestName', guestName);
});

// Fungsi untuk setup gallery images
function setupGalleryImages() {
    const galleryImages = [
        { src: 'img/Tia.jpg', alt: 'Tia' },
        // Tambahkan gambar lain di sini
    ];
    const galleryContainer = document.querySelector('.gallery-grid');
    if (galleryContainer) {
        galleryImages.forEach(img => {
            const imgElement = document.createElement('img');
            imgElement.src = img.src;
            imgElement.alt = img.alt;
            imgElement.onclick = () => showImageModal(img.src, img.alt);
            galleryContainer.appendChild(imgElement);
        });
    }
}

// Fungsi untuk menampilkan modal gambar
function showImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    modal.style.display = 'flex';
    modalImg.src = src;
    modalCaption.textContent = alt;
    modal.onclick = function() {
        modal.style.display = 'none';
    };
}

// --- Musik Play/Pause ---
const audio = document.getElementById('backgroundMusic');
const musicBtn = document.getElementById('musicPlayerBtn');

function updateMusicButton() {
  if (audio.paused) {
    musicBtn.classList.remove('playing');
    musicBtn.classList.add('paused');
  } else {
    musicBtn.classList.add('playing');
    musicBtn.classList.remove('paused');
  }
}

musicBtn.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updateMusicButton();
});

audio.addEventListener('play', updateMusicButton);
audio.addEventListener('pause', updateMusicButton);

// Export functions for use in HTML
window.addGuest = addGuest;
window.getGuests = getGuests;
window.addWish = addWish;
window.getWishes = getWishes;
