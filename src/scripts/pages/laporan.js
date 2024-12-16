/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';
import createDetailLaporanPage from './detail-laporan.js';
import ENDPOINT from '../globals/endpoint';

const fetchLaporan = async () => {
  try {
    const response = await fetch(ENDPOINT.GETLAPORAN, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal memuat laporan.');
    }

    const data = await response.json();
    console.log('Respons API:', data);

    return Array.isArray(data.message) ? data.message.filter((laporan) => !laporan.isArchived) : [];
  } catch (error) {
    console.error('Fetch Laporan Error:', error.message);
    return [];
  }
};

const createLaporanCard = (laporan) => {
  const card = document.createElement('div');
  card.className = 'laporan-card';
  card.innerHTML = `
    <div class="laporan-card-left">
      <img src="${laporan.gambar_pendukung?.[0] || '../../images/default-image.png'}" alt="Foto Laporan" />
    </div>
    <div class="laporan-card-right">
      <h4>${laporan.judul || 'Judul tidak tersedia'}</h4>
      <p>${laporan.kategori || 'Kategori tidak tersedia'}</p>
      <p>${laporan.tanggal || 'Tanggal tidak tersedia'}</p>
      <p><i class="fas fa-map-marker-alt"></i> ${laporan.lokasi || 'Lokasi tidak tersedia'}</p>
      <p class="kategori">
        <span class="status-badge ${laporan.status === 'selesai' ? 'status-done' : laporan.status === 'di proses' ? 'status-in-progress' : 'status-pending'}"> ${laporan.status || 'Status tidak tersedia'}</span>
      </p>
      <p class="deskripsi">${laporan.description || 'Deskripsi tidak tersedia'}</p>
      <button class="detail-button" data-id="${laporan._id}">Lihat Detail</button>
    </div>
  `;

  const detailButton = card.querySelector('.detail-button');
  detailButton.addEventListener('click', (event) => {
    event.preventDefault();
    const laporanId = detailButton.dataset.id;
    window.location.href = `#/detailnya?id=${laporanId}`;
  });

  return card;
};

