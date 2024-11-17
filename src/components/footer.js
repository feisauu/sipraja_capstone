class Footer extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
            <p>Capstone Project Dicoding 2024</p>
        `;
  }
}

customElements.define("footer-component", Footer);
