/* eslint-disable quotes */
class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <footer>
        <p>Capstone Project Dicoding 2024</p>
    </footer>
        `;
  }
}

customElements.define("footer-component", Footer);
