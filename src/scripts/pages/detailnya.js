/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import '../../components/navbar.js';
import '../../components/footer.js';
import ENDPOINT from '../globals/endpoint';

const getLaporanIdFromUrl = () => {
  const params = new URLSearchParams(window.location.hash.split('?')[1]);
  return params.get('id');
};

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

const createDetailnyaPage = async (id) => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'loading-container';
  loadingContainer.innerHTML = `
  <div class="loading">
    <div class="loading-indicator"></div>
  </div>
`;
  document.body.appendChild(loadingContainer);

  try {
    const laporan = await fetchLaporanDetail(id);

    loadingContainer.remove();

    const detailContainer = document.createElement('div');
    detailContainer.className = 'detail-container';

    const loggedInUserId = localStorage.getItem('userId');

    detailContainer.innerHTML = `
      <h1>${laporan.judul || 'Judul tidak tersedia'}</h1>
      <div class="status-badge">Laporan Selesai</div>
      
      <div class="detail-content">
        <!-- Left section with profile and image gallery -->
        <div class="image-gallery">
          ${
            laporan.gambar_pendukung?.length > 0
              ? laporan.gambar_pendukung
                  .map(
                    (imageUrl, index) =>
                      `<img src="${imageUrl}" alt="Gambar Pendukung ${index + 1}" class="image-item" />`
                  )
                  .join('')
              : '<p>Gambar tidak tersedia</p>'
          }
        </div>

        <!-- Right section with report details -->
        <div class="text-content">
          <p><strong>Nama Pelapor:</strong> ${laporan.nama || 'Tidak tersedia'}</p>
          <p><strong>Tanggal Laporan:</strong> ${laporan.tanggal || 'Tidak tersedia'}</p>
          <p><strong>Kategori Laporan:</strong> ${laporan.kategori || 'Tidak tersedia'}</p>
          <p><strong>Lokasi:</strong> ${laporan.lokasi || 'Tidak tersedia'}</p>
          <p><strong>Status:</strong> ${laporan.status || 'Tidak tersedia'}</p>
          <p><strong>Deskripsi Masalah:</strong></p>
          <p>${laporan.description || 'Tidak tersedia'}</p>
        </div>
      </div>

      <div class="detail-footer">
        ${
          laporan.userId === loggedInUserId
            ? `<button id="edit-button" class="btn-edit">Edit Laporan</button>`
            : ''
        }
        <button id="back-button" class="btn-back">Kembali</button>
      </div>
    `;

    document.body.appendChild(detailContainer);
    localStorage.setItem('lastVisitedPage', '#/laporan');
    localStorage.setItem('lastVisitedPage', '#/laporan-user');
    document.getElementById('back-button').addEventListener('click', () => {
      const lastVisitedPage = localStorage.getItem('lastVisitedPage'); // Default ke #/laporan
      window.location.hash = lastVisitedPage;
    });

    if (laporan.userId === loggedInUserId) {
      const editButton = document.getElementById('edit-button');
      editButton.addEventListener('click', () => {
        window.location.hash = `#/edit-laporan?id=${id}`;
      });
    }
  } catch (error) {
    loadingContainer.remove();

    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = `<h1>Error</h1><p>${error.message}</p>`;
    document.body.appendChild(errorContainer);
  }

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createDetailnyaPage;
