import Swal from 'sweetalert2'; 
import ENDPOINT from '../globals/endpoint'; 

const renderResetPassword = () => {
        const token = new URLSearchParams(window.location.hash.split('?')[1]).get('token');
      
        if (!token || token.trim() === '') {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Token tidak ditemukan atau tidak valid. Silakan cek email Anda kembali.',
          }).then(() => {
            window.location.hash = '#/login';
          });
          return;
        }

  document.body.innerHTML = `
    <main>
      <section class="reset-password-container">
        <form id="reset-password-form">
          <h1>Reset Kata Sandi</h1>
          <p>Masukkan kata sandi baru Anda.</p>
          <div class="form-group">
            <label for="new-password">Kata Sandi Baru</label>
            <input type="password" id="new-password" placeholder="Masukkan kata sandi baru" required>
          </div>
          <button type="submit" class="btn primary">Reset</button>
        </form>
      </section>
    </main>
  `;

  const resetPasswordForm = document.getElementById('reset-password-form');

  resetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById('new-password').value;
    
    try {
      const response = await fetch(`${ENDPOINT.RESET_PASSWORD}${token}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal mengatur ulang kata sandi.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Kata sandi Anda berhasil diperbarui. Silakan login kembali.',
      }).then(() => {
        window.location.hash = '#/login';
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal',
        text: error.message,
      });
    }
  });
};

export default renderResetPassword;