const createLaporanPage = () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const featuresBar = document.createElement('div');
  featuresBar.className = 'features-bar';
  featuresBar.innerHTML = `
    <div class="search-bar">
      <input type="text" id="search-input" placeholder="Cari Laporan...">
      <button id="search-button"><i class="fas fa-search"></i> Cari</button>
    </div>
    <div class="create-report">
      <a href="#" id="create-laporan-button">
        <button><i class="fas fa-plus"></i> Buat Laporan</button>
      </a>
    </div>
  `;
  document.body.appendChild(featuresBar);

  const container = document.createElement('div');
  container.className = 'container';

  const sidebars = document.createElement('div');
  sidebars.className = 'sidebars';

  const statusSidebar = document.createElement('div');
  statusSidebar.className = 'sidebar';
  statusSidebar.innerHTML = `
    <h3>Status Laporan</h3>
    <form id="status-filter">
      <label>
        <input type="radio" name="status" value="semua" checked>
        <span>Semua</span>
      </label>
      <label>
        <input type="radio" name="status" value="selesai">
        <span>Selesai</span>
      </label>
      <label>
        <input type="radio" name="status" value="di proses">
        <span>Diproses</span>
      </label>
      <label>
        <input type="radio" name="status" value="belum di proses">
        <span>Belum Di proses</span>
      </label>
    </form>
  `;

  const kategoriSidebar = document.createElement('div');
  kategoriSidebar.className = 'sidebar';
  kategoriSidebar.innerHTML = `
    <h3>Kategori Laporan</h3>
    <form id="kategori-filter">
      <label>
        <input type="radio" name="kategori" value="semua" checked>
        <span>Semua</span>
      </label>
      <label>
        <input type="radio" name="kategori" value="jalan">
        <span>Jalan</span>
      </label>
      <label>
        <input type="radio" name="kategori" value="jembatan">
        <span>Jembatan</span>
      </label>
      <label>
        <input type="radio" name="kategori" value="lalu lintas">
        <span>Lalu Lintas</span>
      </label>
    </form>
  `;

  sidebars.appendChild(statusSidebar);
  sidebars.appendChild(kategoriSidebar);

  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';

  const loadingIndicator = document.createElement('div');
  loadingIndicator.className = 'loading-indicator';

  mainContent.appendChild(loadingIndicator);
  document.body.appendChild(mainContent);

  let laporanDataCache = []; // Cache laporan untuk mempermudah filter
  let currentPage = 1; // Current page
  const laporanPerPage = 5; // Number of laporan per page

  const renderLaporan = (laporanList) => {
    mainContent.innerHTML = '';
    if (laporanList.length === 0) {
      mainContent.innerHTML = '<p>Tidak ada laporan sesuai pencarian.</p>';
    } else {
      const startIndex = (currentPage - 1) * laporanPerPage;
      const endIndex = startIndex + laporanPerPage;
      const paginatedLaporan = laporanList.slice(startIndex, endIndex);

      paginatedLaporan.forEach((laporan) => {
        const card = createLaporanCard(laporan);
        mainContent.appendChild(card);
      });

      renderPaginationButtons(laporanList.length);
    }
  };

  const applyFilters = () => {
    const statusValue = document.querySelector('input[name="status"]:checked').value;
    const kategoriValue = document.querySelector('input[name="kategori"]:checked').value;

    const filteredLaporan = laporanDataCache.filter((laporan) => {
      const statusMatch = statusValue === 'semua'
        || (statusValue === 'selesai' && laporan.status === 'selesai')
        || (statusValue === 'di proses' && laporan.status === 'di proses')
        || (statusValue === 'belum di proses' && laporan.status === 'belum di proses');

      const kategoriMatch = kategoriValue === 'semua'
        || (kategoriValue === 'jalan' && laporan.kategori?.toLowerCase() === 'jalan')
        || (kategoriValue === 'jembatan' && laporan.kategori?.toLowerCase() === 'jembatan')
        || (kategoriValue === 'lalu lintas' && laporan.kategori?.toLowerCase() === 'lalu lintas');

      return statusMatch && kategoriMatch;
    });

    currentPage = 1; // Reset to the first page when applying filters
    renderLaporan(filteredLaporan);
  };

  const renderPaginationButtons = (totalLaporan) => {
    const totalPages = Math.ceil(totalLaporan / laporanPerPage);

    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';

    const createPaginationButton = (text, page) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.disabled = currentPage === page;
      button.addEventListener('click', () => {
        currentPage = page;
        renderLaporan(laporanDataCache);
      });
      return button;
    };

    paginationContainer.appendChild(createPaginationButton('<<', currentPage - 1 > 0 ? currentPage - 1 : currentPage));
    for (let i = 1; i <= totalPages; i++) {
      paginationContainer.appendChild(createPaginationButton(i, i));
    }
    paginationContainer.appendChild(createPaginationButton('>>', currentPage + 1 <= totalPages ? currentPage + 1 : currentPage));

    mainContent.appendChild(paginationContainer);
  };

  fetchLaporan()
    .then((laporanData) => {
      laporanDataCache = laporanData; // Simpan data laporan di cache
      renderLaporan(laporanData);
    })
    .catch((error) => {
      mainContent.innerHTML = '<p>Gagal memuat laporan. Silakan coba lagi nanti.</p>';
      console.error(error);
    });

  container.appendChild(sidebars);
  container.appendChild(mainContent);
  document.body.appendChild(container);

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);

  // Event Listener untuk filter status dan kategori
  // Event Listener untuk filter status dan kategori
  const statusFilter = document.getElementById('status-filter');
  const kategoriFilter = document.getElementById('kategori-filter');

  statusFilter.addEventListener('change', applyFilters);
  kategoriFilter.addEventListener('change', applyFilters);

  const searchButton = document.getElementById('search-button');
  const searchInput = document.getElementById('search-input');

  searchButton.addEventListener('click', () => {
    const keyword = searchInput.value.toLowerCase().trim();
    const filteredLaporan = laporanDataCache.filter((laporan) => laporan.judul.toLowerCase().includes(keyword));
    currentPage = 1; // Reset to the first page when searching
    renderLaporan(filteredLaporan);
  });

  searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });

  const createReportButton = document.getElementById('create-laporan-button');
  createReportButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.body.innerHTML = '';
    window.location.hash = '#/create-laporan';
    createDetailLaporanPage();
  });
};

export default createLaporanPage;
