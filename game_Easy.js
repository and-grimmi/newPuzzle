var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
  preload: preload,
  create: create,
  update: update
});

var PIECE_WIDTH = 200,
  PIECE_HEIGHT = 200,
  BOARD_COLS,
  BOARD_ROWS;

var piecesGroup,
  piecesAmount,
  shuffledIndexArray = [];


function preload() {
  game.load.spritesheet("background", "assets/sam.png", PIECE_WIDTH, PIECE_HEIGHT);
  //easter egg
  //game.load.spritesheet("win", "http://i.imgur.com/1A139f3.png");
}

function create() {
  prepareBoard();
}

function prepareBoard() {

  var piecesIndex = 0,
    i, j,
    piece;
  BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
  BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);
  piecesAmount = BOARD_COLS * BOARD_ROWS;
  shuffledIndexArray = createShuffledIndexArray();
  piecesGroup = game.add.group();

  for (i = 0; i < BOARD_ROWS; i++) {
    for (j = 0; j < BOARD_COLS; j++) {
      if (shuffledIndexArray[piecesIndex]) {
        piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
      } else { //initial position of black piece
        piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
        piece.black = true;
      }
      piece.name = 'piece' + i.toString() + 'x' + j.toString();
      piece.currentIndex = piecesIndex;
      piece.destIndex = shuffledIndexArray[piecesIndex];
      piece.inputEnabled = true;
      piece.events.onInputDown.add(selectPiece, this);
      piece.posX = j;
      piece.posY = i;
      piecesIndex++;
    }
  }

}

function selectPiece(piece) {

  var blackPiece = canMove(piece);

  if (blackPiece) {
    movePiece(piece, blackPiece);
  }

}

function canMove(piece) {

  var foundBlackElem = false;

  piecesGroup.children.forEach(function(element) {
    if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
      element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
      element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
      element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
      foundBlackElem = element;
      return;
    }
  });

  return foundBlackElem;
}

function movePiece(piece, blackPiece) {

  var tmpPiece = {
    posX: piece.posX,
    posY: piece.posY,
    currentIndex: piece.currentIndex
  };

  game.add.tween(piece).to({
    x: blackPiece.posX * PIECE_WIDTH,
    y: blackPiece.posY * PIECE_HEIGHT
  }, 300, Phaser.Easing.Linear.None, true);

  piece.posX = blackPiece.posX;
  piece.posY = blackPiece.posY;
  piece.currentIndex = blackPiece.currentIndex;
  piece.name = 'piece' + piece.posX.toString() + 'x' + piece.posY.toString();

  blackPiece.posX = tmpPiece.posX;
  blackPiece.posY = tmpPiece.posY;
  blackPiece.currentIndex = tmpPiece.currentIndex;
  blackPiece.name = 'piece' + blackPiece.posX.toString() + 'x' + blackPiece.posY.toString();

  checkIfFinished();

}


function checkIfFinished() {

  var isFinished = true;


  piecesGroup.children.forEach(function(element) {
    if (element.currentIndex !== element.destIndex) {
      isFinished = false;
      return;
    }

  });

  if (isFinished) {
    showFinishedText();
  }


}


function showFinishedText() {
  bmd = game.make.bitmapData();
  bmd.load('win').cls();
  game.stage.backgroundColor = '#2d2d2d';
  area = new Phaser.Rectangle(0, bmd.height, bmd.width, 1);
  bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 1, 1);
  game.stage.smoothed = false;
  dropTime = game.time.now + 200;
  var text = game.add.text(game.world.centerX, game.world.centerY, "Congrats! \n- YOU WIN! -", {
    font: "100px impact",
    style: "bold",
    fill: "white"
  }).anchor.set(0.5);

}

function update() {

  /*
  easter egg
    if (area.y > 0 && game.time.now > dropTime)
             {
              for (var y = 0; y < area.y; y++)
                  {
                    bmd.copyRect('win', area, 0, y);
                  }

                      area.y--;
                      dropTime = game.time.now + 25;
                  }
  */
}

function createShuffledIndexArray() {

  var indexArray = [];

  for (var i = 0; i < piecesAmount; i++) {
    indexArray.push(i);
  }

  return shuffle(indexArray);

}

function shuffle(array) {

  var counter = array.length,
    temp,
    index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;

}
