'use strict';
var NUMBER_OF_WIZARDS = 4;

var WIZARD_CARD_TEMPLATE = document
    .querySelector('#similar-wizard-template')
    .content.querySelector('.setup-similar-item');

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_LASTNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var SETUP_OPEN_BTN = document.querySelector('.setup-open');
var SETUP_POPUP = document.querySelector('.setup');
var SETUP_WIZARD_FORM = document.querySelector('.setup-wizard-form');
var SETUP_CLOSE_BTN = SETUP_WIZARD_FORM.querySelector('.setup-close');
var SETUP_USER_NAME = SETUP_WIZARD_FORM.querySelector('.setup-user-name');
var SETUP_SUBMIT_BTN = SETUP_WIZARD_FORM.querySelector('.setup-submit');
var SETUP_WIZARD = SETUP_WIZARD_FORM.querySelector('.setup-wizard');
var WIZARD_EYES = SETUP_WIZARD.querySelector('.wizard-eyes');
var SETUP_FIREBALL_WRAP = SETUP_WIZARD_FORM.querySelector(
    '.setup-fireball-wrap'
);
var EYES_COLOR_INPUT = SETUP_WIZARD_FORM.querySelector(
    'input[name="eyes-color"]'
);
var FIREBALL_COLOR_INPUT = SETUP_WIZARD_FORM.querySelector(
    'input[name="fireball-color"]'
);

console.log('SETUP_OPEN_BTN');
console.log(SETUP_OPEN_BTN);
console.log('SETUP_WIZARD_FORM');
console.log(SETUP_WIZARD_FORM);
console.log('SETUP_CLOSE_BTN');
console.log(SETUP_CLOSE_BTN);

var getRandomMinMax = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

var generateRandomFullName = function () {
  var rand = getRandomMinMax(0, WIZARD_NAMES.length);
  return WIZARD_NAMES[rand] + ' ' + WIZARD_LASTNAMES[rand];
};

var generateRandomCharacter = function () {
  var character = {
    fullName: generateRandomFullName(),
    coatColor: COAT_COLORS[getRandomMinMax(0, COAT_COLORS.length)],
    eyesColor: EYES_COLORS[getRandomMinMax(0, EYES_COLORS.length)]
  };

  return character;
};

var generateCharactersList = function () {
  var characters = [];
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    characters[i] = generateRandomCharacter();
  }
  return characters;
};

var createWizardElement = function (item) {
  var wizardElement = WIZARD_CARD_TEMPLATE.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent =
    item.fullName;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;

  return wizardElement;
};

var createWizardsElementsList = function (charList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OF_WIZARDS; i++) {
    fragment.appendChild(createWizardElement(charList[i]));
  }
  return fragment;
};

var renderSimilarWizards = function () {
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var charList = generateCharactersList();
  setupSimilarList.appendChild(createWizardsElementsList(charList));
  setupSimilar.classList.remove('hidden');
};

var checkIsFocused = function (elem) {
  var activeElement = document.activeElement;
  return activeElement === elem ? true : false;
};
var openPopup = function () {
  SETUP_POPUP.classList.remove('hidden');
  document.addEventListener('keydown', documentKeydownHandler);
};
var closePopup = function () {
  SETUP_POPUP.classList.add('hidden');
  document.removeEventListener('keydown', documentKeydownHandler);
};
var formSubmit = function () {
  SETUP_USER_NAME.removeEventListener('invalid', setupUserNameInvalidHandler);
  if (SETUP_WIZARD_FORM.checkValidity()) {
    SETUP_WIZARD_FORM.submit();
  }
};
var getRandomColor = function (arr) {
  var rand = getRandomMinMax(0, arr.length);
  return arr[rand];
};

// event handlers
var documentKeydownHandler = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE && !checkIsFocused(SETUP_USER_NAME)) {
    closePopup();
  }
};
var setupOpenBtnClickHandler = function () {
  openPopup();
};
var setupOpenBtnKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openPopup();
  }
};
var setupCloseBtnClickHandler = function () {
  closePopup();
};
var setupCloseBtnKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closePopup();
  }
};
var setupSubmitBtnClickHandler = function () {
  formSubmit();
};
var setupSubmitBtnKeydownHandler = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    formSubmit();
  }
};
var setupUserNameInvalidHandler = function () {
  if (SETUP_USER_NAME.validity.tooShort) {
    SETUP_USER_NAME.setCustomValidity(
        'Имя должно состоять минимум из 2-х символов'
    );
  } else if (SETUP_USER_NAME.validity.tooLong) {
    SETUP_USER_NAME.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (SETUP_USER_NAME.validity.valueMissing) {
    SETUP_USER_NAME.setCustomValidity('Обязательное поле');
  }
};
var wizardEyesClickHandler = function () {
  var randomEyesColor = getRandomColor(WIZARD_EYES_COLOR);
  WIZARD_EYES.style.fill = randomEyesColor;
  EYES_COLOR_INPUT.value = randomEyesColor;
};
var setupFireballWrapClickHandler = function () {
  var randomFireballColor = getRandomColor(WIZARD_FIREBALL_COLOR);
  SETUP_FIREBALL_WRAP.style.background = randomFireballColor;
  FIREBALL_COLOR_INPUT.value = randomFireballColor;
};

SETUP_OPEN_BTN.addEventListener('click', setupOpenBtnClickHandler);
SETUP_OPEN_BTN.addEventListener('keydown', setupOpenBtnKeydownHandler);
SETUP_CLOSE_BTN.addEventListener('click', setupCloseBtnClickHandler);
SETUP_CLOSE_BTN.addEventListener('keydown', setupCloseBtnKeydownHandler);
SETUP_SUBMIT_BTN.addEventListener('click', setupSubmitBtnClickHandler);
SETUP_SUBMIT_BTN.addEventListener('keydown', setupSubmitBtnKeydownHandler);
SETUP_USER_NAME.addEventListener('invalid', setupUserNameInvalidHandler);
WIZARD_EYES.addEventListener('click', wizardEyesClickHandler);
SETUP_FIREBALL_WRAP.addEventListener('click', setupFireballWrapClickHandler);

renderSimilarWizards();
