/* eslint-disable no-loop-func */
/* eslint-disable new-cap */
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
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../../components/modal-admin.js';
import ENDPOINT from '../globals/endpoint';
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

  // Membuat menu sidebar
  const menu = document.createElement('nav');
  menu.className = 'menu';

  menu.innerHTML = `
      <div class="menu-section-admin">
        <span>Menu</span>
        <a href="#/dashboard-admin" class="${window.location.hash === '#/dashboard-admin' ? 'active' : ''}">
          <i class="fas fa-home"></i>Dashboard
        </a>
        <a href="#/laporan-admin" class="${window.location.hash === '#/laporan-admin' ? 'active' : ''}">
          <i class="fas fa-file-alt"></i>Laporan
        </a>
        <a href="#/arsip-admin" class="${window.location.hash === '#/arsip-admin' ? 'active' : ''}">
          <i class="fas fa-archive"></i>Arsip Laporan
        </a>
      </div>
      <div class="menu-section-admin">
        <span>Akun</span>
        <a href="#/profil-admin" class="${window.location.hash === '#/profil-admin' ? 'active' : ''}">
          <i class="fas fa-user"></i>Profil
        </a>
        <a href="#" id="logoutLink">
          <i class="fas fa-sign-out-alt"></i>Keluar
        </a>
      </div>
  `;

  sidebar.append(logo, menu);
  document.body.appendChild(sidebar);

  // Menambahkan event listener untuk hashchange
  window.addEventListener('hashchange', () => {
    // Ambil semua tautan di menu
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach((link) => {
      // Hapus kelas 'active' dari semua tautan
      link.classList.remove('active');

      // Tambahkan kelas 'active' pada tautan yang sesuai dengan hash URL saat ini
      if (link.getAttribute('href') === window.location.hash) {
        link.classList.add('active');
      }
    });
  });

  // Event listener untuk logout
  document.getElementById('logoutLink').addEventListener('click', async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem('authToken');

    Swal.fire({
      title: 'Konfirmasi Logout',
      text: 'Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch('https://backend-sipraja.vercel.app/api/v1/user/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
              Authorization: `Bearer ${authToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Gagal logout, silakan coba lagi.');
          }

          localStorage.removeItem('authToken');
          localStorage.removeItem('userId');

          Swal.fire({
            title: 'Berhasil Logout',
            text: 'Anda telah keluar dari aplikasi.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });

          setTimeout(() => {
            // Clean up admin-specific styles and scripts
            document.body.className = '';
            document.body.innerHTML = '';
            // Redirect to the login page
            window.location.hash = '#/login';
          }, 2000);
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: error.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  });

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
      <button class="filter-btn-admin" id="filterBtn"><i class="fas fa-search"></i> Cari</button>
      <button class="print-btn-laporan"><i class="fas fa-print"></i> Cetak Laporan</button>
    </section>
  `;

  // Table Section
  const tableContainer = document.createElement('div');
  tableContainer.className = 'table-container-admin';
  tableContainer.innerHTML = `
  <div id="paginationControls"></div>
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
    <form id="statusForm">
      <label><input type="radio" name="status" value="semua" checked><span>Semua</span></label>
      <label><input type="radio" name="status" value="selesai"><span>Selesai</span></label>
      <label><input type="radio" name="status" value="di proses"><span>Diproses</span></label>
      <label><input type="radio" name="status" value="belum di proses"><span>Belum Diproses</span></label>
    </form>
    <h3>Kategori Laporan</h3>
    <form id="kategoriForm">
      <label><input type="radio" name="kategori" value="semua" checked><span>Semua</span></label>
      <label><input type="radio" name="kategori" value="jalan"><span>Jalan</span></label>
      <label><input type="radio" name="kategori" value="jembatan"><span>Jembatan</span></label>
      <label><input type="radio" name="kategori" value="lalu_lintas"><span>Lalu Lintas</span></label>
    </form>
  `;

  const pagination = document.createElement('div');
  pagination.className = 'pagination';
  pagination.innerHTML = `
    <button class="page-btn" id="prevPageBtn"><< Sebelumnya</button>
    <div id="paginationControls" class="pagination-controls"></div>
    <button class="page-btn" id="nextPageBtn">Selanjutnya >></button>
  `;

  // Add sidebar filters to the page
  mainContent.append(header, filterSection, tableContainer, sidebarFilters, pagination);
  container.append(sidebar, mainContent);
  document.body.appendChild(container);

  let currentPage = 1;
  const reportsPerPage = 5;

  // Fetch Laporan data and display in table
  const fetchLaporanData = async (filters = {}, page = 1) => {
    const userId = localStorage.getItem('userId');
    const authToken = localStorage.getItem('authToken');

    if (!userId || !authToken) {
      console.error('User ID atau Auth Token tidak ditemukan di localStorage');
      return;
    }

    try {
      filters.page = page;
      filters.limit = reportsPerPage;
      filters.search = filters.search || ''; // Pastikan search selalu ada

      // Default filters jika belum ada
      filters.status = filters.status || 'semua';
      filters.kategori = filters.kategori || 'semua';

      console.log('Filters sent to API:', filters);

      const response = await fetch(`${ENDPOINT.GETLAPORAN}?${new URLSearchParams(filters).toString()}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal memuat laporan.');
      }

      const data = await response.json();
      console.log('Data received from API:', data);

      const laporanData = Array.isArray(data.message) ? data.message : [];
      const totalReports = data.total || 0;

      const laporanTableBody = document.getElementById('laporanTableBody');
      laporanTableBody.innerHTML = '';

      if (laporanData.length === 0) {
        laporanTableBody.innerHTML = '<tr><td colspan="7">Tidak ada laporan ditemukan.</td></tr>';
        return;
      }

      // Apply filtering logic to laporanData as before
      const filteredLaporanData = laporanData.filter((laporan) => {
        const matchesStatus = filters.status === 'semua' || laporan.status.toLowerCase() === filters.status;
        const matchesKategori = filters.kategori === 'semua' || laporan.kategori.toLowerCase() === filters.kategori;
        const matchesSearch = filters.search.toLowerCase();
        const matchesNama = laporan.nama.toLowerCase().includes(matchesSearch);
        const matchesJudul = laporan.judul.toLowerCase().includes(matchesSearch);
        const matchesStatusSearch = laporan.status.toLowerCase().includes(matchesSearch);
        const matchesLokasi = laporan.lokasi.toLowerCase().includes(matchesSearch);
        const matchesKategoriSearch = laporan.kategori.toLowerCase().includes(matchesSearch);
        const matchesTanggal = (!filters.start_date || new Date(laporan.tanggal) >= new Date(filters.start_date))
          && (!filters.end_date || new Date(laporan.tanggal) <= new Date(filters.end_date));

        return !laporan.isArchived && matchesStatus && matchesKategori && (matchesNama || matchesJudul || matchesStatusSearch || matchesLokasi || matchesKategoriSearch) && matchesTanggal;
      });

      console.log('Filtered laporanData:', filteredLaporanData);

      const paginatedLaporanData = filteredLaporanData.slice((page - 1) * reportsPerPage, page * reportsPerPage);

      paginatedLaporanData.forEach((laporan, index) => {
        const row = document.createElement('tr');
        row.id = `laporan-${laporan._id}`;
        row.innerHTML = `
          <td>${(page - 1) * reportsPerPage + index + 1}</td>
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

      const totalPages = Math.ceil(totalReports / reportsPerPage);
      updatePagination(totalPages, page);
    } catch (error) {
      console.error('Error fetching laporan data:', error);
    }
  };

  // Initial load of laporan data
  fetchLaporanData({ status: 'semua', kategori: 'semua' }, currentPage);

  // Filter event listeners
  document.getElementById('statusForm').addEventListener('change', () => {
    applyFilters();
  });

  document.getElementById('kategoriForm').addEventListener('change', () => {
    applyFilters();
  });

  const applyFilters = () => {
    const selectedStatus = document.querySelector('input[name="status"]:checked').value;
    const selectedKategori = document.querySelector('input[name="kategori"]:checked').value;

    fetchLaporanData({ status: selectedStatus, kategori: selectedKategori, search: '' }, currentPage);
  };

  // Handle pagination
  const updatePagination = (totalPages, currentPage) => {
    const paginationControls = document.getElementById('paginationControls');

    if (!paginationControls) {
      console.error('Pagination controls element not found.');
      return;
    }

    // Disable/enable pagination buttons based on currentPage
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    if (prevPageBtn) {
      prevPageBtn.disabled = currentPage === 1;
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = currentPage === totalPages;
    }

    // Update page buttons dynamically
    paginationControls.innerHTML = ''; // Clear existing page buttons

    // Adding page buttons
    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.id = `page${i}Btn`;
      pageBtn.textContent = i;
      pageBtn.classList.add('page-btn');
      pageBtn.classList.toggle('active', i === currentPage);
      pageBtn.addEventListener('click', () => {
        currentPage = i;
        fetchLaporanData({}, i);
      });
      paginationControls.appendChild(pageBtn);
    }
  };

  // Handle page change
  document.getElementById('prevPageBtn')?.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchLaporanData({}, currentPage);
    }
  });

  document.getElementById('nextPageBtn')?.addEventListener('click', () => {
    currentPage++;
    fetchLaporanData({}, currentPage);
  });

  // Handle filter button click
  const filterButton = document.getElementById('filterBtn');
  filterButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput')?.value || '';
    const startDate = document.getElementById('startDate')?.value || '';
    const endDate = document.getElementById('endDate')?.value || '';
    const status = document.querySelector('input[name="status"]:checked')?.value || 'semua';
    const kategori = document.querySelector('input[name="kategori"]:checked')?.value || 'semua';

    // Log applied filters
    console.log('Filters applied:', {
      search: searchInput,
      start_date: startDate,
      end_date: endDate,
      status: status !== 'semua' ? status : '',
      kategori: kategori !== 'semua' ? kategori : '',
    });

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

  const printReport = () => {
    const doc = new jsPDF();

    // Get table content
    const tableContent = document.querySelectorAll('.table-container-admin table')[0];
    const tableHeaders = Array.from(tableContent.querySelectorAll('thead th')).map((th) => th.innerText);
    const tableRows = Array.from(tableContent.querySelectorAll('tbody tr')).map((tr) => Array.from(tr.querySelectorAll('td')).map((td) => td.innerText));

    // Add title to the PDF
    doc.setFontSize(18);
    doc.text('Data Laporan', 14, 20);

    // Use autoTable to format the table
    doc.autoTable({
      head: [tableHeaders],
      body: tableRows,
      startY: 30,
      theme: 'striped',
      headStyles: {
        fillColor: [22, 160, 133], // Customize the header background color
      },
      margin: { top: 20 },
    });

    // Save the PDF
    doc.save('data-laporan.pdf');
  };

  // Add event listener for the print button
  document.querySelector('.print-btn-laporan').addEventListener('click', printReport);
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
      { value: 'belum di proses', label: 'Belum Diproses' },
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

/// Handle the Archive Button click
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
      // Clear the table before updating
      const tableBody = document.getElementById('laporanTableBody');
      tableBody.innerHTML = ''; // Mengosongkan tabel arsip

      // Show success message
      Swal.fire(
        'Tersimpan!',
        'Laporan telah berhasil diarsipkan.',
        'success',
      );

      // Redirect to archive page
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
