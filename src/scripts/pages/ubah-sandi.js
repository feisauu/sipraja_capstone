import '../../components/navbar.js';
import '../../components/footer.js';
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const renderResetPasswordPage = async () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('authToken');

  if (!userId || !authToken) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'ID pengguna atau token tidak ditemukan. Silakan login ulang.',
    });
    return;
  }

  const mainContent = document.createElement('main');
  mainContent.className = 'reset-password-wrapper';
  mainContent.innerHTML = `
    <section class="reset-password-container">
      <form id="reset-password-form" class="reset-password-form">
        <h1 class="reset-password-title">Reset Kata Sandi</h1>
        <div class="reset-password-group">
          <label for="old-password">Kata Sandi Lama</label>
          <input type="password" id="old-password" name="oldPassword" placeholder="Masukkan kata sandi lama" required />
        </div>
        <div class="reset-password-group">
          <label for="new-password">Kata Sandi Baru</label>
          <input type="password" id="new-password" name="newPassword" placeholder="Masukkan kata sandi baru" required />
        </div>
        <div class="reset-password-group">
          <label for="confirm-password">Konfirmasi Kata Sandi Baru</label>
          <input type="password" id="confirm-password" name="confirmNewPassword" placeholder="Konfirmasi kata sandi baru" required />
        </div>
        <button type="submit" class="reset-password-button">Reset</button>
        <button type="button" id="cancel-reset-button" class="cancel-profile-button">Cancel</button>
      </form>
    </section>
  `;

  document.body.appendChild(mainContent);

  document.getElementById('cancel-reset-button').addEventListener('click', () => {
    window.location.hash = '#/profile';
  });

  const resetForm = document.getElementById('reset-password-form');
  resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmNewPassword = document.getElementById('confirm-password').value;

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Kata sandi baru dan konfirmasi tidak cocok.',
      });
      return;
    }

    try {
      const response = await fetch(`${ENDPOINT.UPDATEPASSWORD}/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword, confirmNewPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mereset kata sandi.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Kata sandi berhasil direset.',
      }).then(() => {
        window.location.hash = '#/profile';
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  });

  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default renderResetPasswordPage;
