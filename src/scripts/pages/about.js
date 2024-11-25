/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
// about.js

import '../../components/navbar.js';
import '../../components/footer.js';
import '../../components/section-page.js';
import '../../components/dev-card.js';

const createAboutPage = () => {
  const navbar = document.createElement('navbar-component');
  document.body.appendChild(navbar);

  const aboutSection = document.createElement('section-page');
  aboutSection.setAttribute('title', 'About');
  aboutSection.innerHTML = `
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
      labore ipsa repudiandae laboriosam ea magnam deleniti quia eius illo,
      nam numquam enim consequuntur, dignissimos voluptas assumenda odit hic
      ipsum sequi voluptate cupiditate inventore! Cum dolores temporibus
      assumenda, eius obcaecati, quo vero illum quod magnam itaque mollitia.
      Inventore eius omnis voluptas, placeat, pariatur nam perferendis dolorum
      quo illo odio reprehenderit ad deserunt aspernatur laudantium iusto
      alias explicabo consequuntur debitis a quaerat architecto minus quam.
      Numquam modi sequi, quia repudiandae commodi a maxime ex voluptas
      temporibus ipsa blanditiis et, aliquid, repellendus autem voluptatum hic
      iusto debitis accusantium fugiat in adipisci dignissimos? Cupiditate
      iste ipsum error soluta porro vitae odit, fugiat voluptatum incidunt
      pariatur laboriosam adipisci minima quasi eveniet tenetur. Praesentium
      fuga necessitatibus quae suscipit perspiciatis id ullam neque expedita
      nisi quam blanditiis temporibus debitis odit voluptas, unde fugiat ipsum
      tenetur! Nisi vitae culpa, pariatur ex maxime architecto fugiat
      perspiciatis repudiandae quisquam aliquam quod hic? Pariatur, velit
      neque vero laborum corrupti voluptates alias quo! Quisquam dolorem
      exercitationem maxime possimus est ipsa ex culpa adipisci eius veniam at
      praesentium totam excepturi sunt eum, suscipit, minus voluptatibus
      eligendi voluptates aut fuga eos doloremque ab. Aliquid quisquam nulla
      quam architecto quasi aut eligendi fugit, eos voluptas.
    </p>
  `;
  document.body.appendChild(aboutSection);

  const developersSection = document.createElement('section-page');
  developersSection.setAttribute('title', 'Developers');
  const developerCards = document.createElement('div');
  developerCards.className = 'developer-cards';

  const devCard1 = document.createElement('dev-card');
  devCard1.setAttribute('image', '../images/profil.webp');
  devCard1.setAttribute('name', 'Nama Lengkap 1');
  devCard1.setAttribute('role', 'Bagian project 1');

  const devCard2 = document.createElement('dev-card');
  devCard2.setAttribute('image', '../images/profil.webp');
  devCard2.setAttribute('name', 'Nama Lengkap 2');
  devCard2.setAttribute('role', 'Bagian project 2');

  const devCard3 = document.createElement('dev-card');
  devCard3.setAttribute('image', '../images/profil.webp');
  devCard3.setAttribute('name', 'Nama Lengkap 3');
  devCard3.setAttribute('role', 'Bagian project 3');

  const devCard4 = document.createElement('dev-card');
  devCard4.setAttribute('image', '../images/profil.webp');
  devCard4.setAttribute('name', 'Nama Lengkap 4');
  devCard4.setAttribute('role', 'Bagian project 4');

  developerCards.appendChild(devCard1);
  developerCards.appendChild(devCard2);
  developerCards.appendChild(devCard3);
  developerCards.appendChild(devCard4);

  developersSection.appendChild(developerCards);
  document.body.appendChild(developersSection);

  // Create and append the footer
  const footer = document.createElement('footer-component');
  document.body.appendChild(footer);
};

export default createAboutPage;
