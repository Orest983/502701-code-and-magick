'use strict';
var CLOUD_X = 100;
var CLOUD_Y = 20;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_OFFSET = 10;
var MESSAGE_X = 120;
var MESSAGE_Y = 35;
var GIST_START_POS_X = 140;
var GIST_START_POS_Y = 250;
var COLUMN_MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var FONT_GAP = 10;
var PLAYER_COLUMN_COLOR = 'rgba(255, 0, 0, 1)';

var getTimeHeightProportion = function (maxTime, maxHeight, arr) {
  var timesProportions = [];
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
  var maxTime = Math.max.apply(null, times);
  var timesProportions = getTimeHeightProportion(
      maxTime,
      COLUMN_MAX_HEIGHT,
      times
  );

  for (
    var i = 0, posX = GIST_START_POS_X;
    i < names.length;
    i++, posX += COLUMN_WIDTH + COLUMN_GAP
  ) {
    // Set player column color
    randomBlue = getRandomMinMax(50, 255);
    color =
      names[i] === 'Вы'
        ? PLAYER_COLUMN_COLOR
        : 'rgba(0, 0, ' + randomBlue + ', 1)';

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
  }
};

window.renderStatistics = function (ctx, names, times) {
  // Render cloud shadow
  renderRect(ctx, {
    posX: CLOUD_X + CLOUD_SHADOW_OFFSET,
    posY: CLOUD_Y + CLOUD_SHADOW_OFFSET,
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    color: 'rgba(0, 0, 0, 0.7)'
  });

  // Render cloud
  renderRect(ctx, {
    posX: CLOUD_X,
    posY: CLOUD_Y,
    width: CLOUD_WIDTH,
    height: CLOUD_HEIGHT,
    color: '#ffffff'
  });

  // Render victory message
  renderText(ctx, {
    text: 'Ура вы победили!',
    posX: MESSAGE_X,
    posY: MESSAGE_Y
  });

  renderText(ctx, {
    text: 'Список результатов:',
    posX: MESSAGE_X,
    posY: MESSAGE_Y + FONT_GAP * 2
  });

  // Render gist
  renderGist(ctx, names, times);
};
