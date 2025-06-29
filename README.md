# 🎉 Undangan Digital Ulang Tahun

Undangan digital yang modern dan interaktif dengan fitur musik, animasi, dan database Google Sheets.

## ✨ Fitur

- 🎵 **Musik Autoplay** - Musik otomatis diputar dengan icon CD yang berputar
- 🎨 **Desain Modern** - Tampilan yang elegan dan responsif
- 📱 **Mobile Friendly** - Optimized untuk semua ukuran layar
- 📊 **Database Google Sheets** - Data tamu dan ucapan tersimpan di Google Sheets
- 🎊 **Animasi Interaktif** - Efek visual yang menarik
- ⏰ **Countdown Timer** - Hitung mundur ke acara
- 📸 **Gallery** - Galeri foto yang bisa dikustomisasi

## 🚀 Cara Menjalankan

1. **Setup Google Sheets** (lihat `GOOGLE_SHEETS_SETUP.md`)
2. **Konfigurasi** - Update file `google-sheets-config.js`
3. **Buka** - Buka file `index.html` di browser

## 📁 Struktur File

```
Undangan/
├── index.html              # Halaman utama
├── style.css               # Styling CSS
├── script.js               # JavaScript utama
├── google-sheets-config.js # Konfigurasi Google Sheets
├── music-config.js         # Konfigurasi musik
├── audio/
│   └── musik.mp3          # File musik
├── img/
│   └── Tia.jpg            # Foto utama
└── GOOGLE_SHEETS_SETUP.md # Panduan setup Google Sheets
```

## 🎵 Konfigurasi Musik

Edit file `music-config.js`:

```javascript
const MUSIC_CONFIG = {
    type: 'local',           // 'youtube', 'url', atau 'local'
    source: 'audio/musik.mp3', // URL YouTube, URL file, atau path file lokal
    autoplay: true,
    volume: 0.5
};
```

## 📊 Database Google Sheets

Project menggunakan Google Sheets sebagai database:
- **Sheet "Guests"** - Data tamu
- **Sheet "Wishes"** - Data ucapan dan doa

## 🎨 Kustomisasi

### Mengganti Foto
- Ganti file `img/Tia.jpg` dengan foto Anda
- Update path di `index.html`

### Mengganti Musik
- Ganti file `audio/musik.mp3` dengan musik Anda
- Atau gunakan URL YouTube di `music-config.js`

### Mengubah Warna
- Edit variabel CSS di `style.css`
- Warna utama: `#ff69b4` (pink)

## 🌐 Hosting

Project ini bisa di-host di:
- GitHub Pages
- Netlify
- Vercel
- Atau hosting static lainnya

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔧 Troubleshooting

### Musik tidak autoplay
- Browser modern memblokir autoplay
- User harus klik dulu untuk mulai musik
- Icon CD akan menunjukkan status musik

### Google Sheets error
- Pastikan API Key sudah benar
- Pastikan Google Sheets sudah di-share
- Lihat `GOOGLE_SHEETS_SETUP.md` untuk detail

## 📄 License

Project ini dibuat untuk keperluan pribadi. Silakan modifikasi sesuai kebutuhan.

## 🤝 Kontribusi

Silakan buat issue atau pull request untuk perbaikan dan fitur baru.

---

**Selamat menggunakan undangan digital! 🎉** # undangan-ultah
