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

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

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
  for (var i = 0; i < WIZARD_NAMES.length; i++) {
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

var createWizardsElementsList = function (charList, numOfChars) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i <= numOfChars; i++) {
    fragment.appendChild(createWizardElement(charList[i]));
  }
  return fragment;
};

var renderSimilarWizards = function () {
  document.querySelector('.setup').classList.remove('hidden');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var charList = generateCharactersList();
  setupSimilarList.appendChild(
      createWizardsElementsList(charList, NUMBER_OF_WIZARDS)
  );
  setupSimilar.classList.remove('hidden');
};

renderSimilarWizards();
