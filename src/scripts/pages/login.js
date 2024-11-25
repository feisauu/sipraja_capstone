/* eslint-disable no-alert */
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
            <a href="#" class="forgot-password">Lupa password?</a>
          </div>
          <button type="submit" class="btn primary">Masuk</button>
          <p class="register-link">Belum punya akun? <a href="#/register" id="register-link">Daftar disini</a></p>
        </form>
      </section>
    </main>
  `;

  // Tambahkan event listener untuk form login
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah form reload halaman

    // Ambil data dari form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validasi login dengan data dummy
    if (email === 'kimtaehyung@gmail.com' && password === 'password123') {
      console.log('Login berhasil. Mengarahkan ke dashboard...');
      window.location.hash = '#/dashboard';
    } else {
      console.log('Login gagal.');
      alert('Email atau kata sandi salah. Silakan coba lagi.');
    }
  });

  // Navigasi ke halaman register
  const registerLink = document.getElementById('register-link');
  registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    window.location.hash = '#/register';
  });
};

export default renderLoginPage;
