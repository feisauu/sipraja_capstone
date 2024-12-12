/* eslint-disable no-alert */
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const renderRegisterPage = () => {
  document.body.innerHTML = `
    <main>
      <section class="welcome-section-register">
        <h1>Selamat datang!</h1>
        <p class="subtitle">Ayo buat akunmu terlebih dahulu!</p>
      </section>

      <section class="register-container">
        <form id="register-form">
          <h1>Daftar Akun</h1>

          <div class="form-group">
            <label for="name">Nama</label>
            <input type="text" id="name" placeholder="Masukkan nama" required>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Masukkan email" required>
          </div>

          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <input type="password" id="password" placeholder="*******" required>
          </div>

          <div class="form-group">
            <label for="confirm-password">Konfirmasi Kata Sandi</label>
            <input type="password" id="confirm-password" placeholder="*******" required>
          </div>

          <div class="form-group">
            <label for="phone">Nomor Telepon</label>
            <input type="tel" id="phone" placeholder="Masukkan nomor telepon" required>
          </div>

          <button type="submit" class="btn primary" id="register-button">Daftar</button>
          <p class="login-link">Sudah punya akun? <a href="#" id="login-link">Masuk disini</a></p>
        </form>
      </section>
    </main>
  `;

  // Validasi Input
  const validateInput = (name, email, password, confirmPassword, phone) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const phonePattern = /^[0-9]+$/;

    if (!name || !email || !password || !confirmPassword || !phone) {
      return 'Semua field harus diisi.';
    }

    if (!emailPattern.test(email)) {
      return 'Format email tidak valid. Gunakan domain @gmail.com.';
    }

    if (password.length < 8) {
      return 'Password harus terdiri dari minimal 8 karakter.';
    }

    if (password !== confirmPassword) {
      return 'Password dan konfirmasi password tidak sesuai.';
    }

    if (!phonePattern.test(phone)) {
      return 'Nomor telepon hanya boleh mengandung angka.';
    }

    return null;
  };

  const registerForm = document.getElementById('register-form');
  const registerButton = document.getElementById('register-button');

  registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Validasi input
    const validationError = validateInput(name, email, password, confirmPassword, phone);
    if (validationError) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: validationError,
      });
      return;
    }

    registerButton.textContent = 'Memproses...';
    registerButton.disabled = true;

    try {
      const response = await fetch(ENDPOINT.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nama: name,
          email,
          password,
          confirm_password: confirmPassword,
          telp: phone,
        }),
      });

      const textResponse = await response.text();
      console.log('Raw Response:', textResponse);

      if (!response.ok) {
        const errorData = JSON.parse(textResponse);
        console.error('Error Details:', errorData);
        Swal.fire({
          icon: 'error',
          title: 'Registrasi Gagal',
          text: errorData.message || 'Terjadi kesalahan saat registrasi.',
        });
        return;
      }

      const jsonResponse = JSON.parse(textResponse);
      console.log('Success Response:', jsonResponse);

      Swal.fire({
        icon: 'success',
        title: 'Registrasi Berhasil',
        text: jsonResponse.message || 'Akun Anda telah berhasil dibuat!',
      }).then(() => {
        document.body.classList.remove('swal2-shown');
        document.body.style.overflow = '';

        window.location.hash = '#/login';
      });
    } catch (error) {
      console.error('Error:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Registrasi Gagal',
        text: `Registrasi gagal: ${error.message}`,
      });
    } finally {
      // Reset button state
      registerButton.textContent = 'Daftar';
      registerButton.disabled = false;
    }
  });
};

export default renderRegisterPage;
