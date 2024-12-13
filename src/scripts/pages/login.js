import '../../components/navbar.js';
import '../../components/footer.js';
import Swal from 'sweetalert2';
import ENDPOINT from '../globals/endpoint';

const renderLoginPage = () => {
  document.body.innerHTML = `
    <main>
      <section class="welcome-section">
        <h1>Selamat datang!</h1>
        <p class="subtitle">Ayo, mulai laporkan kerusakan!</p>
      </section>

      <section class="login-container">
        <form id="login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <div class="input-icon">
              <i class="fas fa-envelope"></i>
              <input type="email" id="email" placeholder="kimtaehyung@gmail.com" required>
            </div>
          </div>
          <div class="form-group">
            <label for="password">Kata Sandi</label>
            <div class="input-icon">
              <i class="fas fa-lock"></i>
              <input type="password" id="password" placeholder="*******" required>
            </div>
          </div>
          <div class="form-footer">
            <a href="#/forget-password" id="forgot-password-link" class="forgot-password">Lupa password?</a>
          </div>
          <button type="submit" class="btn primary">Masuk</button>
          <p class="register-link">Belum punya akun? <a href="#/register" id="register-link">Daftar disini</a></p>
        </form>
      </section>
    </main>
  `;

  // Event listener untuk login
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const response = await fetch(ENDPOINT.LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || 'Login gagal.');
      }

      const result = await response.json();
      localStorage.setItem('authToken', result.token);
      localStorage.setItem('userId', result.userId);
      localStorage.setItem('role', result.role);

      if (result.role === 'admin') {
        window.location.hash = '#/dashboard-admin';
      } else if (result.role === 'user') {
        window.location.hash = '#/dashboard';
      } else {
        Swal.fire('Error', 'Role pengguna tidak dikenali.', 'error');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  });

  // Navigasi ke halaman register
  const registerLink = document.getElementById('register-link');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/register';
  });

  const forgotPasswordLink = document.getElementById('forgot-password-link');
  forgotPasswordLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/lupa-sandi';
  });
};


export default renderLoginPage;
