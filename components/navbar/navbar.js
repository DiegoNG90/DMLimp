/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/**
 * NAVBAR as a PARTIAL
 * DOCS
 * This module is still in beta and in development
 * Key idea here is build a navbar for each page/section by calling the main module function createNavbar on body element/node.
 * This shouldn't be evaluated
 */

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/**
 * UTILS
 */
const isObject = (obj) => {
  return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

const isAnEmptyObject = (obj) => {
  if (!obj) return true;
  return Object?.keys(obj)?.length === 0;
};
/* */

/**
 * CONSTANTS
 */

const NODES = {
  NAV: '$nav',
  LOGO: '$navbarLogo',
  IMG: '$navbarImg',
  LINKS: '$navbarLinks',
  BTN_CONTAINER: '$navbarBtnContainer',
  BTN: '$navbarBtn',
};

const HTML_STRUCTURE = {
  NAV: 'nav',
  LOGO: 'div',
  IMG: 'img',
  LINKS: 'div',
  BTN_CONTAINER: 'div',
  BTN: 'button',
};

const CLASSES = {
  nav: {
    class: 'navbar',
    children: {
      logo: {
        class: 'navbar_logo',
        children: {
          img: {
            class: '',
            children: {},
          },
        },
      },
      links: {
        class: 'navbar_links',
        children: {
          btnContainer: {
            class: 'navbar_btn__container',
            children: {
              class: 'navbar_btn',
              children: {},
            },
          },
        },
      },
    },
  },
};

// WARNING: src atributte might change if image is moved on filesystem or uploaded to server
const IMAGE = {
  src: '../../assets//DMLIMPLogo.png',
  alt: 'LOGO DM Limp',
  width: '100',
  height: '100',
};

const SECTIONS = ['Inicio', 'Contacto', 'Servicios', '¿Donde trabajamos?'];

/**
 * MODULE - NAVBAR
 * @returns A HTML Navbar
 */

function createNavbar() {
  const navbar = {};

  const createNavbarLinks = () => {
    navbar[NODES.LINKS] = document.createElement(HTML_STRUCTURE.LINKS);
    const createNavbarBtnContainer = () => {
      for (const section of SECTIONS) {
        const currentSection = SECTIONS.indexOf(section);
        if (!navbar[NODES.BTN_CONTAINER]) {
          navbar[NODES.BTN_CONTAINER] = [
            document.createElement(HTML_STRUCTURE.BTN_CONTAINER),
          ];
        } else {
          navbar[NODES.BTN_CONTAINER] = [
            ...navbar[NODES.BTN_CONTAINER],
            document.createElement(HTML_STRUCTURE.BTN_CONTAINER),
          ];
        }
        const currentBtnContainer = navbar[NODES.BTN_CONTAINER][currentSection];

        navbar[NODES.BTN] = document.createElement(HTML_STRUCTURE.BTN);
        navbar[NODES.BTN].innerHTML = `${SECTIONS[currentSection]}`;

        currentBtnContainer.appendChild(navbar[NODES.BTN]);
      }
    };
    createNavbarBtnContainer();

    const appendEachBtnContainerToLinks = () => {
      for (const $btnContainer of navbar[NODES.BTN_CONTAINER]) {
        navbar[NODES.LINKS].appendChild($btnContainer);
      }
    };
    appendEachBtnContainerToLinks();

    delete navbar[NODES.BTN_CONTAINER];
  };

  createNavbarLinks();

  const createLogo = () => {
    const logo = document.createElement(HTML_STRUCTURE.LOGO);
    const img = document.createElement(HTML_STRUCTURE.IMG);

    for (const key in IMAGE) {
      console.log('key', key);
      img.setAttribute(key, IMAGE[key]);
    }

    logo.appendChild(img);
    navbar[NODES.LOGO] = logo;
  };

  createLogo();

  const createNav = () => {
    navbar[NODES.NAV] = document.createElement(HTML_STRUCTURE.NAV);
    navbar[NODES.NAV].appendChild(navbar[NODES.LOGO]);
    navbar[NODES.NAV].appendChild(navbar[NODES.LINKS]);
    delete navbar[NODES.LOGO];
    delete navbar[NODES.LINKS];
  };

  createNav();
  const addClassesToEachNode = () => {
    const addClassToSingleNode = (node) => {
      if (isAnEmptyObject(node.children)) {
        console.log('no hay children');
      } else {
        console.log('debería evaluar la class');
      }
    };
    addClassToSingleNode(navbar.$nav);
  };

  addClassesToEachNode();

  console.log('navbar', navbar.$nav);
  console.log('CLASSES', CLASSES);
  return navbar.$nav;
}

document.querySelector('body').appendChild(createNavbar());
