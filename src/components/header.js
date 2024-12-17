class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header>
      <nav>
        <div class="navbar-left">
          <div class="logo">
            <span class="logo-icon">S</span>
            <span class="logo-text">SIPRAJA</span>
          </div>
        </div>
        <div class="hamburger" id="hamburger">
          <i class="fas fa-bars"></i>
        </div>
        <div class="auth-buttons" id="authButtons">
          <button class="login" id="loginButton">Login</button>
          <button class="signup" id="signupButton">Sign Up</button>
        </div>
      </nav>
    </header>
    `;

    // Event listener untuk login button
    const loginButton = this.querySelector('#loginButton');
    loginButton.addEventListener('click', () => {
      window.location.hash = '#/login';
    });

    // Event listener untuk sign up button
    const signupButton = this.querySelector('#signupButton');
    signupButton.addEventListener('click', () => {
      window.location.hash = '#/register';
    });

    // Event listener untuk hamburger button
    const hamburgerButton = this.querySelector('#hamburger');
    const authButtons = this.querySelector('#authButtons');
    hamburgerButton.addEventListener('click', () => {
      authButtons.classList.toggle('active');
    });
  }
}

customElements.define('header-component', HeaderComponent);
