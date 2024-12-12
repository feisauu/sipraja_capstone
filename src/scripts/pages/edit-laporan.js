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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch report details.');
    }

    const data = await response.json();
    return data.laporan;
  } catch (error) {
    console.error('Error fetching report details:', error);
    throw error;
  }
};

const updateLaporanDetail = async (id, updatedData) => {
  try {
    const response = await fetch(`${ENDPOINT.PUTLAPORAN}${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update report.');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating report details:', error);
    throw error;
  }
};

const createEditLaporanPage = async () => {
  const laporanId = getLaporanIdFromUrl();

  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const loadingContainer = document.createElement('div');
  loadingContainer.className = 'edit-loading-container';
  loadingContainer.innerHTML = `
    <div class="edit-loading">
      <p>Loading report for editing...</p>
    </div>
  `;
  document.body.appendChild(loadingContainer);

  try {
    const laporan = await fetchLaporanDetail(laporanId);

    loadingContainer.remove();

    const detailLaporanSection = document.createElement('div');
    detailLaporanSection.className = 'detail-laporan';
    detailLaporanSection.innerHTML = `
      <h1 class="form-title">Formulir Edit Laporan</h1>
      <form id="form-laporan" class="form-container">
        <div class="form-group">
          <label for="nama">Nama Pelapor</label>
          <input type="text" id="nama" name="nama" placeholder="Masukkan Nama Anda" value="${laporan.nama || ''}" required>
        </div>

        <div class="form-group">
          <label for="tanggal">Tanggal Laporan</label>
          <input type="date" id="tanggal" name="tanggal" value="${laporan.tanggal || ''}" required>
        </div>

        <div class="form-group">
          <label for="judul">Judul Laporan</label>
          <input type="text" id="judul" name="judul" placeholder="Masukkan Judul Laporan" value="${laporan.judul || ''}" required>
        </div>

        <div class="form-group">
          <label for="kategori">Kategori Laporan</label>
          <input type="text" id="kategori" name="kategori" placeholder="Masukkan Kategori Laporan" value="${laporan.kategori || ''}" required>
        </div>

        <div class="form-group">
          <label for="lokasi">Lokasi</label>
          <input type="text" id="lokasi" name="lokasi" placeholder="Masukkan Lokasi" value="${laporan.lokasi || ''}" required>
        </div>

        <div class="form-group">
          <label for="deskripsi">Deskripsi Masalah</label>
          <textarea id="deskripsi" name="description" placeholder="Masukkan Deskripsi Masalah" rows="5" required>${laporan.description || ''}</textarea>
        </div>

        <div class="form-group">
          <label for="foto">Foto Pendukung</label>
          <div class="file-upload">
            <label for="foto" class="file-upload-label" style="color: white">Klik di sini untuk upload foto</label>
            <input type="file" id="foto" name="gambar_pendukung" accept="image/*" multiple>
            <span class="file-upload-info">Pilih beberapa foto pendukung (opsional).</span>
            <div id="preview-container" class="preview-container"></div>
          </div>
        </div>

        <button type="submit" class="form-submit-button">Simpan</button>
        <button type="button" id="cancel-button" class="form-cancel-button">Batal</button>
      </form>
    `;

    document.body.appendChild(detailLaporanSection);

    const fotoInput = document.getElementById('foto');
    const previewContainer = document.getElementById('preview-container');
    fotoInput.addEventListener('change', () => {
      previewContainer.innerHTML = '';
      const files = Array.from(fotoInput.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.classList.add('preview-image');
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });

    document.getElementById('cancel-button').addEventListener('click', () => {
      window.location.hash = `#/detailnya?id=${laporanId}`;
    });

    document.getElementById('form-laporan').addEventListener('submit', async (e) => {
      e.preventDefault();

      const updatedData = {
        judul: document.getElementById('judul').value,
        nama: document.getElementById('nama').value,
        tanggal: document.getElementById('tanggal').value,
        kategori: document.getElementById('kategori').value,
        lokasi: document.getElementById('lokasi').value,
        description: document.getElementById('deskripsi').value,
      };

      // Handle file upload
      const fotoInput = document.getElementById('foto');
      const files = fotoInput.files;
      if (files.length > 0) {
        const formData = new FormData();
        formData.append('gambar_pendukung', files[0]);
        updatedData.gambar_pendukung = formData;
      }

      try {
        await updateLaporanDetail(laporanId, updatedData);
        alert('Laporan berhasil diperbarui!');
        window.location.hash = '#/laporan';
      } catch (error) {
        alert(`Gagal memperbarui laporan: ${error.message}`);
      }
    });

  } catch (error) {
    loadingContainer.remove();
    const errorContainer = document.createElement('div');
    errorContainer.className = 'edit-error-container';
    errorContainer.innerHTML = `<h1 class="edit-error-title">Error</h1><p>${error.message}</p>`;
    document.body.appendChild(errorContainer);
  }

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createEditLaporanPage;
