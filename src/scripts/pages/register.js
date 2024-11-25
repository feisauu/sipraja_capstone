const renderRegisterPage = () => {
  document.body.innerHTML = `
       <main>
    <section class="register-container">
      <form id="register-form">
        <h1>Daftar Akun</h1>

        <!-- Upload Foto Profil -->
        <div class="form-group profile-upload">
          <label for="profile-picture">Foto Profil</label>
          <input type="file" id="profile-picture" accept="image/*" required>
          <small>Unggah foto profil Anda</small>
        </div>

        <div class="form-group">
          <label for="name">Nama</label>
          <input type="text" id="name" placeholder="Kim Taehyung" required>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="kimtaehyung@gmail.com" required>
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
          <input type="tel" id="phone" placeholder="0812345678901" required>
        </div>

        <button type="submit" class="btn primary">Daftar</button>
        <p class="login-link">Sudah punya akun? <a href="#" id="login-link">Masuk disini</a></p>
      </form>
    </section>
  </main>
    `;
};

export default renderRegisterPage;
