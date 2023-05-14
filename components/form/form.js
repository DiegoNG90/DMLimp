// HELPERS
function validateNode($node) {
  $node.classList.add('is-valid');
  $node.classList.remove('is-invalid');
}

function invalidateNode($node) {
  $node.classList.add('is-invalid');
  $node.classList.remove('is-valid');
}

function resetValidationNode($node) {
  $node.classList.remove('is-invalid');
  $node.classList.remove('is-valid');
  document.querySelector('.warning-feedback').innerHTML = '';
}

// NODES

let $inputName = document.querySelector('#input-name');
let $inputEmail = document.querySelector('#input-email');
let $textareaConsult = document.querySelector('#textarea-consult');

// VALIDATORS - EVENTS
function validateInputName() {
  $inputName.addEventListener('input', (event) => {
    const {
      target: { value },
    } = event;

    const nameRegex = /^[a-z ,.'-]+$/i;
    const validName = nameRegex.test(value);
    let isInvalidName = value.length < 3 || value.length > 150 || !validName;
    isInvalidName ? invalidateNode($inputName) : validateNode($inputName);
  });
}

validateInputName();

function validateInputEmail() {
  $inputEmail.addEventListener('input', (event) => {
    const {
      target: { value },
    } = event;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validEmail = emailRegex.test(value);

    validEmail ? validateNode($inputEmail) : invalidateNode($inputEmail);
  });
}
validateInputEmail();

function validateTextareaConsult() {
  const MAX_VALID_LENGTH = 500;
  const VALIDATION_MESSAGES = {
    AVAILABLE_CHARACTERS: 'caracteres disponibles para su consulta',
    CHARACTERS_LIMITS: 'Has llegado al limite de carateres.',
    INVALID_PASTE:
      'El mensaje/consulta que usted está intentando pegar es más largo de 500 caracteres y por ende es invalido.',
    SHOULD_ELIMINATE_CHARACTERS:
      'Te has pasado de la cantidad máxima de caracteres. Debes eliminar la siguiente cantidad de caracters: ',
  };

  const $textAreaWarningFeedback = document.querySelector('.warning-feedback');

  // INPUT Event
  $textareaConsult.addEventListener('input', (event) => {
    const {
      target: { value },
    } = event;
    const CURRENT_VALUE_LENGTH = value.length;

    $textAreaWarningFeedback.style.color = 'rgb(23, 3, 238)';

    if (CURRENT_VALUE_LENGTH === 500) {
      $textAreaWarningFeedback.style.color = 'red';
      $textAreaWarningFeedback.innerHTML =
        VALIDATION_MESSAGES.CHARACTERS_LIMITS;

      return invalidateNode($textareaConsult);
    }
    if (CURRENT_VALUE_LENGTH > 500) {
      $textAreaWarningFeedback.style.color = 'red';
      $textAreaWarningFeedback.innerHTML =
        VALIDATION_MESSAGES.SHOULD_ELIMINATE_CHARACTERS +
        (MAX_VALID_LENGTH - CURRENT_VALUE_LENGTH).toString();

      return invalidateNode($textareaConsult);
    }
    if (CURRENT_VALUE_LENGTH === 0) {
      resetValidationNode($textareaConsult);
    }

    if (CURRENT_VALUE_LENGTH > 0) {
      $textAreaWarningFeedback.innerHTML = `${
        MAX_VALID_LENGTH - CURRENT_VALUE_LENGTH
      } ${VALIDATION_MESSAGES.AVAILABLE_CHARACTERS}`;
    }
    return validateNode($textareaConsult);
  });

  // KEYPRESS
  document.addEventListener('keydown', (event) => {
    const {
      target: { value },
    } = event;

    if (value.length > MAX_VALID_LENGTH - 1) {
      $textAreaWarningFeedback.style.color = 'red';
      $textAreaWarningFeedback.innerHTML =
        VALIDATION_MESSAGES.CHARACTERS_LIMITS;
      if (event.key !== 'Backspace') {
        event.preventDefault();
      }
    }
  });
}
validateTextareaConsult();

// FORM SUBMISSION
const $form = document.querySelector('form');

function validateAllInputsBeforeSubmit() {
  const arrayOfInputs = [$inputName, $inputEmail, $textareaConsult];
  let isValidClassNameArray = [];
  for (let input of arrayOfInputs) {
    isValidClassNameArray.push(input.className.split(' ').includes('is-valid'));
  }

  return isValidClassNameArray.every((className) => className === true);
}

const $openButton = document.querySelector('[data-open-modal]');
const $closeButton = document.querySelector('[data-close-modal]');
const $modal = document.querySelector('[data-modal]');
const $modalTitle = document.querySelector('#modalTitle');
const $modalParagraph = document.querySelector('#modalParagraph');

$openButton.addEventListener('click', () => {
  $modal.showModal();

  if (!validateAllInputsBeforeSubmit()) {
    $modalTitle.innerHTML = 'Revise su consulta';
    $modalParagraph.innerHTML =
      '<b>Su consulta tiene uno o varios campos incompletos y/o con errores. Por favor, reviselos y corrijalos para poder enviar su consulta.</b>';
    // AVOID SEND
    $form.onsubmit = (event) => {
      return event.preventDefault();
    };
  } else {
    $modalTitle.innerHTML = 'Consulta exitosa!';
    $modalParagraph.innerHTML = `Felicidades ${$inputName.innerHTML}!, su consulta se ha enviado de forma correcta. en breve estaremos respondiendole a la casilla de correo electrónico ${$inputEmail.innerHTML}`;
    $form.onsubmit = (event) => {};
  }
});

$closeButton.addEventListener('click', () => {
  $modal.close();
});

// FORM RESET
window.addEventListener('load', (event) => {
  $form.reset();
});
