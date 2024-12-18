/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import '../../components/navbar.js';
import '../../components/footer.js';
import '../../components/section-page.js';
import '../../components/notif-item.js';

const createNotificationPage = () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const notifSection = document.createElement('section-page');
  notifSection.setAttribute('title', 'Notifikasi');

  const notifItem1 = document.createElement('notif-item');
  notifItem1.setAttribute('status', 'Laporan Selesai');
  notifItem1.setAttribute('time', '2 hari yang lalu');
  notifItem1.innerHTML = `
    ✅ Laporan Anda Telah Selesai Diproses! Selamat! Laporan Anda melalui SIPRAJA telah berhasil diproses dengan baik. Terima kasih atas kepercayaan Anda kepada layanan kami. Anda dapat segera memeriksa hasilnya melalui sistem. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
  `;

  const notifItem2 = document.createElement('notif-item');
  notifItem2.setAttribute('status', 'Laporan Diproses');
  notifItem2.setAttribute('time', '2 hari yang lalu');
  notifItem2.innerHTML = `
    🔄 Laporan Anda Sedang Diproses! Terima kasih telah menggunakan layanan SIPRAJA. Tim kami saat ini sedang memproses laporan Anda. Proses ini mungkin memerlukan waktu, namun kami pastikan laporan Anda ditangani dengan sebaik-baiknya. Harap bersabar, dan kami akan segera memberikan pembaruan berikutnya.
  `;

  const notifItem3 = document.createElement('notif-item');
  notifItem3.setAttribute('status', 'Laporan Selesai');
  notifItem3.setAttribute('time', '2 hari yang lalu');
  notifItem3.innerHTML = `
    ✅ Laporan Anda Telah Selesai Diproses! Selamat! Laporan Anda melalui SIPRAJA telah berhasil diproses dengan baik. Terima kasih atas kepercayaan Anda kepada layanan kami. Anda dapat segera memeriksa hasilnya melalui sistem. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami.
  `;

  notifSection.appendChild(notifItem1);
  notifSection.appendChild(notifItem2);
  notifSection.appendChild(notifItem3);

  document.body.appendChild(notifSection);

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createNotificationPage;
