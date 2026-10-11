import { mainInit } from './main.js';
import { homepage } from './homepage.js';
import { navBarMenu } from './menu.js';
import { form } from './form.js';
import { footerDate } from './footer-date.js';
import { swiperInit } from './swiper.js';
import { caseTransition } from './case-transition.js';
import { homepageHeroTrail } from './homepage-hero-trail.js';

console.log("Loading main scripts loader");

function makeFooterButton(link) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `${link.className} footer15_link-button`;
  if (!link.classList.contains('terms')) {
    button.textContent = link.textContent.trim();
  }
  link.replaceWith(button);
}

document.querySelectorAll('footer.footer_for-living').forEach((footer) => {
  footer.querySelectorAll('a.footer15_link.terms').forEach(makeFooterButton);

  const instagramLink = Array.from(
    footer.querySelectorAll('a.footer15_link'),
  ).find((link) => link.textContent.trim() === 'Instagram');

  if (instagramLink) makeFooterButton(instagramLink);
});

homepageHeroTrail();
mainInit();
homepage();
navBarMenu();
form();
footerDate();
swiperInit();
caseTransition();
