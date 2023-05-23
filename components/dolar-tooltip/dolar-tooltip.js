const $dolarIcon = document.querySelector('#dolar-tooltip');
const $dolarOficial = document.querySelector('#dolar-oficial');
const $dolarBlue = document.querySelector('#dolar-blue');
const $dolarModal = document.querySelector('#modal');
const $closeButtonModal = document.querySelector('#btn-modal-close');

// API
const API_URL = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';

const getDolarValues = async () => {
  const data = await fetch(API_URL);
  const res = await data.json();
  return await res;
};

$dolarIcon.addEventListener('click', () => {
  console.log('Se hizo click');
  $dolarModal.show();

  let promesaDolar = (async function () {
    return await getDolarValues();
  })();

  let dolarOficial = null;
  let dolarBlue = null;

  $dolarBlue.innerHTML = 'Estamos cargando la data, por favor espere.';

  promesaDolar.then((res) => {
    const oficial = res.find((dolar) => dolar.casa.nombre === 'Dolar Oficial');
    const blue = res.find((dolar) => dolar.casa.nombre === 'Dolar Blue');

    dolarOficial = oficial && oficial;
    dolarBlue = blue && blue;

    $dolarBlue.innerHTML = `<strong>Dolar blue</strong>: Compra $${dolarBlue?.casa?.compra} - Venta $${dolarBlue?.casa.venta}`;
    $dolarOficial.innerHTML = `<strong>Dolar oficial</strong>: Compra $${dolarOficial?.casa?.compra} - Venta $${dolarOficial?.casa.venta}`;
  });
});

$closeButtonModal.addEventListener('click', () => {
  $dolarModal.close();
});
