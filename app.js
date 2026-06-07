/**
 * Client-side Application Logic for Villa Aster Residence Ronda System
 */

// ==========================================================================
// CONFIGURATION
// ==========================================================================
// PENTING: Ganti string di bawah ini dengan URL Web App Google Apps Script Anda setelah dideploy.
// Contoh: "https://script.google.com/macros/s/AKfycbz1-Z_XxxYYY.../exec"
const API_URL = "YOUR_GAS_API_URL_HERE";

// Data Mockup untuk uji coba lokal & demonstrasi jika API_URL belum dikonfigurasi
const MOCK_CONFIG = {
  status: "ok",
  mulaiRonda: "01/08/2026",
  judulHeader: "Jadwal Ronda Warga Villa Aster Residence",
  logoPaguyuban: "", // Kosongkan jika tidak ada, sistem akan menyesuaikan
  logoPerumahan: "",
  footerCopy: "Villa Aster Residence © 2026. Aman, Tertib, Rukun.",
  jumlahGroupHutangRonda: 2,
  putaranAktif: 3
};

const MOCK_JADWAL = {
  status: "ok",
  putaran: 3,
  data: [
    // GROUP 1 - HUTANG (Minggu ke-1)
    { putaran: 3, group: 1, namaGroup: "Al Aziz", jenis: "Hutang", tanggal: "01/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-02", nama: "Agus", danru: "Ya", tanggalTidakRonda: "24/05/2026", alasanTidakHadir: "Dinas Luar Kota" },
    { putaran: 3, group: 1, namaGroup: "Al Aziz", jenis: "Hutang", tanggal: "01/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-12", nama: "Budi", danru: "Tidak", tanggalTidakRonda: "24/05/2026", alasanTidakHadir: "Sakit" },
    { putaran: 3, group: 1, namaGroup: "Al Aziz", jenis: "Hutang", tanggal: "01/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Sabambu", blok: "N-02", nama: "Dedi", danru: "Tidak", tanggalTidakRonda: "31/05/2026", alasanTidakHadir: "Izin Keluarga" },
    { putaran: 3, group: 1, namaGroup: "Al Aziz", jenis: "Hutang", tanggal: "01/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-02", nama: "Hendro", danru: "Tidak", tanggalTidakRonda: "17/05/2026", alasanTidakHadir: "Tugas Ronda Tabrakan" },

    // GROUP 2 - HUTANG (Minggu ke-2)
    { putaran: 3, group: 2, namaGroup: "Al Malik", jenis: "Hutang", tanggal: "08/08/2026", titikKumpul: "Pos Balai Warga", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-05", nama: "Hendra", danru: "Ya", tanggalTidakRonda: "24/05/2026", alasanTidakHadir: "Dinas Malam" },
    { putaran: 3, group: 2, namaGroup: "Al Malik", jenis: "Hutang", tanggal: "08/08/2026", titikKumpul: "Pos Balai Warga", linkMaps: "https://maps.google.com", wilayah: "Sabambu", blok: "N-04", nama: "Samsul", danru: "Tidak", tanggalTidakRonda: "24/05/2026", alasanTidakHadir: "Sakit Demam" },
    { putaran: 3, group: 2, namaGroup: "Al Malik", jenis: "Hutang", tanggal: "08/08/2026", titikKumpul: "Pos Balai Warga", linkMaps: "https://maps.google.com", wilayah: "Al-Kautsar", blok: "K-03", nama: "Roni", danru: "Tidak", tanggalTidakRonda: "10/05/2026", alasanTidakHadir: "Luar Kota" },

    // GROUP 3 - REGULER (Minggu ke-3)
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-12", nama: "Rachman", danru: "Ya" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-07", nama: "Herman", danru: "Tidak" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Al-Kautsar", blok: "K-02", nama: "Bobby", danru: "Tidak" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Tebing Keraton", blok: "T-01", nama: "Yusuf", danru: "Tidak" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-08", nama: "Joko", danru: "Tidak" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Sabambu", blok: "N-10", nama: "Anto", danru: "Tidak" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-09", nama: "Danang", danru: "Tidak" },
    { putaran: 3, group: 3, namaGroup: "Al Quddus", jenis: "Reguler", tanggal: "15/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-15", nama: "Taufik", danru: "Tidak" },

    // GROUP 4 - REGULER (Minggu ke-4)
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-05", nama: "Rudi", danru: "Ya" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-11", nama: "Anton", danru: "Tidak" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "Al-Kautsar", blok: "K-04", nama: "Farhan", danru: "Tidak" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "Tebing Keraton", blok: "T-03", nama: "Satria", danru: "Tidak" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-17", nama: "Rian", danru: "Tidak" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "Sabambu", blok: "N-12", nama: "Fajar", danru: "Tidak" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-08", nama: "Eko", danru: "Tidak" },
    { putaran: 3, group: 4, namaGroup: "As Salam", jenis: "Reguler", tanggal: "22/08/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-10", nama: "Yudi", danru: "Tidak" },

    // GROUP 5 - REGULER (Minggu ke-5)
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Al-Kautsar", blok: "K-08", nama: "Dani", danru: "Ya" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Tebing Keraton", blok: "T-05", nama: "Guntur", danru: "Tidak" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-12", nama: "Doni", danru: "Tidak" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-15", nama: "Rahmat", danru: "Tidak" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-20", nama: "Yanto", danru: "Tidak" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Sabambu", blok: "N-15", nama: "Bagus", danru: "Tidak" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Al-Kautsar", blok: "K-10", nama: "Wawan", danru: "Tidak" },
    { putaran: 3, group: 5, namaGroup: "Al Mu'min", jenis: "Reguler", tanggal: "29/08/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Tebing Keraton", blok: "T-07", nama: "Lukman", danru: "Tidak" },

    // GROUP 6 - REGULER (Minggu ke-6 - Bulan September)
    { putaran: 3, group: 6, namaGroup: "Al Muhaimin", jenis: "Reguler", tanggal: "05/09/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-20", nama: "Irwan", danru: "Ya" },
    { putaran: 3, group: 6, namaGroup: "Al Muhaimin", jenis: "Reguler", tanggal: "05/09/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-15", nama: "Taufan", danru: "Tidak" },
    { putaran: 3, group: 6, namaGroup: "Al Muhaimin", jenis: "Reguler", tanggal: "05/09/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-25", nama: "Seno", danru: "Tidak" },
    { putaran: 3, group: 6, namaGroup: "Al Muhaimin", jenis: "Reguler", tanggal: "05/09/2026", titikKumpul: "Pos Security", linkMaps: "https://maps.google.com", wilayah: "Sabambu", blok: "N-18", nama: "Aris", danru: "Tidak" }
  ]
};

