// NODO
const $burguer = document.querySelector('.navbar_burger');
let $navbarLinks = document.querySelector('.navbar_links');

// HELPERS
function showNavbarLinks() {
  $navbarLinks.classList.remove('hide');
  $navbarLinks.classList.add('navbar_links_flex');
}
function hideNavbarLinks() {
  $navbarLinks.classList.remove('navbar_links_flex');
  $navbarLinks.classList.add('hide');
}
function showBurger() {
  $burguer.classList.remove('hide');
  $burguer.classList.add('navbar_burger_block');
}
function hideBurger() {
  $burguer.classList.remove('navbar_burger_block');
  $burguer.classList.add('hide');
}

// EVENTOS
window.addEventListener('load', (event) => {
  if (event.target.defaultView.innerWidth < 600) {
    hideNavbarLinks();
    showBurger();
  } else {
    showNavbarLinks();
    hideBurger();
  }
});

window.addEventListener('resize', (event) => {
  if (event.target.innerWidth < 600) {
    hideNavbarLinks();
    showBurger();
  } else {
    showNavbarLinks();
    hideBurger();
  }
});

$burguer.addEventListener('click', () => {
  const displayNavbarStyle = getComputedStyle($navbarLinks).display;

  if (displayNavbarStyle === 'none') {
    showNavbarLinks();
  } else {
    hideNavbarLinks();
  }
});
