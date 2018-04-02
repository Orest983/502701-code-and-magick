'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var GIST_START_POS_X = 140;
var GIST_START_POS_Y = 250;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var FONT_GAP = 10;
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';
var timesProportions = [];

var getTimeHeightProportion = function (maxTime, maxHeight, arr) {
  for (var i = 0; i <= arr.length - 1; i++) {
    timesProportions[i] = Math.floor(maxHeight * arr[i] / maxTime);
  }
  return timesProportions;
};

var getRandomMinMax = function (min, max) {
  return min + Math.floor(Math.random() * (max - min));
};

var renderRect = function (ctx, opt) {
  ctx.fillStyle = opt.color;
  ctx.fillRect(opt.posX, opt.posY, opt.width, opt.height);
};

var renderText = function (ctx, opt) {
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText(opt.text, opt.posX, opt.posY);
};

var renderGist = function (ctx, names, times) {
  var randomBlue;
  var color;
  var posX = GIST_START_POS_X;
  var maxTime = Math.max.apply(null, times);
  timesProportions = getTimeHeightProportion(maxTime, COLUMN_MAX_HEIGHT, times);

  for (var i = 0; i < names.length; i++) {
    // Set player column color
    if (names[i] === 'Вы') {
      color = PLAYER_COLUMN_COLOR;
    } else {
      randomBlue = getRandomMinMax(50, 255);
      color = 'rgba(0, 0, ' + randomBlue + ', 1)';
    }

    // Render player gist column
    renderRect(ctx, {
      posX: posX,
      posY: GIST_START_POS_Y,
      width: COLUMN_WIDTH,
      height: -timesProportions[i],
      color: color
    });

    // Render player name
    renderText(ctx, {
      text: names[i],
      posX: posX,
      posY: GIST_START_POS_Y + FONT_GAP
    });

    // Render player time
    renderText(ctx, {
      text: Math.round(times[i]),
      posX: posX,
      posY: GIST_START_POS_Y - timesProportions[i] - FONT_GAP * 2
    });

    // Shift next column start position by X coord
    posX += COLUMN_GAP + COLUMN_WIDTH;
  }
};

var renderStatistics = function (ctx, names, times) {
  // Render cloud
  renderRect(ctx, {
    posX: 110,
    posY: 20,
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    color: 'rgba(0, 0, 0, 0.7)'
  });

  // Render cloud shadow
  renderRect(ctx, {
    posX: 100,
    posY: 10,
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    color: '#ffffff'
  });

  // Render victory message
  renderText(ctx, {
    text: 'Ура вы победили!',
    posX: 120,
    posY: 35
  });

  renderText(ctx, {
    text: 'Список результатов:',
    posX: 120,
    posY: 55
  });

  // Render gist
  renderGist(ctx, names, times);
};
