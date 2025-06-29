# Panduan Setup Google Sheets untuk Undangan Digital

## Langkah 1: Buat Google Sheets

1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama spreadsheet (misalnya: "Undangan Digital Database")
4. Salin ID spreadsheet dari URL:
   - URL: `https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit`
   - ID: `1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms`

## Langkah 2: Setup Sheet untuk Data Tamu

1. Di spreadsheet, buat sheet baru bernama "Guests"
2. Tambahkan header di baris pertama:
   ```
   A1: Nama
   B1: Tanggal_Dibuat
   C1: Status
   ```

## Langkah 3: Setup Sheet untuk Data Ucapan

1. Buat sheet baru bernama "Wishes"
2. Tambahkan header di baris pertama:
   ```
   A1: Nama_Tamu
   B1: Ucapan
   C1: Status
   D1: Tanggal_Dibuat
   ```

## Langkah 4: Setup Google Cloud Console

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan Google Sheets API:
   - Menu: "APIs & Services" > "Library"
   - Cari "Google Sheets API"
   - Klik dan aktifkan

## Langkah 5: Buat API Key

1. Di Google Cloud Console, buka "APIs & Services" > "Credentials"
2. Klik "Create Credentials" > "API Key"
3. Salin API Key yang dibuat
4. (Opsional) Klik "Restrict Key" untuk membatasi akses:
   - Application restrictions: "HTTP referrers"
   - API restrictions: "Restrict key" > pilih "Google Sheets API"

## Langkah 6: Konfigurasi File

1. Buka file `google-sheets-config.js`
2. Ganti nilai-nilai berikut:
   ```javascript
   const GOOGLE_SHEETS_CONFIG = {
       spreadsheetId: 'MASUKKAN_ID_SPREADSHEET_DISINI',
       apiKey: 'MASUKKAN_API_KEY_DISINI',
       guestsSheet: 'Guests',
       wishesSheet: 'Wishes'
   };
   ```

## Langkah 7: Set Permission Google Sheets

1. Buka Google Sheets Anda
2. Klik tombol "Share" (kanan atas)
3. Klik "Change to anyone with the link"
4. Set permission ke "Viewer" atau "Editor"
5. Klik "Done"

## Langkah 8: Test

1. Buka file `index.html` di browser
2. Buka Developer Tools (F12)
3. Lihat di Console untuk memastikan tidak ada error
4. Test fitur tambah tamu dan ucapan

## Struktur Data

### Sheet "Guests":
- Kolom A: Nama tamu
- Kolom B: Tanggal dibuat (ISO string)
- Kolom C: Status (opsional)

### Sheet "Wishes":
- Kolom A: Nama tamu
- Kolom B: Teks ucapan
- Kolom C: Status (pending/approved)
- Kolom D: Tanggal dibuat (ISO string)

## Troubleshooting

### Error: "API Key not configured"
- Pastikan file `google-sheets-config.js` sudah diupdate dengan API Key yang benar
- Pastikan file sudah di-include di `index.html`

### Error: "Google Sheets API not enabled"
- Pastikan Google Sheets API sudah diaktifkan di Google Cloud Console

### Error: "Access denied"
- Pastikan Google Sheets sudah di-share dengan permission yang tepat
- Pastikan API Key tidak dibatasi terlalu ketat

### Error: "Sheet not found"
- Pastikan nama sheet "Guests" dan "Wishes" sudah dibuat dengan benar
- Pastikan nama sheet di konfigurasi sesuai dengan yang ada di Google Sheets

## Keamanan

- Jangan share API Key Anda ke publik
- Gunakan restriction pada API Key untuk membatasi akses
- Monitor penggunaan API di Google Cloud Console

## Catatan

- Project ini tidak memerlukan server.js lagi
- Semua data akan disimpan di Google Sheets
- Bisa diakses langsung dari browser tanpa server
- Cocok untuk hosting static di GitHub Pages, Netlify, dll. 