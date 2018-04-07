'use strict';

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

var getRandomColor = function (arrColors) {
  var randomNumber = getRandomMinMax(0, arrColors.length);
  return arrColors[randomNumber];
};

var generateCharacter = function (opt) {
  var character = {
    name: opt.name,
    lastName: opt.lastName,
    coatColor: getRandomColor(opt.coatColor),
    eyesColor: getRandomColor(opt.eyesColor)
  };

  return character;
};

var generateCharactersList = function (
    names,
    lastNames,
    coatColors,
    eyesColors
) {
  var characters = [];
  var character;
  for (var i = 0; i < WIZARD_NAMES.length; i++) {
    character = generateCharacter({
      name: names[i],
      lastName: lastNames[i],
      coatColor: coatColors,
      eyesColor: eyesColors
    });
    characters[i] = character;
  }
  return characters;
};

var createWizardElement = function (item) {
  var wizardElement = WIZARD_CARD_TEMPLATE.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent =
    item.name + ' ' + item.lastName;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;

  return wizardElement;
};

var createWizardsElementsList = function (charList) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < charList.length; i++) {
    fragment.appendChild(createWizardElement(charList[i]));
  }
  return fragment;
};

var renderSimilarWizards = function () {
  document.querySelector('.setup').classList.remove('hidden');
  var setupSimilar = document.querySelector('.setup-similar');
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var charList = generateCharactersList(
      WIZARD_NAMES,
      WIZARD_LASTNAMES,
      COAT_COLORS,
      EYES_COLORS
  );
  setupSimilarList.appendChild(createWizardsElementsList(charList));
  setupSimilar.classList.remove('hidden');
};

renderSimilarWizards();
