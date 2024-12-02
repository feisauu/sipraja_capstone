// eslint-disable-next-line import/extensions
import createLaporanPage from './pages/laporan.js';
// eslint-disable-next-line import/extensions
import createDetailLaporanPage from './pages/detail-laporan.js';

const router = () => {
  const path = window.location.hash;
  document.body.innerHTML = '';

  if (path === '#detail-laporan') {
    createDetailLaporanPage();
  } else {
    createLaporanPage();
  }
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
