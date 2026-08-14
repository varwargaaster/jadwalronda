/**
 * Client-side Application Logic for Villa Aster Residence Ronda System
 */

// ==========================================================================
// CONFIGURATION
// ==========================================================================
// PENTING: Ganti string di bawah ini dengan URL Web App Google Apps Script Anda setelah dideploy.
// Contoh: "https://script.google.com/macros/s/AKfycbz1-Z_XxxYYY.../exec"
const API_URL = "https://script.google.com/macros/s/AKfycbz9u7Ac0q4mV16VC68SDCX03mfylGpXZiU6jr7ASMzQc4HSOtcQcOSer3DS_08YXBpx/exec";

// Data Mockup untuk uji coba lokal & demonstrasi jika API_URL belum dikonfigurasi
const MOCK_CONFIG = {
  status: "ok",
  mulaiRonda: "01/05/2026",
  judulHeader: "Jadwal Ronda Warga Villa Aster Residence",
  logoPaguyuban: "", 
  logoPerumahan: "",
  footerCopy: "Villa Aster Residence © 2026. Halaman portal transparansi jadwal ronda malam dan kontribusi warga Villa Aster Residence.",
  jumlahGroupHutangRonda: 2,
  putaranAktif: 2
};

const MOCK_JADWAL = {
  status: "ok",
  putaran: 2,
  data: [
    // GROUP 1 - HUTANG (Mei)
    { putaran: 2, group: 1, namaGroup: "Al Ghaffaar", jenis: "Hutang", tanggal: "02/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-02", nama: "Agus", danru: "Ya", tanggalTidakRonda: "24/02/2026", alasanTidakHadir: "Sakit Demam" },
    { putaran: 2, group: 1, namaGroup: "Al Ghaffaar", jenis: "Hutang", tanggal: "02/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-05", nama: "Budi", danru: "Tidak", tanggalTidakRonda: "24/02/2026", alasanTidakHadir: "Dinas Luar Kota" },
    { putaran: 2, group: 1, namaGroup: "Al Ghaffaar", jenis: "Hutang", tanggal: "02/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "B-03", nama: "Dedi", danru: "Tidak", tanggalTidakRonda: "24/02/2026", alasanTidakHadir: "Izin Keluarga" },

    // GROUP 2 - HUTANG (Mei)
    { putaran: 2, group: 2, namaGroup: "Al Qahhaar", jenis: "Hutang", tanggal: "09/05/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-05", nama: "Hendra", danru: "Ya", tanggalTidakRonda: "10/02/2026", alasanTidakHadir: "Tugas Shift Malam" },
    { putaran: 2, group: 2, namaGroup: "Al Qahhaar", jenis: "Hutang", tanggal: "09/05/2026", titikKumpul: "Pos Barat", linkMaps: "https://maps.google.com", wilayah: "CRT", blok: "C-12", nama: "Samsul", danru: "Tidak", tanggalTidakRonda: "10/02/2026", alasanTidakHadir: "Sakit Flu" },

    // GROUP 3 - REGULER (Mei - Wilayah: Lurah)
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-02", nama: "Pak Agus", danru: "Ya" },
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-05", nama: "Pak Budi", danru: "Tidak" },
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-08", nama: "Pak Joko", danru: "Tidak" },
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "A-10", nama: "Pak Yudi", danru: "Tidak" },
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "B-03", nama: "Pak Dedi", danru: "Tidak" },
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "B-07", nama: "Pak Hendri", danru: "Tidak" },
    { putaran: 2, group: 3, namaGroup: "Al 'Aliim", jenis: "Reguler", tanggal: "16/05/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "Lurah", blok: "C-01", nama: "Pak Anto", danru: "Tidak" },

    // GROUP 7 - REGULER (Juni - Ronda Terdekat di Mockup - Wilayah: V-Power)
    { putaran: 2, group: 7, namaGroup: "Ar Raafi'", jenis: "Reguler", tanggal: "13/06/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-05", nama: "Pak Rachman", danru: "Ya" },
    { putaran: 2, group: 7, namaGroup: "Ar Raafi'", jenis: "Reguler", tanggal: "13/06/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-12", nama: "Pak Hendra", danru: "Tidak" },
    { putaran: 2, group: 7, namaGroup: "Ar Raafi'", jenis: "Reguler", tanggal: "13/06/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-15", nama: "Pak Taufik", danru: "Tidak" },
    { putaran: 2, group: 7, namaGroup: "Ar Raafi'", jenis: "Reguler", tanggal: "13/06/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "J-17", nama: "Pak Rian", danru: "Tidak" },
    { putaran: 2, group: 7, namaGroup: "Ar Raafi'", jenis: "Reguler", tanggal: "13/06/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "K-04", nama: "Pak Farhan", danru: "Tidak" },
    { putaran: 2, group: 7, namaGroup: "Ar Raafi'", jenis: "Reguler", tanggal: "13/06/2026", titikKumpul: "Masjid Ar Ridho", linkMaps: "https://maps.google.com", wilayah: "V-Power", blok: "K-08", nama: "Pak Bambang", danru: "Tidak" }
  ]
};

// State Aplikasi
let globalConfig = null;
let allGroups = [];
let monthsList = [];
let activeMonth = "";
let rondaTerdekatGroup = null;

// ==========================================================================
// DATE HELPERS (Asia/Jakarta Normalized)
// ==========================================================================

function getJakartaToday() {
  const now = new Date();
  try {
    const jakartaFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    const parts = jakartaFormatter.formatToParts(now);
    const year = parseInt(parts.find(p => p.type === 'year').value, 10);
    const month = parseInt(parts.find(p => p.type === 'month').value, 10) - 1;
    const day = parseInt(parts.find(p => p.type === 'day').value, 10);
    return new Date(year, month, day, 0, 0, 0, 0);
  } catch (e) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }
}

function parseDateString(dateStr) {
  if (!dateStr) return null;
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }
  return new Date(dateStr);
}

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
  
  return `${dayName}, ${dayNum} ${monthName} ${year}`;
}

function formatIndonesianDateWithoutDay(dateStr) {
  const date = parseDateString(dateStr);
  if (!date || isNaN(date.getTime())) return dateStr;
  
  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  
  const dayNum = date.getDate();
  const monthName = monthNames[date.getMonth()];
  const year = date.getFullYear();
  
  return `${dayNum} ${monthName} ${year}`;
}

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

function processRawJadwal(rawData) {
  const groupsMap = {};
  
  rawData.forEach(row => {
    const key = `${row.putaran}_${row.group}_${row.tanggal}`;
    if (!groupsMap[key]) {
      groupsMap[key] = {
        putaran: parseInt(row.putaran, 10),
        groupNumber: parseInt(row.group, 10),
        namaGroup: row.namaGroup || `Grup ${row.group}`,
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
      alasanTidakHadir: row.alasanTidakHadir || "",
      debtSequence: row.debtSequence,
      debtSequenceLabel: row.debtSequenceLabel
    });
  });
  
  const groupsArray = Object.values(groupsMap).sort((a, b) => {
    const dateA = parseDateString(a.tanggal);
    const dateB = parseDateString(b.tanggal);
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    return a.groupNumber - b.groupNumber;
  });
  
  groupsArray.forEach(group => {
    group.members.sort((a, b) => {
      const isDanruA = a.danru === "Ya" ? 1 : 0;
      const isDanruB = b.danru === "Ya" ? 1 : 0;
      return isDanruB - isDanruA;
    });
  });
  
  return groupsArray;
}

