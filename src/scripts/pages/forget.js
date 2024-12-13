
import Swal from 'sweetalert2'; 
import ENDPOINT from '../globals/endpoint'; 

const renderForgetPasswordPage = () => {
  document.body.innerHTML = `
    <main>
      <section class="forget-password-container">
        <form id="forget-password-form">
          <h1>Lupa Password</h1>
          <p>Masukkan email Anda untuk menerima tautan reset password.</p>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="reset-email" placeholder="Masukkan email Anda" required>
          </div>
          <button type="submit" class="btn primary">Kirim</button>
          <button type="button" id="cancel-forget-password" class="btn secondary">Batal</button>
        </form>
      </section>
    </main>
  `;

  const forgetPasswordForm = document.getElementById('forget-password-form');
  forgetPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('reset-email').value;

    try {
      const response = await fetch('https://backend-sipraja.vercel.app/api/v1/reset/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Gagal mengirim email reset password.');
      }

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Email reset password telah dikirim!',
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

  const cancelButton = document.getElementById('cancel-forget-password');
  cancelButton.addEventListener('click', () => {
    window.location.hash = '#/login';
  });
};

export default renderForgetPasswordPage;
