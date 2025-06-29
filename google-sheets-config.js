// Google Sheets Configuration
// Ganti nilai-nilai di bawah ini dengan konfigurasi Google Sheets Anda

const GOOGLE_SHEETS_CONFIG = {
    // ID Google Sheets - ambil dari URL Google Sheets
    // Contoh: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
    // ID = 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
    spreadsheetId: '1xfZkCaSVQjbGF6Zb5SBBapb0PiqOSzjKZ',
    
    // API Key Google Sheets - dapatkan dari Google Cloud Console
    apiKey: 'AIzaSyAP0eq1wy2SclQafKvQwMdc0zpITjpvepM',
    
    // Nama sheet untuk data tamu
    guestsSheet: 'Guests',
    
    // Nama sheet untuk data ucapan
    wishesSheet: 'Wishes'
};

// Export untuk digunakan di script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GOOGLE_SHEETS_CONFIG;
} else {
    window.GOOGLE_SHEETS_CONFIG = GOOGLE_SHEETS_CONFIG;
} 