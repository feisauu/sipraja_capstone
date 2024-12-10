/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import Swal from 'sweetalert2';
import '../../components/modal-admin.js';
import ENDPOINT from '../globals/endpoint'; // Assuming you have the ENDPOINTs imported
// eslint-disable-next-line no-unused-vars
import CONFIG from '../globals/config';

const createLaporanAdmin = () => {
  document.body.className = 'admin-page';

  // Container
  const container = document.createElement('div');
  container.className = 'container-admin';

  // Sidebar
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar-admin';

  const logo = document.createElement('div');
  logo.className = 'logo-admin';
  logo.textContent = 'ADMIN SIPRAJA';

  const menu = document.createElement('nav');
  menu.className = 'menu';
  menu.innerHTML = `
    <div class="menu-section-admin">
        <span>Menu</span>
        <a href="#/dashboard-admin" class="active"><i class="fas fa-home"></i>Dashboard</a>
        <a href="#/laporan-admin"><i class="fas fa-file-alt"></i>Laporan</a>
        <a href="#/arsip-admin"><i class="fas fa-archive"></i>Arsip Laporan</a>
      </div>
      <div class="menu-section-admin">
        <span>Akun</span>
        <a href="#/profil-admin"><i class="fas fa-user"></i>Profil</a>
        <a href="#"><i class="fas fa-sign-out-alt"></i>Keluar</a>
      </div>
  `;
  sidebar.append(logo, menu);

  // Main Content
  const mainContent = document.createElement('main');
  mainContent.className = 'content-admin';

  const header = document.createElement('div');
  header.className = 'header-admin';
  header.innerHTML = `
    <div class="user-info-admin">
      <i class="fas fa-bell bell-icon"></i>
      <span class="user-name">Admin</span>
    </div>
  `;

  // Filter Section
  const filterSection = document.createElement('section');
  filterSection.className = 'filters-admin';
  filterSection.innerHTML = `
    <h2 class="h2">Laporan</h2>
    <section class="filters-admin">
      <div class="filter-input-admin">
        <input type="text" id="searchInput" placeholder="Cari Laporan">
      </div>
      <div class="filter-date-admin">
        <input type="date" id="startDate">
        <span>To</span>
        <input type="date" id="endDate">
      </div>
      <button class="filter-btn-admin" id="filterBtn">Cari</button>
    </section>
  `;

  // Table Section
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container-admin';
  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Nama</th>
          <th>Status</th>
          <th>Kategori</th>
          <th>Lokasi</th>
          <th>Tanggal</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody id="laporanTableBody">
        <!-- Reports will be populated here dynamically -->
      </tbody>
    </table>
  `;

  // Sidebar Filters
  const sidebarFilters = document.createElement('div');
  sidebarFilters.className = 'filters-sidebar-admin';
  sidebarFilters.innerHTML = `
    <h3>Status Laporan</h3>
    <form>
      <label><input type="radio" name="status" value="semua" checked><span>Semua</span></label>
      <label><input type="radio" name="status" value="selesai"><span>Selesai</span></label>
      <label><input type="radio" name="status" value="diproses"><span>Diproses</span></label>
      <label><input type="radio" name="status" value="belum_diproses"><span>Belum Diproses</span></label>
    </form>
    <h3>Kategori Laporan</h3>
    <form>
      <label><input type="radio" name="kategori" value="semua" checked><span>Semua</span></label>
      <label><input type="radio" name="kategori" value="jalan"><span>Jalan</span></label>
      <label><input type="radio" name="kategori" value="jembatan"><span>Jembatan</span></label>
      <label><input type="radio" name="kategori" value="lalu_lintas"><span>Lalu Lintas</span></label>
    </form>
  `;

  // Pagination
  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.innerHTML = `
    <button class="page-btn" id="prevPageBtn">«</button>
    <button class="page-btn active" id="page1Btn">1</button>
    <button class="page-btn" id="page2Btn">2</button>
    <button class="page-btn" id="page3Btn">3</button>
    <button class="page-btn" id="nextPageBtn">»</button>
  `;

  mainContent.append(header, filterSection, tableContainer, sidebarFilters, pagination);
  container.append(sidebar, mainContent);
  document.body.appendChild(container);

  let currentPage = 1;
  const reportsPerPage = 10;

  // Fetch Laporan data and display in table
  const fetchLaporanData = async (filters = {}, page = 1) => {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      return;
    }

    try {
      // Add pagination to the filters
      filters.page = page;
      filters.limit = reportsPerPage;

      const response = await fetch(`${ENDPOINT.GETLAPORAN}?${new URLSearchParams(filters).toString()}`, {
        method: 'GET',
        credentials: 'include', // Send cookies for cross-domain requests
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memuat laporan.');
      }

      const data = await response.json();
      const laporanData = Array.isArray(data.message) ? data.message : [];
      const totalReports = data.total || 0;

      if (laporanData.length === 0) {
        console.error('No laporan data found.');
        return;
      }

      const laporanTableBody = document.getElementById('laporanTableBody');
      laporanTableBody.innerHTML = ''; // Clear existing data

      laporanData.forEach((laporan, index) => {
        const row = document.createElement('tr');
        row.id = `laporan-${laporan._id}`;
        row.innerHTML = `
  <td>${(currentPage - 1) * reportsPerPage + index + 1}</td>
  <td><a href="#/konfirmasi/${laporan._id}">
      <strong>${laporan.judul}</strong><br>
      <small>${laporan.nama}</small>
    </a>
  </td>
  <td><span class="status ${laporan.status.toLowerCase()}" id="status-${laporan._id}">${laporan.status}</span></td>
  <td>${laporan.kategori}</td>
  <td>${laporan.lokasi}</td>
  <td>${laporan.tanggal}</td>
  <td class="action-icons">
    <button class="icon edit-btn" onclick="showEditForm('${laporan._id}', '${laporan.status}')">
      <i class="fas fa-edit"></i> 
    </button>
    <button class="icon delete-btn" onclick="deleteLaporan('${laporan._id}')">
      <i class="fas fa-trash-alt"></i> 
    </button>
    <button class="archive-btn" onclick="archiveLaporan('${laporan._id}')">
      <i class="fas fa-folder-plus"></i> 
    </button>
  </td>
`;
        laporanTableBody.appendChild(row);
      });

      // Handle pagination
      const totalPages = Math.ceil(totalReports / reportsPerPage);
      updatePagination(totalPages, page);
    } catch (error) {
      console.error('Error fetching laporan data:', error);
    }
  };

  // Handle pagination
  const updatePagination = (totalPages, currentPage) => {
    // Disable/enable pagination buttons based on currentPage
    document.getElementById('prevPageBtn').disabled = currentPage === 1;
    document.getElementById('nextPageBtn').disabled = currentPage === totalPages;

    // Update page buttons dynamically
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.getElementById(`page${i}Btn`);
      if (pageBtn) {
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage);
      }
    }
  };

  // Handle page change
  document.getElementById('prevPageBtn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchLaporanData({}, currentPage);
    }
  });

  document.getElementById('nextPageBtn').addEventListener('click', () => {
    currentPage++;
    fetchLaporanData({}, currentPage);
  });

  // Handle filter button click
  const filterButton = document.getElementById('filterBtn');
  filterButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const kategori = document.querySelector('input[name="kategori"]:checked').value;

    // Send filters to the API
    const filters = {
      search: searchInput,
      start_date: startDate,
      end_date: endDate,
      status: status !== 'semua' ? status : '',
      kategori: kategori !== 'semua' ? kategori : '',
    };

    fetchLaporanData(filters, currentPage);
  });

  // Initialize with all laporan data
  fetchLaporanData({}, currentPage);
};

// Menampilkan form untuk mengedit status laporan
window.showEditForm = (id, currentStatus) => {
  // Membuat elemen modal
  const modal = document.createElement('modal-component');
  document.body.appendChild(modal); // Menambahkan modal ke DOM

  // Tunggu hingga modal siap di-render
  setTimeout(() => {
    // Mendapatkan referensi ke dropdown statusSelect dalam shadowRoot
    const select = modal.shadowRoot.querySelector('#statusSelect');
    if (!select) {
      console.error('Dropdown statusSelect tidak ditemukan.');
      return;
    }

    // Reset opsi lama dan tambahkan opsi baru
    select.innerHTML = '';
    const options = [
      { value: 'belum diproses', label: 'Belum Diproses' },
      { value: 'di proses', label: 'Diproses' },
      { value: 'selesai', label: 'Selesai' },
    ];

    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.label;
      if (currentStatus === option.value) {
        optionElement.selected = true;
      }
      select.appendChild(optionElement);
    });

    // Menampilkan modal dengan memanggil metode open()
    modal.open();

    // Menambahkan event listener ke tombol update
    const updateButton = modal.shadowRoot.querySelector('#updateButton');
    if (updateButton) {
      updateButton.onclick = () => {
        updateStatus(id, select.value);
      };
    }

    // Menambahkan event listener ke tombol close
    const closeButton = modal.shadowRoot.querySelector('#closeModal');
    if (closeButton) {
      closeButton.onclick = () => {
        modal.close();
        modal.remove();
      };
    }

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.close();
        modal.remove();
      }
    };
  }, 100);
};

// Fungsi untuk mengupdate status
window.updateStatus = async (id, newStatus) => {
  const authToken = localStorage.getItem('authToken'); // Ambil token dari localStorage

  if (!authToken) {
    Swal.fire({
      icon: 'warning',
      title: 'Autentikasi Tidak Valid',
      text: 'Silakan login kembali.',
    });
    return;
  }

  try {
    const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/acc/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengupdate status laporan.');
    }

    Swal.fire({
      icon: 'success',
      title: 'Status Diperbarui',
      text: 'Status laporan berhasil diperbarui.',
    });

    document.querySelector('modal-component').remove(); // Hapus modal setelah update berhasil

    // Perbarui status laporan dalam tabel tanpa merefresh halaman
    const statusCell = document.querySelector(`#status-${id}`);
    if (statusCell) {
      statusCell.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1); // Mengubah teks
      statusCell.className = `status ${newStatus}`; // Mengubah kelas untuk menyesuaikan warna
    }
  } catch (error) {
    console.error('Error saat mengupdate status laporan:', error);
    Swal.fire({
      icon: 'error',
      title: 'Kesalahan',
      text: 'Terjadi kesalahan saat memperbarui status laporan.',
    });
  }
};

