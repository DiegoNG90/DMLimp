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
  // TODO/ODM - aramar validador con textos correctos!
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

  const $textAreaInvalidFeedback = document.querySelector('.error-feedback');
  const $textAreaWarningFeedback = document.querySelector('.warning-feedback');

  let globalTextValue = 0;
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

      return;
    }
    if (CURRENT_VALUE_LENGTH > 500) {
      $textAreaWarningFeedback.style.color = 'red';
      $textAreaWarningFeedback.innerHTML =
        VALIDATION_MESSAGES.SHOULD_ELIMINATE_CHARACTERS +
        (MAX_VALID_LENGTH - CURRENT_VALUE_LENGTH).toString();
      return;
    }
    if (CURRENT_VALUE_LENGTH === 0) {
      resetValidationNode($textareaConsult);
    }

    if (CURRENT_VALUE_LENGTH > 0) {
      $textAreaWarningFeedback.innerHTML = `${
        MAX_VALID_LENGTH - CURRENT_VALUE_LENGTH
      } ${VALIDATION_MESSAGES.AVAILABLE_CHARACTERS}`;
    }

    globalTextValue = CURRENT_VALUE_LENGTH;
  });

  // KEYPRESS
  document.addEventListener('keydown', (event) => {
    const {
      target: { value },
    } = event;

    console.log('event.key', event.key);

    if (value.length > MAX_VALID_LENGTH - 1) {
      $textAreaWarningFeedback.style.color = 'red';
      $textAreaWarningFeedback.innerHTML =
        VALIDATION_MESSAGES.CHARACTERS_LIMITS;
      if (event.key !== 'Backspace') {
        console.log('se mete en el keypress backspace');

        event.preventDefault();
      }
    }
  });
}
validateTextareaConsult();