// State Aplikasi
let globalConfig = null;
let allGroups = [];
let monthsList = [];
let activeMonth = "";
let rondaTerdekatGroup = null;

// ==========================================================================
// DATE HELPERS
// ==========================================================================

/**
 * Mengubah format DD/MM/YYYY menjadi objek Date
 */
function parseDateString(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }
  return new Date(dateStr);
}

/**
 * Format tanggal ke nama hari & bulan bahasa Indonesia (misal: Sabtu, 09 Agustus 2026)
 */
function formatIndonesianDate(dateStr) {
  const date = parseDateString(dateStr);
  if (!date || isNaN(date.getTime())) return dateStr;
  
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const dayName = dayNames[date.getDay()];
  const dayNum = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayName}, ${String(dayNum).padStart(2, '0')} ${monthName} ${year}`;
}

/**
 * Dapatkan label Bulan Tahun dari format tanggal (misal: "Agustus 2026")
 */
function getMonthYearLabel(dateStr) {
  const date = parseDateString(dateStr);
  if (!date || isNaN(date.getTime())) return "";
  
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

// ==========================================================================
// LOGIC UTILITIES
// ==========================================================================

/**
 * Mengelompokkan baris-baris data dari API ke dalam grup ronda terstruktur
 */
function processRawJadwal(rawData) {
  const groupsMap = {};
  
  rawData.forEach(row => {
    const key = `${row.putaran}_${row.group}_${row.tanggal}`;
    if (!groupsMap[key]) {
      groupsMap[key] = {
        putaran: parseInt(row.putaran, 10),
        groupNumber: parseInt(row.group, 10),
        namaGroup: row.namaGroup || `Group ${row.group}`,
        jenis: row.jenis || "Reguler",
        tanggal: row.tanggal,
        titikKumpul: row.titikKumpul || "Pos Security",
        linkMaps: row.linkMaps || "",
        members: []
      };
    }
    
    groupsMap[key].members.push({
      nama: row.nama || "",
      blok: row.blok || "",
      danru: row.danru || "Tidak",
      wilayah: row.wilayah || "",
      tanggalTidakRonda: row.tanggalTidakRonda || "",
      alasanTidakHadir: row.alasanTidakHadir || ""
    });
  });
  
  // Konversi map ke array dan urutkan berdasarkan tanggal & nomor grup
  const groupsArray = Object.values(groupsMap).sort((a, b) => {
    const dateA = parseDateString(a.tanggal);
    const dateB = parseDateString(b.tanggal);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    return a.groupNumber - b.groupNumber;
  });
  
  // Urutkan anggota di setiap grup (DANRU paling atas)
  groupsArray.forEach(group => {
    group.members.sort((a, b) => {
      const isDanruA = a.danru === "Ya" ? 1 : 0;
      const isDanruB = b.danru === "Ya" ? 1 : 0;
      return isDanruB - isDanruA;
    });
  });
  
  return groupsArray;
}

/**
 * Mencari grup ronda terdekat berdasarkan tanggal hari ini
 */
function findRondaTerdekat(groups) {
  if (groups.length === 0) return null;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Filter grup yang tanggalnya hari ini atau ke depan
  const upcomingGroups = groups.filter(g => {
    const gDate = parseDateString(g.tanggal);
    return gDate && gDate.getTime() >= today.getTime();
  });
  
  if (upcomingGroups.length > 0) {
    // Karena sudah diurutkan menaik, baris pertama adalah yang terdekat ke depan
    return upcomingGroups[0];
  }
  
  // Jika semua sudah di masa lalu, ambil grup paling akhir yang terlaksana
  return groups[groups.length - 1];
}

/**
 * Menghitung selisih hari dan membuat status countdown badge
 */
function getCountdownStatus(dateStr) {
  const gDate = parseDateString(dateStr);
  if (!gDate) return { text: "", class: "past" };
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const diffTime = gDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return { text: "Hari ini!", class: "today", html: "🟢 Hari ini!" };
  } else if (diffDays > 0) {
    return { text: `${diffDays} hari lagi`, class: "upcoming", html: `🕐 ${diffDays} hari lagi` };
  } else {
    return { text: "Sudah terlaksana", class: "past", html: "✅ Sudah terlaksana" };
  }
}

// ==========================================================================
// RENDER METHODS
// ==========================================================================

/**
 * Render elemen Header & Logo berdasarkan konfigurasi
 */
function renderHeader(config) {
  document.getElementById("main-title").textContent = config.judulHeader || "Jadwal Ronda Warga";
  document.getElementById("putaran-label").textContent = `PUTARAN ${config.putaranAktif}`;
  document.getElementById("footer-text").textContent = config.footerCopy || "Villa Aster Residence";
  
  // Handle Logo
  const logoPerum = document.getElementById("logo-perumahan");
  if (config.logoPerumahan) {
    logoPerum.src = config.logoPerumahan;
    logoPerum.style.display = "block";
  } else {
    logoPerum.style.display = "none";
  }
  
  const logoPaguyuban = document.getElementById("logo-paguyuban");
  if (config.logoPaguyuban) {
    logoPaguyuban.src = config.logoPaguyuban;
    logoPaguyuban.style.display = "block";
  } else {
    logoPaguyuban.style.display = "none";
  }
}

/**
 * Menghasilkan markup HTML untuk sebuah Card Group
 */
function createCardHTML(group, isExportMode = false) {
  const countdown = getCountdownStatus(group.tanggal);
  const cardId = `group-card-${group.groupNumber}`;
  const formattedDate = formatIndonesianDate(group.tanggal);
  const mapLink = group.linkMaps ? `href="${group.linkMaps}" target="_blank" rel="noopener"` : '';
  const mapClass = group.linkMaps ? 'meta-item location-link' : 'meta-item';
  const typeBadgeClass = group.jenis.toLowerCase() === "hutang" ? "hutang" : "reguler";
  
  let memberRowsHTML = "";
  group.members.forEach(member => {
    const isDanru = member.danru === "Ya";
    const danruBadge = isDanru ? `<span class="danru-badge">DANRU</span>` : "";
    const nameText = isDanru ? `<strong>${member.nama}</strong>` : member.nama;
    
    memberRowsHTML += `
      <tr>
        <td class="col-blok">${member.blok || "-"}</td>
        <td class="col-nama">
          ${nameText} ${danruBadge}
        </td>
        <td class="col-wilayah">${member.wilayah || "-"}</td>
      </tr>
    `;
    
    // Tampilkan informasi detail jika tipe adalah Hutang dan memiliki data absen
    if (group.jenis.toLowerCase() === "hutang" && (member.tanggalTidakRonda || member.alasanTidakHadir)) {
      const reasonStr = member.alasanTidakHadir ? ` · ${member.alasanTidakHadir}` : "";
      memberRowsHTML += `
        <tr class="debt-info-row">
          <td colspan="3">
            <div class="debt-info-box">
              <span class="debt-icon">⚠️</span>
              <span>Tidak hadir: ${member.tanggalTidakRonda || "-"}${reasonStr}</span>
            </div>
          </td>
        </tr>
      `;
    }
  });
  
  return `
    <div class="card" id="${cardId}">
      <div class="card-header-main">
        <div class="group-info-wrapper">
          <div class="group-number-label">
            <span>Group ${group.groupNumber}</span>
            <span class="group-type-badge ${typeBadgeClass}">${group.jenis}</span>
          </div>
          <span class="group-name-subtitle">${group.namaGroup}</span>
        </div>
        ${!isExportMode ? `
          <div class="card-actions-wrapper export-hide">
            <button class="btn-card-action" onclick="copyCardToClipboard('${cardId}', this)" title="Salin Card Gambar">
              <svg viewBox="0 0 24 24" class="svg-icon" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
        ` : ''}
      </div>
      
      <div class="card-meta-grid">
        <div class="meta-item">
          📅 ${formattedDate}
        </div>
        <div class="meta-item">
          <span class="countdown-badge ${countdown.class}">${countdown.html}</span>
        </div>
        <a ${mapLink} class="${mapClass}">
          📍 ${group.titikKumpul}
        </a>
      </div>
      
      <div class="participants-table-wrapper">
        <table class="participants-table">
          <tbody>
            ${memberRowsHTML}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

