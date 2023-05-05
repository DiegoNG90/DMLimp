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
    NO_MORE_CHARACTERS:
      'Lo siento, ha llegado al limite de carateres. No puede escribir más.',
    INVALID_PASTE:
      'El mensaje/consulta que usted está intentando pegar es más largo de 500 caracteres y por ende es invalido.',
  };

  const $textAreaInvalidFeedback = document.querySelector('.error-feedback');
  const $textAreaWarningFeedback = document.querySelector('.warning-feedback');
  // INPUT Event
  $textareaConsult.addEventListener('input', (event) => {
    const {
      target: { value },
    } = event;
    const CURRENT_VALUE_LENGTH = value.length;

    // console.log('$remainingAvailableChars', $remainingAvailableChars);

    if (CURRENT_VALUE_LENGTH === 0) {
      resetValidationNode($textareaConsult);
    }
    if (CURRENT_VALUE_LENGTH > 0) {
      $textAreaWarningFeedback.innerHTML = `${
        MAX_VALID_LENGTH - CURRENT_VALUE_LENGTH
      } ${VALIDATION_MESSAGES.AVAILABLE_CHARACTERS}`;
    }
  });

  // KEYPRESS
  document.addEventListener('keypress', (event) => {
    const {
      target: { value },
    } = event;

    if (value.length > MAX_VALID_LENGTH - 2) {
      $textAreaInvalidFeedback.innerHTML =
        VALIDATION_MESSAGES.NO_MORE_CHARACTERS;
      event.preventDefault();
    }
  });

  // PASTE
  document.addEventListener('paste', (event) => {
    const text = event.clipboardData.getData('text');

    if (text.length >= MAX_VALID_LENGTH) {
      event.preventDefault();
      $textAreaInvalidFeedback.innerHTML = VALIDATION_MESSAGES.INVALID_PASTE;
      invalidateNode($textareaConsult);

      setTimeout(() => {
        resetValidationNode($textareaConsult);
      }, 4000);
    }
  });
}
validateTextareaConsult();
