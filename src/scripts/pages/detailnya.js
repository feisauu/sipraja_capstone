/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';
import ENDPOINT from '../globals/endpoint';

// Fungsi untuk mendapatkan ID laporan dari URL
const getLaporanIdFromUrl = () => {
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  return params.get('id');
};


// Fetch data laporan detail
const fetchLaporanDetail = async (id) => {
  try {
    const response = await fetch(`${ENDPOINT.GETLAPORAN}${id}`, {
      method: 'GET',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengambil detail laporan.');
    }

    const data = await response.json();
    return data.laporan;
  } catch (error) {
    console.error('Error fetching laporan detail:', error);
    throw error;
  }
};

// Create Detail Laporan Page
const createDetailnyaPage = async (id) => {
  // Tambahkan navbar ke halaman
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  // Tambahkan loading indicator
  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-container';
  loadingContainer.innerHTML = `
    <div class="loading">
      <p>Loading detail laporan...</p>
    </div>
  `;
  document.body.appendChild(loadingContainer);

  try {
    const laporan = await fetchLaporanDetail(id);

    // Hapus loading indicator
    loadingContainer.remove();

    // Buat elemen utama untuk detail laporan
    const detailContainer = document.createElement('div');
    detailContainer.className = 'detail-container';
    detailContainer.innerHTML = `
      <h1>${laporan.judul || 'Judul tidak tersedia'}</h1>
      <div class="detail-content">
        <div class="image-gallery">
          ${laporan.gambar_pendukung?.map((imageUrl, index) => `
            <img src="${imageUrl}" alt="Gambar Pendukung ${index + 1}" class="image-item" />
          `).join('')}
        </div>
        <p><strong>Nama:</strong> ${laporan.nama || 'Tidak tersedia'}</p>
        <p><strong>Tanggal:</strong> ${laporan.tanggal || 'Tidak tersedia'}</p>
        <p><strong>Kategori:</strong> ${laporan.kategori || 'Tidak tersedia'}</p>
        <p><strong>Lokasi:</strong> ${laporan.lokasi || 'Tidak tersedia'}</p>
        <p><strong>Status:</strong> ${laporan.status || 'Tidak tersedia'}</p>
        <p><strong>Deskripsi:</strong></p>
        <p>${laporan.description || 'Tidak tersedia'}</p>
      </div>
      <div class="detail-footer">
        <button id="back-button" class="btn-back">Kembali</button>
      </div>
    `;

    document.body.appendChild(detailContainer);

    // Tambahkan event untuk tombol kembali
    document.getElementById('back-button').addEventListener('click', () => {
      window.location.hash = '#/laporan'; // Kembali ke halaman laporan
    });
  } catch (error) {
    // Hapus loading indicator
    loadingContainer.remove();

    // Tampilkan pesan error
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = `
      <h1>Error</h1>
      <p>${error.message}</p>
    `;
    document.body.appendChild(errorContainer);
  }

  // Tambahkan footer ke halaman
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createDetailnyaPage;