function findRondaTerdekat(groups) {
  if (groups.length === 0) return null;
  
  const today = getJakartaToday();
  
  const upcomingGroups = groups.filter(g => {
    const gDate = parseDateString(g.tanggal);
    return gDate && gDate.getTime() >= today.getTime();
  });
  
  if (upcomingGroups.length > 0) {
    return upcomingGroups[0];
  }
  
  return groups[groups.length - 1];
}

function getCountdownStatus(dateStr) {
  const gDate = parseDateString(dateStr);
  if (!gDate) return { text: "", class: "past", html: "" };
  
  const today = getJakartaToday();
  
  const diffTime = gDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return { text: "Hari ini!", class: "today", html: "🟢 Hari ini!" };
  } else if (diffDays > 0) {
    return { text: `Sisa ${diffDays} Hari Lagi`, class: "upcoming", html: `🕐 Sisa ${diffDays} Hari Lagi` };
  } else {
    const pastDays = Math.abs(diffDays);
    return { text: `Ronda sudah terlaksana ${pastDays} hari lalu`, class: "past", html: `✔ Ronda sudah terlaksana ${pastDays} hari lalu` };
  }
}

// ==========================================================================
// RENDER METHODS
// ==========================================================================

function renderHeader(config) {
  document.getElementById("main-title").textContent = config.judulHeader || "Jadwal Ronda Warga Villa Aster Residence";
  document.getElementById("putaran-label").textContent = `PUTARAN ${config.putaranAktif}`;
  document.getElementById("footer-text").textContent = config.footerCopy || "Villa Aster Residence";
  
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
 * Render Stats Banner secara dinamis
 */
function renderStats() {
  const statsBanner = document.getElementById("stats-banner");
  if (!statsBanner) return;
  
  const totalGrup = allGroups.length;
  const totalPeserta = allGroups.reduce((sum, g) => sum + g.members.length, 0);
  const grupHutang = allGroups.filter(g => g.jenis.toLowerCase() === "hutang").length;
  const grupReguler = allGroups.filter(g => g.jenis.toLowerCase() === "reguler").length;
  const putaran = globalConfig ? globalConfig.putaranAktif : "-";
  
  statsBanner.innerHTML = `
    <div class="stats-item">
      <span class="stats-icon">🔄</span>
      <span>Putaran: <strong>${putaran}</strong></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">👥</span>
      <span>Total Grup: <strong>${totalGrup} Kelompok</strong></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">👤</span>
      <span>Total Peserta: <strong>${totalPeserta} Orang</strong></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">⚠️</span>
      <span class="stats-label-debt">Grup Hutang: <strong>${grupHutang}</strong></span>
    </div>
    <div class="stats-item">
      <span class="stats-icon">📅</span>
      <span class="stats-label-reg">Grup Reguler: <strong>${grupReguler}</strong></span>
    </div>
  `;
  statsBanner.style.display = "flex";
}

/**
 * Menghasilkan markup HTML untuk sebuah Card Group (Daftar card bulanan)
 */
function createCardHTML(group, isExportMode = false) {
  const countdown = getCountdownStatus(group.tanggal);
  const cardId = `group-card-${group.groupNumber}`;
  const formattedDate = formatIndonesianDate(group.tanggal);
  const mapLink = group.linkMaps ? `href="${group.linkMaps}" target="_blank" rel="noopener"` : '';
  const typeBadgeClass = group.jenis.toLowerCase() === "hutang" ? "hutang" : "reguler";
  
  const danruMember = group.members.find(m => m.danru === "Ya");
  const danruName = danruMember ? danruMember.nama : "-";
  
  let memberRowsHTML = "";
  group.members.forEach(member => {
    const isDanru = member.danru === "Ya";
    const danruBadge = isDanru ? `<span class="member-badge-item danru">DANRU</span>` : "";
    const nameText = isDanru ? `<strong>${member.nama}</strong>` : member.nama;
    
    memberRowsHTML += `
      <div class="member-row-item">
        <div class="member-left-info">
          <span class="member-blok-tag">${member.blok || "-"}</span>
          <span class="member-nama-text">${nameText}</span>
        </div>
        <div class="member-right-badges">
          ${danruBadge}
          <span class="member-badge-item wilayah">${member.wilayah || "-"}</span>
        </div>
      </div>
    `;
    
    if (group.jenis.toLowerCase() === "hutang" && (member.tanggalTidakRonda || member.alasanTidakHadir)) {
      const formattedDebtDate = formatIndonesianDateWithoutDay(member.tanggalTidakRonda);
      const reasonStr = member.alasanTidakHadir ? `: ${member.alasanTidakHadir}` : "";
      memberRowsHTML += `
        <div class="debt-info-row-container">
          <div class="debt-info-box">
            <span>📅 ${formattedDebtDate}${reasonStr}</span>
          </div>
        </div>
      `;
    }
  });
  
  return `
    <div class="card" id="${cardId}">
      <div class="card-header-main">
        <div class="group-title-container">
          <span class="group-title-label">Grup ${group.groupNumber}</span>
          <span class="group-name-text">${group.namaGroup}</span>
        </div>
        
        <div class="card-header-right-actions">
          ${!isExportMode ? `
            <div class="card-actions-wrapper export-exclude" style="display: inline-flex; gap: 0.15rem;">
              <button class="btn-copy-card-inline" onclick="copyCardToClipboard('${cardId}', this)" title="Salin Card Gambar">
                <svg viewBox="0 0 24 24" class="svg-icon-inline" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
              <button class="btn-copy-card-inline" onclick="downloadCardScreenshot('${cardId}', this, '${group.groupNumber}')" title="Download Gambar Card">
                <svg viewBox="0 0 24 24" class="svg-icon-inline" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                  <circle cx="12" cy="13" r="4"></circle>
                </svg>
              </button>
            </div>
          ` : ''}
          <span class="group-type-badge ${typeBadgeClass}">${group.jenis}</span>
        </div>
      </div>
      
      <div class="card-meta-list">
        <div class="meta-row">
          <span class="meta-icon">📅</span>
          <span>${formattedDate}</span>
        </div>
        <div class="meta-row">
          <div class="countdown-pill ${countdown.class}">${countdown.html}</div>
        </div>
        <div class="meta-row">
          <span class="meta-icon">📍</span>
          <span>Titik Kumpul: ${group.linkMaps ? `<a ${mapLink} class="link-maps" style="display:inline; padding:0; margin:0;"><strong>${group.titikKumpul}</strong></a>` : `<strong>${group.titikKumpul}</strong>`}</span>
        </div>
      </div>
      
      <div class="card-divider"></div>
      
      <div class="danru-banner-row">
        <span class="danru-banner-icon">🛡️</span>
        <span>DANRU: <strong>${danruName}</strong></span>
      </div>
      
      <div class="card-divider"></div>
      
      <div class="member-list-header">Daftar Anggota (${group.members.length} Orang)</div>
      
      <div class="member-list">
        ${memberRowsHTML}
      </div>
    </div>
  `;
}

/**
 * Menghasilkan markup HTML untuk Card Ronda Terdekat (Teal Style dengan Accordeon)
 */
function createRondaTerdekatHTML(group, isExportMode = false) {
  const countdown = getCountdownStatus(group.tanggal);
  const cardId = `terdekat-card-${group.groupNumber}`;
  const formattedDate = formatIndonesianDate(group.tanggal);
  const mapLink = group.linkMaps ? `href="${group.linkMaps}" target="_blank" rel="noopener"` : '';
  
  const danruMember = group.members.find(m => m.danru === "Ya");
  const danruName = danruMember ? danruMember.nama : "-";
  
  let memberRowsHTML = "";
  group.members.forEach(member => {
    const isDanru = member.danru === "Ya";
    const danruBadge = isDanru ? `<span class="member-badge-item danru">DANRU</span>` : "";
    const nameText = isDanru ? `<strong>${member.nama}</strong>` : member.nama;
    
    memberRowsHTML += `
      <div class="member-row-item">
        <div class="member-left-info">
          <span class="member-blok-tag">${member.blok || "-"}</span>
          <span class="member-nama-text">${nameText}</span>
        </div>
        <div class="member-right-badges">
          ${danruBadge}
          <span class="member-badge-item wilayah">${member.wilayah || "-"}</span>
        </div>
      </div>
    `;
  });
  
  return `
    <div class="ronda-terdekat-top-bar">
      <span class="ronda-terdekat-badge">🟢 RONDA TERDEKAT</span>
      <div class="ronda-terdekat-header-right">
        ${!isExportMode ? `
          <div class="card-actions-wrapper export-exclude" style="display: inline-flex; gap: 0.25rem; margin-right: 0.75rem; vertical-align: middle;">
            <button class="btn-copy-card-inline" onclick="copyCardToClipboard('${cardId}', this)" title="Salin Card Gambar">
              <svg viewBox="0 0 24 24" class="svg-icon-inline" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
            <button class="btn-copy-card-inline" onclick="downloadCardScreenshot('${cardId}', this, '${group.groupNumber}')" title="Download Gambar Card">
              <svg viewBox="0 0 24 24" class="svg-icon-inline" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
            </button>
          </div>
        ` : ''}
        <span class="ronda-terdekat-putaran-label">PUTARAN ${group.putaran}</span>
      </div>
    </div>
    
    <div class="ronda-terdekat-title-container">
      <h3 class="ronda-terdekat-group-title">Grup ${group.groupNumber} - ${group.namaGroup}</h3>
    </div>
    
    <div class="ronda-terdekat-grid">
      <div class="ronda-terdekat-meta-item">
        📅 <strong>Hari:</strong> Sabtu, <strong>Tanggal:</strong> ${formattedDate.replace(/^(Minggu|Senin|Selasa|Rabu|Kamis|Jumat|Sabtu),\s*/, "")}
      </div>
      <div class="ronda-terdekat-meta-item">
        📍 <strong>Titik Kumpul:</strong> ${group.linkMaps ? `<a ${mapLink} class="ronda-terdekat-meta-item link-maps"><strong>${group.titikKumpul}</strong></a>` : `<strong>${group.titikKumpul}</strong>`}
      </div>
      <div class="ronda-terdekat-meta-item">
        👥 <strong>Jumlah Peserta:</strong> <strong>${group.members.length} Orang</strong>
      </div>
      <div class="ronda-terdekat-meta-item">
        🛡️ <strong>DANRU:</strong> <strong>${danruName}</strong>
      </div>
    </div>
    
    <div class="ronda-terdekat-bottom-bar">
      <div class="ronda-terdekat-countdown">
        <span>🕐 ⏳ ${countdown.text}</span>
      </div>
      ${!isExportMode ? `
        <button id="btn-toggle-members-accordeon" class="btn-ronda-terdekat-accordeon export-exclude" onclick="toggleRondaTerdekatMembers()">
          <span>Sembunyikan Anggota</span> <span>↑</span>
        </button>
      ` : ''}
    </div>
    
    <div id="ronda-terdekat-accordeon" class="ronda-terdekat-accordeon" style="display: block;">
      <div class="member-list-header" style="color: rgba(255,255,255,0.75);">Daftar Anggota (${group.members.length} Orang)</div>
      <div class="member-list">
        ${memberRowsHTML}
      </div>
    </div>
  `;
}

/**
 * Toggle penciutan/accordeon daftar anggota Ronda Terdekat
 */
function toggleRondaTerdekatMembers() {
  const acc = document.getElementById("ronda-terdekat-accordeon");
  const btn = document.getElementById("btn-toggle-members-accordeon");
  if (!acc || !btn) return;
  
  const isHidden = acc.style.display === "none";
  if (isHidden) {
    acc.style.display = "block";
    btn.innerHTML = `<span>Sembunyikan Anggota</span> <span>↑</span>`;
  } else {
    acc.style.display = "none";
    btn.innerHTML = `<span>Lihat Detail Anggota</span> <span>↓</span>`;
  }
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
  
  const cardHTML = createRondaTerdekatHTML(group);
  container.innerHTML = `<div class="ronda-terdekat-card" id="terdekat-card-${group.groupNumber}">${cardHTML}</div>`;
}

/**
 * Render Filter Tabs Bulan secara dinamis berdasarkan data tanggal yang ada
 */
function renderFilterBulan(groups) {
  const tabsContainer = document.getElementById("filter-bulan");
  tabsContainer.innerHTML = "";
  
  const monthsMap = {};
  groups.forEach(g => {
    const label = getMonthYearLabel(g.tanggal);
    if (label && !monthsMap[label]) {
      monthsMap[label] = parseDateString(g.tanggal);
    }
  });
  
  monthsList = Object.keys(monthsMap).sort((a, b) => {
    return monthsMap[a].getTime() - monthsMap[b].getTime();
  });
  
  if (monthsList.length === 0) return;
  
  if (rondaTerdekatGroup) {
    activeMonth = getMonthYearLabel(rondaTerdekatGroup.tanggal);
  }
  
  if (!activeMonth || !monthsList.includes(activeMonth)) {
    activeMonth = monthsList[0];
  }
  
  // Render tabs
  monthsList.forEach(monthLabel => {
    const button = document.createElement("button");
    button.className = `btn-filter-tab ${monthLabel === activeMonth ? 'active' : ''}`;
    button.textContent = monthLabel;
    button.addEventListener("click", () => {
      tabsContainer.querySelectorAll(".btn-filter-tab").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      
      activeMonth = monthLabel;
      renderJadwalGrid(activeMonth);
    });
    tabsContainer.appendChild(button);
  });
  
  document.getElementById("btn-export-bulan").style.display = "inline-flex";
}

/**
 * Render Grid Jadwal berdasarkan bulan aktif (Dipisahkan kelompok Hutang & Reguler)
 */
function renderJadwalGrid(monthLabel) {
  const gridContainer = document.getElementById("jadwal-grid");
  gridContainer.innerHTML = "";
  
  const filteredGroups = allGroups.filter(g => getMonthYearLabel(g.tanggal) === monthLabel);
  
  if (filteredGroups.length === 0) {
    gridContainer.innerHTML = `<p style="color: var(--text-muted); text-align: center; grid-column: 1/-1;">Tidak ada jadwal di bulan ini.</p>`;
    return;
  }
  
  const hutangGroups = filteredGroups.filter(g => g.jenis.toLowerCase() === "hutang");
  const regulerGroups = filteredGroups.filter(g => g.jenis.toLowerCase() === "reguler");
  
  // 1. Render Grup Hutang Ronda
  if (hutangGroups.length > 0) {
    const hutangSection = document.createElement("div");
    hutangSection.className = "grid-section";
    
    let cardsHTML = "";
    hutangGroups.forEach(group => {
      cardsHTML += createCardHTML(group);
    });
    
    hutangSection.innerHTML = `
      <div class="grid-section-header">
        <span class="section-emoji">⚠️</span>
        <h3 class="grid-section-title">Grup Khusus Hutang Ronda</h3>
      </div>
      <div class="jadwal-grid">
        ${cardsHTML}
      </div>
    `;
    gridContainer.appendChild(hutangSection);
  }
  
  // 2. Render Grup Reguler
  if (regulerGroups.length > 0) {
    const regulerSection = document.createElement("div");
    regulerSection.className = "grid-section";
    
    let cardsHTML = "";
    regulerGroups.forEach(group => {
      cardsHTML += createCardHTML(group);
    });
    
    regulerSection.innerHTML = `
      <div class="grid-section-header">
        <span class="section-emoji">📅</span>
        <h3 class="grid-section-title">Grup Ronda Reguler</h3>
      </div>
      <div class="jadwal-grid">
        ${cardsHTML}
      </div>
    `;
    gridContainer.appendChild(regulerSection);
  }
}

// ==========================================================================
// THEME TOGGLE FUNCTIONALITY
// ==========================================================================

function initTheme() {
  const toggleBtn = document.getElementById("btn-theme-toggle");
  if (!toggleBtn) return;
  
  const savedTheme = localStorage.getItem("theme") || "light";
  const isDark = savedTheme === "dark";
  
  if (isDark) {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
  }
  
  updateThemeIcons(isDark);
  
  toggleBtn.addEventListener("click", () => {
    const activeDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", activeDark ? "dark" : "light");
    updateThemeIcons(activeDark);
  });
}

function updateThemeIcons(isDark) {
  const moonSvg = document.querySelector("#btn-theme-toggle .svg-moon");
  const sunSvg = document.querySelector("#btn-theme-toggle .svg-sun");
  if (!moonSvg || !sunSvg) return;
  
  if (isDark) {
    moonSvg.style.display = "none";
    sunSvg.style.display = "block";
  } else {
    moonSvg.style.display = "block";
    sunSvg.style.display = "none";
  }
}

// ==========================================================================
// EXPORT AND SCREENSHOT FUNCTIONS
// ==========================================================================

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
  
  const originalHTML = button.innerHTML;
  button.innerHTML = `
    <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
    </svg>
  `;
  button.disabled = true;
  
  try {
    const clone = card.cloneNode(true);
    clone.querySelectorAll('.export-exclude').forEach(el => el.remove());
    
    // Pastikan accordeon anggota Ronda Terdekat terekspos penuh di screenshot gambar
    const isTerdekat = cardId.startsWith('terdekat-card');
    if (isTerdekat) {
      const acc = clone.querySelector('.ronda-terdekat-accordeon');
      if (acc) acc.style.display = 'block';
    }
    
    const wrapper = document.createElement('div');
    wrapper.className = 'export-mode';
    if (document.body.classList.contains("dark-theme")) {
      wrapper.className += ' dark-theme';
    }
    
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '380px';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    
    const isDarkActive = document.body.classList.contains("dark-theme");
    const canvas = await html2canvas(wrapper, {
      scale: 2.5,
      backgroundColor: isDarkActive ? '#171e30' : '#ffffff',
      useCORS: true
    });
    
    document.body.removeChild(wrapper);
    
    canvas.toBlob(async blob => {
      if (!blob) throw new Error("Gagal membuat data gambar");
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        showToast("Gambar card disalin ke clipboard!");
      } catch (clipErr) {
        console.warn("Clipboard API blocked. Downloading image...", clipErr);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const gNum = cardId.replace('group-card-', '').replace('terdekat-card-', 'terdekat-');
        a.download = `ronda-group-${gNum}.png`;
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
 * Download screenshot satu card group langsung sebagai file PNG
 */
async function downloadCardScreenshot(cardId, button, groupNumber) {
  const card = document.getElementById(cardId);
  if (!card) return;
  
  const originalHTML = button.innerHTML;
  button.innerHTML = `
    <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
    </svg>
  `;
  button.disabled = true;
  
  try {
    const clone = card.cloneNode(true);
    clone.querySelectorAll('.export-exclude').forEach(el => el.remove());
    
    const isTerdekat = cardId.startsWith('terdekat-card');
    if (isTerdekat) {
      const acc = clone.querySelector('.ronda-terdekat-accordeon');
      if (acc) acc.style.display = 'block';
    }
    
    const wrapper = document.createElement('div');
    wrapper.className = 'export-mode';
    if (document.body.classList.contains("dark-theme")) {
      wrapper.className += ' dark-theme';
    }
    
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-9999px';
    wrapper.style.top = '0';
    wrapper.style.width = '380px';
    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);
    
    const isDarkActive = document.body.classList.contains("dark-theme");
    const canvas = await html2canvas(wrapper, {
      scale: 2.5,
      backgroundColor: isDarkActive ? '#171e30' : '#ffffff',
      useCORS: true
    });
    
    document.body.removeChild(wrapper);
    
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `ronda-grup-${groupNumber}.png`;
    a.click();
    showToast("Gambar card berhasil diunduh!");
  } catch (err) {
    console.error("Gagal mengunduh gambar card:", err);
    alert("Gagal mengunduh gambar: " + err.message);
  } finally {
    button.innerHTML = originalHTML;
    button.disabled = false;
  }
}

/**
 * Salin Gambar Jadwal Utama (Bulan Aktif) ke Clipboard
 */
async function copyJadwalMainToClipboard(button) {
  const originalHTML = button.innerHTML;
  button.innerHTML = `
    <svg class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="animation: spin 1s linear infinite;">
      <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.1)"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
    </svg>
  `;
  button.disabled = true;
  
  try {
    const putaranNo = globalConfig ? globalConfig.putaranAktif : 3;
    const isDarkActive = document.body.classList.contains("dark-theme");
    
    const exportWrapper = document.createElement("div");
    exportWrapper.className = "export-mode";
    if (isDarkActive) {
      exportWrapper.className += ' dark-theme';
    }
    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-9999px";
    exportWrapper.style.top = "0";
    exportWrapper.style.width = "900px";
    
    const headerClone = document.getElementById("export-header-section").cloneNode(true);
    headerClone.querySelectorAll(".btn-action-circle, .btn-header-rect").forEach(el => el.remove());
    exportWrapper.appendChild(headerClone);
    
    const subTitle = document.createElement("h2");
    subTitle.style.textAlign = "center";
    subTitle.style.margin = "1.5rem 0";
    subTitle.style.color = "var(--text-main)";
    subTitle.style.fontSize = "1.25rem";
    subTitle.style.textTransform = "uppercase";
    subTitle.textContent = `JADWAL RONDA - ${activeMonth}`;
    
    const gridLayout = document.createElement("div");
    gridLayout.className = "export-bulan-layout";
    
    const activeCards = document.querySelectorAll("#jadwal-grid .card");
    if (activeCards.length === 0) {
      throw new Error("Tidak ada data jadwal untuk disalin!");
    }
    activeCards.forEach(card => {
      const cardClone = card.cloneNode(true);
      cardClone.querySelectorAll(".export-exclude").forEach(el => el.remove());
      gridLayout.appendChild(cardClone);
    });
    
    exportWrapper.appendChild(subTitle);
    exportWrapper.appendChild(gridLayout);
    
    document.body.appendChild(exportWrapper);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const canvas = await html2canvas(exportWrapper, {
      scale: 2,
      backgroundColor: isDarkActive ? "#0b0f19" : "#f8fafc",
      useCORS: true
    });
    
    document.body.removeChild(exportWrapper);
    
    canvas.toBlob(async blob => {
      if (!blob) throw new Error("Gagal membuat data gambar");
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob })
        ]);
        showToast("Gambar jadwal bulan aktif berhasil disalin!");
      } catch (clipErr) {
        console.warn("Clipboard API blocked. Downloading image...", clipErr);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const cleanMonthName = activeMonth.replace(/\s+/g, '-').toLowerCase();
        a.download = `ronda-putaran${putaranNo}-${cleanMonthName}.png`;
        a.click();
        URL.revokeObjectURL(url);
        showToast("Gambar jadwal diunduh otomatis.");
      }
    }, 'image/png');
    
  } catch (err) {
    console.error("Gagal menyalin gambar jadwal:", err);
    alert("Gagal menyalin gambar jadwal: " + err.message);
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
    const isDarkActive = document.body.classList.contains("dark-theme");
    let filename = "";
    let width = "1200px";
    
    const exportWrapper = document.createElement("div");
    exportWrapper.className = "export-mode";
    if (isDarkActive) {
      exportWrapper.className += ' dark-theme';
    }
    exportWrapper.style.position = "fixed";
    exportWrapper.style.left = "-9999px";
    exportWrapper.style.top = "0";
    
    const headerClone = document.getElementById("export-header-section").cloneNode(true);
    headerClone.querySelectorAll(".btn-action-circle, .btn-header-rect").forEach(el => el.remove());
    exportWrapper.appendChild(headerClone);
    
    const subTitle = document.createElement("h2");
    subTitle.style.textAlign = "center";
    subTitle.style.margin = "1.5rem 0";
    subTitle.style.color = "var(--text-main)";
    subTitle.style.fontSize = "1.25rem";
    subTitle.style.textTransform = "uppercase";
    
    const gridLayout = document.createElement("div");
    
    if (type === "bulan") {
      const cleanMonthName = activeMonth.replace(/\s+/g, '-').toLowerCase();
      filename = `ronda-putaran${putaranNo}-${cleanMonthName}.png`;
      width = "900px";
      subTitle.textContent = `JADWAL RONDA - ${activeMonth}`;
      gridLayout.className = "export-bulan-layout";
      
      const activeCards = document.querySelectorAll("#jadwal-grid .card");
      if (activeCards.length === 0) {
        throw new Error("Tidak ada data jadwal untuk diekspor!");
      }
      activeCards.forEach(card => {
        const cardClone = card.cloneNode(true);
        cardClone.querySelectorAll(".export-exclude").forEach(el => el.remove());
        gridLayout.appendChild(cardClone);
      });
    } else {
      filename = `ronda-putaran${putaranNo}-lengkap.png`;
      width = "1400px";
      subTitle.textContent = `JADWAL RONDA LENGKAP - PUTARAN ${putaranNo}`;
      gridLayout.className = "export-putaran-layout";
      
      if (allGroups.length === 0) {
        throw new Error("Tidak ada data jadwal lengkap untuk diekspor!");
      }
      allGroups.forEach(group => {
        const cardHTML = createCardHTML(group, true);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = cardHTML;
        gridLayout.appendChild(tempDiv.firstElementChild);
      });
    }
    
    exportWrapper.appendChild(subTitle);
    exportWrapper.appendChild(gridLayout);
    exportWrapper.style.width = width;
    
    document.body.appendChild(exportWrapper);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const canvas = await html2canvas(exportWrapper, {
      scale: 2,
      backgroundColor: isDarkActive ? "#0b0f19" : "#f8fafc",
      useCORS: true
    });
    
    document.body.removeChild(exportWrapper);
    
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

async function loadData() {
  const loadingOverlay = document.getElementById("loading-overlay");
  const errorContainer = document.getElementById("error-container");
  const appContainer = document.getElementById("app-container");
  
  loadingOverlay.style.display = "flex";
  errorContainer.style.display = "none";
  appContainer.style.display = "none";
  
  const isMockMode = (API_URL === "YOUR_GAS_API_URL_HERE" || API_URL.trim() === "");
  
  try {
    if (isMockMode) {
      console.warn("Berjalan dalam DEMO MODE menggunakan data mockup.");
      globalConfig = MOCK_CONFIG;
      allGroups = processRawJadwal(MOCK_JADWAL.data);
      
      if (!document.getElementById("demo-banner")) {
        const demoIndicator = document.createElement("div");
        demoIndicator.id = "demo-banner";
        demoIndicator.style.cssText = "background-color: var(--warning); color: #000; text-align: center; font-size: 0.75rem; font-weight: 700; padding: 0.25rem; position: sticky; top: 0; z-index: 9999;";
        demoIndicator.textContent = "Running in Demo Mode (Local Mockup Data). Configure API_URL in app.js for Live Integration.";
        document.body.insertBefore(demoIndicator, document.body.firstChild);
      }
    } else {
      const configUrl = `${API_URL}${API_URL.includes('?') ? '&' : '?'}action=getKonfigurasi`;
      console.log("[CONFIG] REQUEST URL:", configUrl);

      const configRes = await fetch(configUrl);

      console.log("[CONFIG] HTTP STATUS:", configRes.status);
      console.log("[CONFIG] RESPONSE URL:", configRes.url);
      console.log("[CONFIG] REDIRECTED:", configRes.redirected);

      if (!configRes.ok) {
        const rawErrText = await configRes.text();
        console.log("[CONFIG] RAW ERROR RESPONSE:", rawErrText);
        throw new Error("Gagal mengambil konfigurasi dari API (HTTP " + configRes.status + ")");
      }

      const rawConfigText = await configRes.text();
      console.log("[CONFIG] RAW RESPONSE:", rawConfigText);
      globalConfig = JSON.parse(rawConfigText);
      
      if (globalConfig.status === "error") {
        throw new Error(globalConfig.message || "Server mengembalikan status error saat mengambil konfigurasi");
      }
      
      const jadwalUrl = `${API_URL}${API_URL.includes('?') ? '&' : '?'}action=getJadwal`;
      console.log("[JADWAL] REQUEST URL:", jadwalUrl);
      const jadwalRes = await fetch(jadwalUrl);
      
      console.log("[JADWAL] HTTP STATUS:", jadwalRes.status);
      console.log("[JADWAL] RESPONSE URL:", jadwalRes.url);
      console.log("[JADWAL] REDIRECTED:", jadwalRes.redirected);

      if (!jadwalRes.ok) {
        const rawJadwalErr = await jadwalRes.text();
        console.log("[JADWAL] RAW ERROR RESPONSE:", rawJadwalErr);
        throw new Error("Gagal mengambil data jadwal dari API (HTTP " + jadwalRes.status + ")");
      }

      const rawJadwalText = await jadwalRes.text();
      const rawJadwal = JSON.parse(rawJadwalText);
      
      if (rawJadwal.status === "error") {
        throw new Error(rawJadwal.message || "Server mengembalikan status error saat mengambil jadwal");
      }
      
      allGroups = processRawJadwal(rawJadwal.data);
    }
    
    rondaTerdekatGroup = findRondaTerdekat(allGroups);
    
    // RENDER SEMUA KOMPONEN
    renderHeader(globalConfig);
    renderRondaTerdekat(rondaTerdekatGroup);
    renderStats();
    renderFilterBulan(allGroups);
    renderJadwalGrid(activeMonth);
    
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
// SEARCH FEATURE IMPLEMENTATION (Client-side Search & Resident Summary)
// ==========================================================================

function searchWarga(query) {
  if (!query || !query.trim()) return [];
  const q = query.trim().toLowerCase();
  
  const residentMap = {};
  
  allGroups.forEach(group => {
    group.members.forEach(member => {
      const matchName = (member.nama || "").toLowerCase().includes(q);
      const matchBlok = (member.blok || "").toLowerCase().includes(q);
      
      if (matchName || matchBlok) {
        const key = ((member.blok || "").trim() + "___" + (member.nama || "").trim()).toLowerCase();
        if (!residentMap[key]) {
          residentMap[key] = {
            key: key,
            nama: member.nama || "",
            blok: member.blok || "",
            wilayah: member.wilayah || "",
            obligations: []
          };
        }
        
        residentMap[key].obligations.push({
          putaran: group.putaran,
          groupNumber: group.groupNumber,
          namaGroup: group.namaGroup,
          jenis: group.jenis || "Reguler",
          tanggal: group.tanggal,
          titikKumpul: group.titikKumpul,
          linkMaps: group.linkMaps || "",
          wilayah: member.wilayah || "",
          danru: member.danru || "Tidak",
          tanggalTidakRonda: member.tanggalTidakRonda || "",
          alasanTidakHadir: member.alasanTidakHadir || "",
          debtSequence: member.debtSequence,
          debtSequenceLabel: member.debtSequenceLabel
        });
      }
    });
  });
  
  const residents = Object.values(residentMap);
  
  const today = getJakartaToday();
  
  residents.forEach(res => {
    // Sort all obligations by date ASC
    res.obligations.sort((a, b) => {
      const dateA = parseDateString(a.tanggal);
      const dateB = parseDateString(b.tanggal);
      if (dateA && dateB && dateA.getTime() !== dateB.getTime()) {
        return dateA.getTime() - dateB.getTime();
      }
      return a.groupNumber - b.groupNumber;
    });
    
    // Assign debtSequenceLabel dynamically if missing
    let debtCount = 0;
    res.obligations.forEach(ob => {
      if ((ob.jenis || "").toLowerCase() === "hutang") {
        debtCount++;
        if (!ob.debtSequenceLabel) {
          ob.debtSequenceLabel = `Hutang Ronda ke-${debtCount}`;
        }
      }
    });
    
    // 3. Find upcoming schedules (tanggal >= today)
    const upcomingIndices = [];
    res.obligations.forEach((ob, idx) => {
      const d = parseDateString(ob.tanggal);
      if (d && d.getTime() >= today.getTime()) {
        upcomingIndices.push(idx);
      }
    });
    
    if (upcomingIndices.length > 0) {
      // Pick the earliest upcoming date (closest future schedule)
      const terdekatIdx = upcomingIndices[0];
      res.jadwalTerdekat = res.obligations[terdekatIdx];
      res.terdekatLabel = "🔔 JADWAL TERDEKAT";
      res.isTerakhir = false;
      res.jadwalLainnya = res.obligations.filter((_, idx) => idx !== terdekatIdx);
    } else {
      // All schedules in past -> label "JADWAL TERAKHIR", pick the most recent past date (last in ASC sort)
      const terakhirIdx = res.obligations.length - 1;
      res.jadwalTerdekat = res.obligations[terakhirIdx];
      res.terdekatLabel = "✔ JADWAL TERAKHIR";
      res.isTerakhir = true;
      res.jadwalLainnya = res.obligations.filter((_, idx) => idx !== terakhirIdx);
    }
  });
  
  // Sort residents by natural house number, then name
  residents.sort((a, b) => {
    return a.blok.localeCompare(b.blok, undefined, { numeric: true }) || a.nama.localeCompare(b.nama);
  });
  
  return residents;
}

function renderSearchResults(results, query) {
  const container = document.getElementById("search-results-container");
  const countBadge = document.getElementById("search-count-badge");
  if (!container) return;
  
  if (results.length === 0) {
    if (countBadge) countBadge.textContent = "0 Ditemukan";
    container.innerHTML = `
      <div class="search-empty-state">
        <span class="search-empty-icon">🔍</span>
        <h3 class="search-empty-title">Jadwal warga tidak ditemukan</h3>
        <p class="search-empty-desc">Tidak ditemukan jadwal ronda untuk pencarian "<strong>${escapeHtml(query)}</strong>". Pastikan penulisan nama atau nomor blok sudah benar.</p>
        <button class="btn-back-to-schedule" onclick="clearSearch()">✕ Kembali ke Jadwal Lengkap</button>
      </div>
    `;
    return;
  }
  
  if (countBadge) {
    countBadge.textContent = `${results.length} Warga Ditemukan`;
  }
  
  let html = "";
  results.forEach(res => {
    const totalObligations = res.obligations.length;
    const countLabel = totalObligations === 1 ? "1 Jadwal Terdaftar" : `${totalObligations} Jadwal Terdaftar`;
    
    // Jadwal Terdekat / Terakhir
    const jt = res.jadwalTerdekat;
    const formattedJtDate = formatIndonesianDate(jt.tanggal);
    const countdownJt = getCountdownStatus(jt.tanggal);
    const isDanruJt = jt.danru === "Ya";
    const danruBadgeJt = isDanruJt ? `<span class="member-badge-item danru" style="margin-left: 0.4rem;">🛡️ DANRU</span>` : "";
    const typeBadgeClassJt = jt.jenis.toLowerCase() === "hutang" ? "hutang" : "reguler";
    const typeLabelJt = jt.debtSequenceLabel || jt.jenis;
    const mapLinkJt = jt.linkMaps ? `href="${jt.linkMaps}" target="_blank" rel="noopener"` : "";
    const terdekatBadgeText = res.terdekatLabel || "🔔 JADWAL TERDEKAT";
    
    // Jadwal Lainnya
    let lainnyaHTML = "";
    if (res.jadwalLainnya.length > 0) {
      let itemsHTML = "";
      res.jadwalLainnya.forEach(ob => {
        const fDate = formatIndonesianDate(ob.tanggal);
        const typeBadgeCls = ob.jenis.toLowerCase() === "hutang" ? "hutang" : "reguler";
        const typeLbl = ob.debtSequenceLabel || ob.jenis;
        const isDanru = ob.danru === "Ya";
        const dBadge = isDanru ? `<span class="member-badge-item danru">DANRU</span>` : "";
        const mLink = ob.linkMaps ? `href="${ob.linkMaps}" target="_blank" rel="noopener"` : "";
        
        let debtNote = "";
        if (ob.jenis.toLowerCase() === "hutang" && (ob.tanggalTidakRonda || ob.alasanTidakHadir)) {
          const fDebt = formatIndonesianDateWithoutDay(ob.tanggalTidakRonda);
          const rText = ob.alasanTidakHadir ? `: ${ob.alasanTidakHadir}` : "";
          debtNote = `<div style="font-size: 0.75rem; color: var(--warning); margin-top: 0.2rem;">📅 Hutang ronda tanggal ${fDebt}${rText}</div>`;
        }
        
        itemsHTML += `
          <div class="search-lainnya-item">
            <div class="search-lainnya-left">
              <span class="search-lainnya-date">${fDate}</span>
              <span class="search-lainnya-group">Grup ${ob.groupNumber} — ${escapeHtml(ob.namaGroup)}</span>
              <span style="font-size: 0.8rem; color: var(--text-muted);">📍 Titik Kumpul: ${ob.linkMaps ? `<a ${mLink} class="link-maps"><strong>${escapeHtml(ob.titikKumpul)}</strong></a>` : `<strong>${escapeHtml(ob.titikKumpul)}</strong>`}</span>
              ${debtNote}
            </div>
            <div class="search-lainnya-right">
              ${dBadge}
              <span class="group-type-badge ${typeBadgeCls}">${typeLbl}</span>
            </div>
          </div>
        `;
      });
      
      lainnyaHTML = `
        <div class="search-lainnya-container">
          <div class="search-lainnya-title">
            <span>📋 JADWAL LAINNYA (${res.jadwalLainnya.length})</span>
          </div>
          <div class="search-lainnya-list">
            ${itemsHTML}
          </div>
        </div>
      `;
    }
    
    let debtDetailsJt = "";
    if (jt.jenis.toLowerCase() === "hutang" && (jt.tanggalTidakRonda || jt.alasanTidakHadir)) {
      const formattedDebtDate = formatIndonesianDateWithoutDay(jt.tanggalTidakRonda);
      const reasonStr = jt.alasanTidakHadir ? `: ${jt.alasanTidakHadir}` : "";
      debtDetailsJt = `
        <div class="search-detail-row" style="margin-top: 0.25rem;">
          <span class="meta-icon">⚠️</span>
          <span style="font-size: 0.85rem; color: var(--warning);">Hutang ronda tanggal <strong>${formattedDebtDate}</strong>${reasonStr}</span>
        </div>
      `;
    }
    
    html += `
      <div class="resident-summary-card">
        <div class="resident-card-header">
          <div class="resident-identity">
            <h3 class="resident-name">${escapeHtml(res.nama)}</h3>
            <div class="resident-badges-row">
              <span class="resident-blok-badge">Blok ${escapeHtml(res.blok)}</span>
              <span class="resident-wilayah-badge">${escapeHtml(res.wilayah)}</span>
            </div>
          </div>
          <span class="resident-obligations-count">${countLabel}</span>
        </div>
        
        <!-- JADWAL TERDEKAT / TERAKHIR -->
        <div class="search-terdekat-box">
          <div class="search-terdekat-header">
            <span class="search-terdekat-badge">${terdekatBadgeText}</span>
            <span class="group-type-badge ${typeBadgeClassJt}">${typeLabelJt}</span>
          </div>
          
          <div class="search-schedule-details">
            <div class="search-detail-row">
              <span class="meta-icon">📅</span>
              <span><strong>${formattedJtDate}</strong></span>
              <div class="countdown-pill ${countdownJt.class}" style="display: inline-block; margin-left: 0.5rem;">${countdownJt.html}</div>
            </div>
            
            <div class="search-detail-row">
              <span class="meta-icon">👥</span>
              <span>Grup ${jt.groupNumber} — <strong>${escapeHtml(jt.namaGroup)}</strong>${danruBadgeJt}</span>
            </div>
            
            <div class="search-detail-row">
              <span class="meta-icon">📍</span>
              <span>Titik Kumpul: ${jt.linkMaps ? `<a ${mapLinkJt} class="link-maps"><strong>${escapeHtml(jt.titikKumpul)}</strong></a>` : `<strong>${escapeHtml(jt.titikKumpul)}</strong>`}</span>
            </div>
            
            <div class="search-detail-row">
              <span class="meta-icon">🏡</span>
              <span>Wilayah Ronda: <strong>${escapeHtml(jt.wilayah)}</strong></span>
            </div>
            
            ${debtDetailsJt}
          </div>
        </div>
        
        <!-- JADWAL LAINNYA -->
        ${lainnyaHTML}
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function escapeHtml(text) {
  if (!text) return "";
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function performSearch(query) {
  const searchResultsSection = document.getElementById("search-results-section");
  const rondaTerdekatSection = document.getElementById("ronda-terdekat-section");
  const statsBanner = document.getElementById("stats-banner");
  const filterSection = document.getElementById("filter-section");
  const jadwalGrid = document.getElementById("jadwal-grid");
  const clearBtn = document.getElementById("btn-clear-search");
  
  if (!query || !query.trim()) {
    clearSearch();
    return;
  }
  
  if (clearBtn) clearBtn.style.display = "flex";
  
  // Hide normal schedule sections
  if (rondaTerdekatSection) rondaTerdekatSection.style.display = "none";
  if (statsBanner) statsBanner.style.display = "none";
  if (filterSection) filterSection.style.display = "none";
  if (jadwalGrid) jadwalGrid.style.display = "none";
  
  // Show search results section
  if (searchResultsSection) searchResultsSection.style.display = "block";
  
  const results = searchWarga(query);
  renderSearchResults(results, query);
}

function clearSearch() {
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("btn-clear-search");
  const searchResultsSection = document.getElementById("search-results-section");
  const rondaTerdekatSection = document.getElementById("ronda-terdekat-section");
  const statsBanner = document.getElementById("stats-banner");
  const filterSection = document.getElementById("filter-section");
  const jadwalGrid = document.getElementById("jadwal-grid");
  
  if (searchInput) searchInput.value = "";
  if (clearBtn) clearBtn.style.display = "none";
  if (searchResultsSection) searchResultsSection.style.display = "none";
  
  // Restore normal schedule sections
  if (rondaTerdekatSection) rondaTerdekatSection.style.display = "block";
  if (statsBanner) statsBanner.style.display = "flex";
  if (filterSection) filterSection.style.display = "block";
  if (jadwalGrid) jadwalGrid.style.display = "grid";
}

function quickSearch(term) {
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.value = term;
    performSearch(term);
    searchInput.focus();
  }
}

function initSearch() {
  const searchInput = document.getElementById("search-input");
  const clearBtn = document.getElementById("btn-clear-search");
  const backBtn = document.getElementById("btn-back-to-schedule");
  
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const q = e.target.value;
      if (!q.trim()) {
        clearSearch();
      } else {
        performSearch(q);
      }
    });
  }
  
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearSearch();
      if (searchInput) searchInput.focus();
    });
  }
  
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      clearSearch();
    });
  }
}

// ==========================================================================
// PDF EXPORT FEATURE (Full Putaran A4 Multi-Page PDF)
// ==========================================================================

function exportPutaranPDF() {
  if (!allGroups || allGroups.length === 0) {
    showToast("Data jadwal putaran belum dimuat untuk export PDF.", 3000);
    return;
  }

  const jsPDFClass = (typeof window !== "undefined" && window.jspdf && window.jspdf.jsPDF) || (typeof jsPDF === "function" ? jsPDF : null);
  if (!jsPDFClass) {
    showToast("Library jsPDF tidak tersedia.", 4000);
    throw new Error("jsPDF library tidak tersedia.");
  }

  const doc = new jsPDFClass({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    putOnlyUsedFonts: true
  });

  const renderTable = (typeof window !== "undefined" && window.jspdfAutoTable && (window.jspdfAutoTable.default || window.jspdfAutoTable.autoTable || window.jspdfAutoTable) && ((opts) => (window.jspdfAutoTable.default || window.jspdfAutoTable.autoTable || window.jspdfAutoTable)(doc, opts))) ||
                      (typeof window !== "undefined" && typeof window.autoTable === "function" && ((opts) => window.autoTable(doc, opts))) ||
                      (typeof window !== "undefined" && typeof window.default === "function" && ((opts) => window.default(doc, opts))) ||
                      (typeof doc.autoTable === "function" && ((opts) => doc.autoTable(opts))) ||
                      (typeof autoTable === "function" && ((opts) => autoTable(doc, opts))) || null;

  if (!renderTable || typeof renderTable !== "function") {
    showToast("Library jsPDF AutoTable tidak tersedia.", 4000);
    throw new Error("jsPDF AutoTable library tidak tersedia.");
  }

  const putaranNum = globalConfig && globalConfig.putaranAktif ? globalConfig.putaranAktif : (allGroups[0] ? allGroups[0].putaran : 1);
  const totalGrup = allGroups.length;
  const totalPeserta = allGroups.reduce((sum, g) => sum + g.members.length, 0);
  const grupHutang = allGroups.filter(g => (g.jenis || "").toLowerCase() === "hutang").length;
  const grupReguler = allGroups.filter(g => (g.jenis || "").toLowerCase() === "reguler").length;

  const startDateStr = allGroups[0] ? allGroups[0].tanggal : "";
  const endDateStr = allGroups[allGroups.length - 1] ? allGroups[allGroups.length - 1].tanggal : "";
  const periodeStr = `${startDateStr} s.d ${endDateStr}`;

  const primaryColor = [79, 70, 229]; // Indigo #4f46e5
  const secondaryColor = [30, 27, 75]; // Dark Navy #1e1b4b
  const accentGray = [241, 245, 249]; // Light slate
  const textDark = [15, 23, 42]; // #0f172a
  const textMuted = [100, 116, 139]; // #64748b

  let currentY = 14;

  // Header Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.text("JADWAL RONDA WARGA VILLA ASTER RESIDENCE", 14, currentY);

  currentY += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(textMuted[0], textMuted[1], textMuted[2]);
  doc.text("Portal Transparansi Jadwal Ronda Malam & Keamanan Lingkungan Warga", 14, currentY);

  currentY += 5;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.6);
  doc.line(14, currentY, 196, currentY);

  currentY += 4;
  // Metadata Box
  doc.setFillColor(accentGray[0], accentGray[1], accentGray[2]);
  doc.roundedRect(14, currentY, 182, 16, 2, 2, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`PUTARAN ${putaranNum}`, 18, currentY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(textDark[0], textDark[1], textDark[2]);
  doc.text(`•  Periode: ${periodeStr}`, 45, currentY + 5.5);
  doc.text(`•  Total: ${totalGrup} Kelompok (${grupHutang} Hutang, ${grupReguler} Reguler)  |  ${totalPeserta} Warga Terjadwal`, 18, currentY + 11.5);

  currentY += 20;

  // Render Table for each group in allGroups (Independent of search query)
  allGroups.forEach((group) => {
    const formattedDate = formatIndonesianDate(group.tanggal);
    const danruMem = group.members.find(m => m.danru === "Ya");
    const danruName = danruMem ? danruMem.nama : "-";
    const jenisUpper = (group.jenis || "Reguler").toUpperCase();
    const isDebt = (group.jenis || "").toLowerCase() === "hutang";

    const tableBody = group.members.map((mem, mIdx) => {
      const isDanru = mem.danru === "Ya";
      const statusDanru = isDanru ? "DANRU" : "Anggota";
      let keterangan = "-";
      if (isDebt && (mem.tanggalTidakRonda || mem.alasanTidakHadir)) {
        const debtDate = mem.tanggalTidakRonda || "";
        const debtReason = mem.alasanTidakHadir ? `: ${mem.alasanTidakHadir}` : "";
        keterangan = `Hutang tgl ${debtDate}${debtReason}`;
      } else if (mem.debtSequenceLabel) {
        keterangan = mem.debtSequenceLabel;
      }
      return [
        String(mIdx + 1),
        mem.blok || "-",
        mem.nama || "-",
        mem.wilayah || "-",
        statusDanru,
        keterangan
      ];
    });

    const tableTitle = `GRUP ${group.groupNumber} — ${group.namaGroup.toUpperCase()}  [ ${jenisUpper} ]\nTanggal: ${formattedDate}  |  Titik Kumpul: ${group.titikKumpul}  |  Danru: ${danruName}`;

    renderTable({
      startY: currentY,
      head: [
        [
          {
            content: tableTitle,
            colSpan: 6,
            styles: {
              fillColor: isDebt ? [217, 119, 6] : [79, 70, 229],
              textColor: [255, 255, 255],
              fontStyle: 'bold',
              fontSize: 8.5,
              cellPadding: 3
            }
          }
        ],
        ['No', 'Blok', 'Nama Warga', 'Wilayah', 'Peran', 'Keterangan']
      ],
      body: tableBody,
      theme: 'grid',
      styles: {
        fontSize: 8,
        cellPadding: 2,
        textColor: [15, 23, 42],
        lineColor: [226, 232, 240],
        lineWidth: 0.15
      },
      headStyles: {
        fillColor: [241, 245, 249],
        textColor: [51, 65, 85],
        fontStyle: 'bold',
        fontSize: 7.5
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 48 },
        3: { cellWidth: 26 },
        4: { cellWidth: 22, halign: 'center' },
        5: { cellWidth: 'auto' }
      },
      didParseCell: function(data) {
        if (data.section === 'body') {
          if (data.row.raw[4] === 'DANRU') {
            data.cell.styles.fontStyle = 'bold';
            if (data.column.index === 4) {
              data.cell.styles.textColor = [79, 70, 229];
            }
          }
        }
      },
      margin: { top: 14, left: 14, right: 14, bottom: 18 },
      pageBreak: 'auto'
    });

    currentY = doc.lastAutoTable.finalY + 6;
  });

  // Footer for all pages (Safe from table clipping)
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Villa Aster Residence — Portal Jadwal Ronda Malam", 14, 289);
    doc.text(`Halaman ${i} dari ${totalPages}`, 196, 289, { align: "right" });
  }

  const filename = `Jadwal_Ronda_Villa_Aster_Putaran_${putaranNum}.pdf`;
  doc.save(filename);
  showToast("PDF Jadwal Satu Putaran berhasil diunduh!");
}

// ==========================================================================
// EVENT LISTENERS & WINDOW ACTIONS
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("[PDF LIB] jspdf:", typeof window.jspdf);
  console.log("[PDF LIB] jspdfAutoTable:", typeof window.jspdfAutoTable);
  console.log("[PDF LIB] autoTable:", typeof window.autoTable);
  console.log("[PDF LIB] window.default:", typeof window.default);

  initTheme();
  initSearch();
  
  document.getElementById("btn-retry").addEventListener("click", loadData);
  
  document.getElementById("btn-export-bulan").addEventListener("click", () => {
    downloadScreenshot("bulan");
  });
  
  document.getElementById("btn-export-putaran").addEventListener("click", () => {
    downloadScreenshot("putaran");
  });

  const pdfBtn = document.getElementById("btn-download-pdf");
  if (pdfBtn) {
    pdfBtn.addEventListener("click", exportPutaranPDF);
  }
  
  const refreshBtn = document.getElementById("btn-refresh-data");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      loadData();
      showToast("Data ronda berhasil dimuat ulang!");
    });
  }
  
  const copyMainBtn = document.getElementById("btn-copy-jadwal-main");
  if (copyMainBtn) {
    copyMainBtn.addEventListener("click", () => {
      copyJadwalMainToClipboard(copyMainBtn);
    });
  }
  
  loadData();
});
