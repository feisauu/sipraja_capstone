class Navbar extends HTMLElement {
  constructor() {
      super();
      this.render();
  }

  render() {
      this.innerHTML = `
          <nav>
              <div class="navbar-left">
                  <div class="logo">
                      <i class="fas fa-square"></i>
                      <span>SIPRAJA</span>
                  </div>
              </div>
              <ul class="navbar-menu">
                  <li><a href="#">Home</a></li>
                  <li><a href="#">Laporan</a></li>
                  <li><a href="#">About</a></li>
              </ul>
              <div class="navbar-right">
                  <i class="fas fa-bell"></i>
                  <div class="user">
                      <img src="../images/profil.webp" alt="User Profile">
                      <span>Kim Taehyung</span>
                  </div>
              </div>
          </nav>
      `;
  }
}

customElements.define('navbar-component', Navbar);