/**
 * Render Card Ronda Terdekat di paling atas
 */
function renderRondaTerdekat(group) {
  const container = document.getElementById("ronda-terdekat-card-container");
  if (!group) {
    container.innerHTML = `<p style="color: var(--text-muted); text-align: center;">Tidak ada jadwal ronda aktif.</p>`;
    return;
  }
  
  // Buat DOM wrapper khusus ronda terdekat agar style pembedanya pas
  const cardHTML = createCardHTML(group);
  container.innerHTML = `<div class="ronda-terdekat-card">${cardHTML}</div>`;
  
  // Hilangkan tombol salin di card terdekat teratas agar fokus ke jadwal detail bawah
  const actionBtn = container.querySelector(".card-actions-wrapper");
  if (actionBtn) actionBtn.remove();
}

/**
 * Render Filter Tabs Bulan secara dinamis berdasarkan data tanggal yang ada
 */
function renderFilterBulan(groups) {
  const tabsContainer = document.getElementById("filter-bulan");
  tabsContainer.innerHTML = "";
  
  // Cari daftar bulan unik
  const monthsMap = {};
  groups.forEach(g => {
    const label = getMonthYearLabel(g.tanggal);
    if (label && !monthsMap[label]) {
      // Dapatkan date object bulan ini untuk pengurutan logis
      monthsMap[label] = parseDateString(g.tanggal);
    }
  });
  
  // Urutkan daftar bulan secara kronologis
  monthsList = Object.keys(monthsMap).sort((a, b) => {
    return monthsMap[a].getTime() - monthsMap[b].getTime();
  });
  
  if (monthsList.length === 0) return;
  
  // Pilih bulan aktif secara default: bulan yang mengandung Ronda Terdekat
  if (rondaTerdekatGroup) {
    activeMonth = getMonthYearLabel(rondaTerdekatGroup.tanggal);
  }
  
  // Jika activeMonth tidak ada di daftar bulan (karena kosong), default ke bulan pertama
  if (!activeMonth || !monthsList.includes(activeMonth)) {
    activeMonth = monthsList[0];
  }
  
  // Render tabs
  monthsList.forEach(monthLabel => {
    const button = document.createElement("button");
    button.className = `btn-filter-tab ${monthLabel === activeMonth ? 'active' : ''}`;
    button.textContent = monthLabel;
    button.addEventListener("click", () => {
      // Hapus kelas aktif di tab lain
      tabsContainer.querySelectorAll(".btn-filter-tab").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      activeMonth = monthLabel;
      renderJadwalGrid(activeMonth);
    });
    tabsContainer.appendChild(button);
  });
  
  // Tampilkan tombol ekspor bulanan karena filter bulan sudah terisi
  document.getElementById("btn-export-bulan").style.display = "inline-flex";
}

