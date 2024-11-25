/* eslint-disable import/prefer-default-export */
export class HamburgerMenu extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = '<i class="fas fa-bars"></i>';
  }

  connectedCallback() {
    this.addEventListener('click', () => {
      const authButtons = document.querySelector('auth-buttons');
      authButtons.classList.toggle('active');
    });
  }
}

customElements.define('hamburger-menu', HamburgerMenu);