// Handle delete Laporan
window.deleteLaporan = async (id) => {
  try {
    // Tampilkan SweetAlert untuk konfirmasi
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak dapat mengembalikan laporan yang sudah dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    // Jika pengguna menekan "Ya, hapus!"
    if (result.isConfirmed) {
      // Fetch the authToken from localStorage
      const authToken = localStorage.getItem('authToken');

      // Check if the authToken exists, if not, throw an error
      if (!authToken) {
        throw new Error('Authentication token is missing.');
      }

      // Lakukan permintaan ke API untuk menghapus laporan
      const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Tampilkan notifikasi berhasil
        Swal.fire({
          title: 'Berhasil!',
          text: 'Laporan berhasil dihapus.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        // Hapus elemen DOM yang terkait dengan laporan
        const laporanElement = document.getElementById(`laporan-${id}`);
        if (laporanElement) {
          laporanElement.remove(); // Hapus elemen dari DOM
        }
      } else {
        const responseText = await response.text();
        console.error('Error response:', responseText);

        // Tampilkan notifikasi gagal
        Swal.fire({
          title: 'Gagal!',
          text: `Gagal menghapus laporan: ${responseText}`,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } else {
      // Tampilkan notifikasi jika pengguna membatalkan
      Swal.fire({
        title: 'Dibatalkan!',
        text: 'Laporan tidak dihapus.',
        icon: 'info',
        confirmButtonText: 'OK',
      });
    }
  } catch (error) {
    console.error('Error deleting laporan:', error);

    // Tampilkan notifikasi jika terjadi error
    Swal.fire({
      title: 'Error!',
      text: `Terjadi kesalahan saat menghapus laporan: ${error.message}`,
      icon: 'error',
      confirmButtonText: 'OK',
    });
  }
};

// Handle the Archive Button click
window.archiveLaporan = (id) => {
  Swal.fire({
    title: 'Apa Anda yakin mengarsipkan laporan ini?',
    text: 'Laporan yang diarsipkan tidak dapat dikembalikan lagi!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Ya, arsipkan!',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      // If confirmed, archive the report
      moveToArchive(id);
    }
  });
};

const moveToArchive = async (id) => {
  try {
    const response = await fetch(`https://backend-sipraja.vercel.app/api/v1/laporan/archive/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });

    if (response.ok) {
      Swal.fire(
        'Tersimpan!',
        'Laporan telah berhasil diarsipkan.',
        'success',
      );

      window.location.href = '#/arsip-admin';
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal mengarsipkan laporan.');
    }
  } catch (error) {
    console.error('Error archiving laporan:', error);
    Swal.fire(
      'Terjadi kesalahan!',
      'Gagal mengarsipkan laporan. Silakan coba lagi.',
      'error',
    );
  }
};

export default createLaporanAdmin;