/**
 * Render Grid Jadwal berdasarkan bulan aktif
 */
function renderJadwalGrid(monthLabel) {
  const gridContainer = document.getElementById("jadwal-grid");
  gridContainer.innerHTML = "";
  
  const filteredGroups = allGroups.filter(g => getMonthYearLabel(g.tanggal) === monthLabel);
  
  if (filteredGroups.length === 0) {
    gridContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">Tidak ada jadwal di bulan ini.</p>`;
    return;
  }
  
  filteredGroups.forEach(group => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = createCardHTML(group);
    gridContainer.appendChild(tempDiv.firstElementChild);
  });
}

// ==========================================================================
// EXPORT AND SCREENSHOT FUNCTIONS
// ==========================================================================

/**
 * Menampilkan Toast Notification kustom
 */
function showToast(message) {
  const toast = document.getElementById("toast-notification");
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

/**
 * Salin Satu Card Group ke Clipboard sebagai Gambar PNG
 */
async function copyCardToClipboard(cardId, button) {
  const card = document.getElementById(cardId);
  if (!card) return;
  
  // Ganti icon ke spinner loading sementara
  const originalHTML = button.innerHTML;
  button.innerHTML = `
    <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
    </svg>
  `;
  button.disabled = true;
  
  try {
    // Clone elemen untuk merender gambar terpisah di luar screen
    const clone = card.cloneNode(true);
    clone.querySelectorAll('.export-hide').forEach(el => el.remove());
    
    // Bungkus dalam container bertema solid agar hasil rendering kontras & bersih
    const wrapper = document.createElement('div');
    wrapper.className = 'export-mode';
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '380px'; // Lebar proporsional ideal share WA
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    
    // Capture canvas resolusi tinggi
    const canvas = await html2canvas(wrapper, {
      scale: 2.5,
      backgroundColor: '#171e30',
      useCORS: true
    });
    
    // Hapus wrapper sementara
    document.body.removeChild(wrapper);
    
    // Tulis ke clipboard via blob
    canvas.toBlob(async blob => {
      if (!blob) {
        throw new Error("Gagal membuat data gambar");
      }
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        showToast("Gambar card disalin ke clipboard!");
      } catch (clipErr) {
        console.warn("Clipboard API tidak didukung browser atau diblokir. Mengunduh gambar langsung...", clipErr);
        // Fallback: Download file langsung
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ronda-group-${cardId.replace('group-card-', '')}.png`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Gambar diunduh otomatis.");
      }
    }, 'image/png');
    
  } catch (err) {
    console.error("Gagal menyalin gambar:", err);
    alert("Gagal memproses salin gambar: " + err.message);
  } finally {
    button.innerHTML = originalHTML;
    button.disabled = false;
  }
}

/**
 * Mengunduh screenshot (Bulan Aktif atau Putaran Penuh)
 */
async function downloadScreenshot(type) {
  const overlay = document.getElementById("loading-overlay");
  const textEl = overlay.querySelector(".loading-text");
  
  overlay.style.display = "flex";
  textEl.textContent = "Menyiapkan gambar ekspor...";
  
  try {
    const putaranNo = globalConfig ? globalConfig.putaranAktif : 3;
    let filename = "";
    let width = "1200px";
    
    // Buat container ekspor sementara
    const exportWrapper = document.createElement("div");
    exportWrapper.className = "export-mode";
    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-9999px";
    exportWrapper.style.top = "0";
    
    // Clone header utama
    const headerClone = document.getElementById("export-header-section").cloneNode(true);
    headerClone.querySelectorAll(".btn-action-circle").forEach(el => el.remove());
    exportWrapper.appendChild(headerClone);
    
    // Sub-title keterangan ekspor
    const subTitle = document.createElement("h2");
    subTitle.style.textAlign = "center";
    subTitle.style.margin = "1.5rem 0";
    subTitle.style.color = "#ffffff";
    subTitle.style.fontSize = "1.25rem";
    subTitle.style.textTransform = "uppercase";
    
    const gridLayout = document.createElement("div");
    
    if (type === "bulan") {
      const cleanMonthName = activeMonth.replace(/\s+/g, '-').toLowerCase();
      filename = `ronda-putaran${putaranNo}-${cleanMonthName}.png`;
      width = "900px";
      subTitle.textContent = `JADWAL RONDA - ${activeMonth}`;
      
      gridLayout.className = "export-bulan-layout";
      
      // Salin card yang tampil di bulan ini
      const activeCards = document.querySelectorAll("#jadwal-grid .card");
      if (activeCards.length === 0) {
        throw new Error("Tidak ada data jadwal untuk diekspor!");
      }
      activeCards.forEach(card => {
        const cardClone = card.cloneNode(true);
        cardClone.querySelectorAll(".export-hide").forEach(el => el.remove());
        gridLayout.appendChild(cardClone);
      });
    } else {
      filename = `ronda-putaran${putaranNo}-lengkap.png`;
      width = "1400px";
      subTitle.textContent = `JADWAL RONDA LENGKAP - PUTARAN ${putaranNo}`;
      
      gridLayout.className = "export-putaran-layout";
      
      // Render semua card untuk seluruh putaran
      if (allGroups.length === 0) {
        throw new Error("Tidak ada data jadwal lengkap untuk diekspor!");
      }
      allGroups.forEach(group => {
        const cardHTML = createCardHTML(group, true); // true = sembunyikan tombol aksi
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardHTML;
        gridLayout.appendChild(tempDiv.firstElementChild);
      });
    }
    
    exportWrapper.appendChild(subTitle);
    exportWrapper.appendChild(gridLayout);
    exportWrapper.style.width = width;
    
    document.body.appendChild(exportWrapper);
    
    // Berikan jeda sejenak untuk mematangkan render DOM
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const canvas = await html2canvas(exportWrapper, {
      scale: 2, // Resolusi 2x lipat lebih tajam
      backgroundColor: "#0b0f19",
      useCORS: true
    });
    
    document.body.removeChild(exportWrapper);
    
    // Trigger download PNG
    const imageURI = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imageURI;
    a.download = filename;
    a.click();
    
  } catch (err) {
    console.error("Gagal melakukan ekspor:", err);
    alert("Terjadi kesalahan saat mengekspor gambar: " + err.message);
  } finally {
    overlay.style.display = "none";
  }
}

// ==========================================================================
// APPLICATION INITIALIZATION
// ==========================================================================

/**
 * Ambil data dari server GAS atau fallback mockup
 */
async function loadData() {
  const loadingOverlay = document.getElementById("loading-overlay");
  const errorContainer = document.getElementById("error-container");
  const appContainer = document.getElementById("app-container");
  
  loadingOverlay.style.display = "flex";
  errorContainer.style.display = "none";
  appContainer.style.display = "none";
  
  // Periksa apakah API_URL adalah mockup/placeholder
  const isMockMode = (API_URL === "YOUR_GAS_API_URL_HERE" || API_URL.trim() === "");
  
  try {
    if (isMockMode) {
      console.warn("Berjalan dalam DEMO MODE menggunakan data mockup.");
      
      // Ambil data mock
      globalConfig = MOCK_CONFIG;
      allGroups = processRawJadwal(MOCK_JADWAL.data);
      
      // Tambahkan banner kecil info Demo
      const demoIndicator = document.createElement("div");
      demoIndicator.style.cssText = "background-color: var(--warning); color: #000; text-align: center; font-size: 0.75rem; font-weight: 700; padding: 0.25rem; position: sticky; top: 0; z-index: 9999;";
      demoIndicator.textContent = "Running in Demo Mode (Local Mockup Data). Configure API_URL in app.js for Live Integration.";
      document.body.insertBefore(demoIndicator, document.body.firstChild);
    } else {
      // Ambil Konfigurasi dari GAS API
      const configRes = await fetch(`${API_URL}?action=getKonfigurasi`);
      if (!configRes.ok) throw new Error("Gagal mengambil konfigurasi dari API");
      globalConfig = await configRes.json();
      
      if (globalConfig.status === "error") {
        throw new Error(globalConfig.message || "Server mengembalikan status error saat mengambil konfigurasi");
      }
      
      // Ambil Jadwal dari GAS API
      const jadwalRes = await fetch(`${API_URL}?action=getJadwal`);
      if (!jadwalRes.ok) throw new Error("Gagal mengambil data jadwal dari API");
      const rawJadwal = await jadwalRes.json();
      
      if (rawJadwal.status === "error") {
        throw new Error(rawJadwal.message || "Server mengembalikan status error saat mengambil jadwal");
      }
      
      allGroups = processRawJadwal(rawJadwal.data);
    }
    
    // Cari Ronda Terdekat
    rondaTerdekatGroup = findRondaTerdekat(allGroups);
    
    // RENDER SEMUA KOMPONEN
    renderHeader(globalConfig);
    renderRondaTerdekat(rondaTerdekatGroup);
    renderFilterBulan(allGroups);
    renderJadwalGrid(activeMonth);
    
    // Tampilkan App Container
    loadingOverlay.style.display = "none";
    appContainer.style.display = "block";
    
  } catch (error) {
    console.error("Gagal memuat aplikasi:", error);
    loadingOverlay.style.display = "none";
    
    document.getElementById("error-message").textContent = `Terjadi kesalahan saat memuat data: ${error.message}`;
    errorContainer.style.display = "flex";
  }
}

// ==========================================================================
// EVENT LISTENERS & WINDOW ACTIONS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Hubungkan tombol coba lagi error
  document.getElementById("btn-retry").addEventListener("click", loadData);
  
  // Hubungkan tombol ekspor bulan
  document.getElementById("btn-export-bulan").addEventListener("click", () => {
    downloadScreenshot("bulan");
  });
  
  // Hubungkan tombol ekspor satu putaran
  document.getElementById("btn-export-putaran").addEventListener("click", () => {
    downloadScreenshot("putaran");
  });
  
  // Mulai memuat data
  loadData();
});
