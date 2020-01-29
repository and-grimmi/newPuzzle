/**********************************************************     GLOBALE VARIABLEN   **********************************************/
var dificulty, image;                                           //Übergabe Parameter (dificulty: Anzahl der Puzzleteile, image: verweis auf das aufgewählte Bild, count: geld)
var canvas, context, canvasX, canvasY;                         //Zeichenfläche für das Puzzle 
var img;                                                      // wo soll das Bild gezeichnet werden                                                      
var puzzleHeight, puzzleWidth ;                               // Höhe und Breide des Puzzles
var pieces, pieceWidth, pieceHeight;                           //einzelne Puzzleteile
var selectedPiece, exchangedPiece                             // 
var mouse;                                                     // X- und Y-Position der Maus
var pieceClicked = false;  
var moves = false;                            
var movesCount = 0;
var game_Win = false;
var coinReset = false;

class Puzzle_Game extends Phaser.Scene {

    constructor() {
        super({ key: 'Puzzle_Game'});
    }

    init(data) {
        dificulty = data.dificulty;
        image = data.img;
    }

    /**
     ***************************************    BENÖTIGTES PUGLIN   ***************************************
    */
    preload() {
        this.load.plugin('rexcanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasplugin.min.js', true);
    }

    create (){
        /**
        ***********************************    HINTERGRUND     ***********************************************
        Die Höhe des Bildes passt sich der Höhe des Spiels an und zentriert.
        Das Verhältnis des Bildes bleibt gleich, sodass sich das Bild nicht streckt.
        Um das Hintergrundbild zu ändern, muss der jeweilige Key des Bildes angegeben werden
        **/
        background = this.add.image(0, 0, 'weltall');   
        background.displayHeight = this.sys.game.config.height;
        background.scaleX = background.scaleY;
        background.y = game.config.height/2;
        background.x = game.config.width/2;
        this.cameras.main.setBackgroundColor('#FFFFFF')
        background.alpha = 0.5;
       
        /**
        ***********************************    HOMEBUTTON     ***********************************************
        Klickt man auf das Icon, so wird das Spiel abgebrochen und man gelangt zurück zum Menü
        **/
        btn_home = this.add.image(50, 50, 'home');
        //btn_home.setScale(0.15);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Puzzle_Game');
            this.scene.start('Start');
        });
        

        /**
        ***********************************    ZÄHLER     ***********************************************
        Stellt die Punkteanzahl dar
        **/
       
        var x = game.config.width * 0.85;
        coin = this.add.image(x, 50, 'coin');
        coin.setScale(0.15);
        coin.setDepth(1);
        var x = game.config.width * 0.9;
        counterText = this.add.text(x, 0, count, {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000" });
        counterText.y = coin.y - (counterText.height/2);
        counterText.setDepth(1);

    
        this.prepareBoard();
    }

    /**
    ***********************************    ZEICHENFLÄCHE     ***********************************************
    Hier wird die Größe und Breite des Puzzles berechnet, anhand des geladenen Bildes.
    **/
    prepareBoard(){
        pieces = [];
        mouse = {x:0,y:0};
        selectedPiece = null;
        exchangedPiece = null;
      
        img = this.textures.get(image).getSourceImage();

        pieceWidth = Math.floor(img.width / dificulty);
        pieceHeight = Math.floor(img.height / dificulty);

        puzzleWidth = pieceWidth * dificulty;
        puzzleHeight = pieceHeight * dificulty;

        var x = game.config.width * 0.50;
        var y = game.config.height * 0.50;
        canvas = this.add.rexCanvas(x, y, game.config.width, game.config.height);

        var canvasElem = canvas.getCanvas();
        context = canvasElem.getContext('2d');
        canvasX = (game.config.width - puzzleWidth) / 2;
        canvasY = (game.config.height - puzzleHeight) / 2;
        //context.drawImage(img, 0, 0, puzzleWidth, puzzleHeight, canvasX, canvasY, puzzleWidth, puzzleHeight);

        this.buildPieces();
    }

    /**
    ***********************************    PUZZLETEILE BAUEN    ***********************************************
    Für jedes Puzzleteil wird ein Objekt erzeugt. Dies erhält die Angabe, was und wo gezeichnet werden soll.
    **/
    buildPieces(){
        var i, piece;
        var xPos = 0, yPos = 0;
        var cxPos = canvasX, cyPos = canvasY;
        for(i = 0;i < dificulty * dificulty; i++){
            piece = {};
            piece.sx = xPos;
            piece.sy = yPos;
            piece.dx = cxPos;
            piece.dy = cyPos;
            pieces.push(piece);
            xPos += pieceWidth;
            cxPos += pieceWidth;
            if(xPos >= puzzleWidth){
                xPos = 0;
                yPos += pieceHeight;
            }
            if(cxPos >= (canvasX + puzzleWidth)){
                cxPos = canvasX;
                cyPos += pieceHeight;
            }
        }

        this.shufflePuzzle();
        //this.input.on('pointerdown', onPuzzleClick);
    }

    /**
    ***********************************    PUZZLETEILE MISCHEN    ***********************************************
    Die Puzzleteile werden gemischt und auf dem Canvas gezeichnet.
    **/
    shufflePuzzle(){
        selectedPiece = null;

        //Array mischen
        pieces = shuffleArray(pieces);
 
        //löschen alle auf dem Canvas gezeichneten Puzzlezeile
       // context.clearRect(canvasX, canvasY, puzzleWidth, puzzleHeight);
        var i;
        var piece;
        var xPos = canvasX;
        var yPos = canvasY;
        for(i = 0;i < pieces.length;i++){
            piece = pieces[i];
            piece.xPos = xPos;
            piece.yPos = yPos;
            context.strokeStyle = "lightblue";
            context.lineWidth = 3;
            context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, xPos, yPos, pieceWidth, pieceHeight);
            context.strokeRect(xPos, yPos, pieceWidth, pieceHeight);
            xPos += pieceWidth;
            if(xPos >= (canvasX + puzzleWidth)){
                xPos = canvasX;
                yPos += pieceHeight;
            }
        }

        this.input.on('pointerdown', function(pointer){
            var touchX = pointer.x;
            var touchY = pointer.y;
            
            onPuzzleClick(touchX, touchY);
        });
    }

    /**
    **************************************************    MÜNZE AUSGEBEN     ***********************************************
    nach jedem Zug wird der Zähler runtergezählt
    **/
    spendCoins() {
        if (moves == true){
            counterText.setText((count -= 1));
        }
        moves = false;       
    }

    /**
     *********************************************************    UPDATE     ***********************************************
     w
     Wenn das Puzzle fertigt ist, wird die "Game-Win"-Endscene aufgerufen.
     Wenn die Münzen aufgebraucht sind, wird die "Game-Over"-Endscene aufgerufen.
    **/ 
    update() {
        if ((game_Win == true) && (count > 0)){
            this.scene.start('Game_Win');
        }
        else if (count <= 0){
            this.scene.start('Game_Over');
        }
        
        this.spendCoins();   
    }
    
}

function shuffleArray(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

/**
***********************************    POSITIONSPRÜFUNG    ***********************************************
Prüfen, ob der Klick innerhalb des definierten Bereichs liegt.
**/
function onPuzzleClick(tx, ty){
    mouse.x = tx;
    mouse.y = ty;
     //canMove
    if (mouse.x > (canvasX + puzzleWidth) ||  
         mouse.x < (canvasX) ||  
         mouse.y < (canvasY) ||  
         mouse.y > (canvasY + puzzleHeight)) {
            
    }  else{
        movePiece();
    }   
}

/**
***********************************    PUZZLETEILE TAUSCHEN    ***********************************************
**/

function movePiece(){
    if(pieceClicked == false){
        selectedPiece = checkPieceClicked();
        context.save();
        context.globalAlpha = .9;
        context.strokeStyle = "#0431B4";
        context.lineWidth = 3;
        context.strokeRect(selectedPiece.xPos, selectedPiece.yPos, pieceWidth, pieceHeight);
        context.restore();
        canvas.updateTexture();
        pieceClicked = true;
        moves = false;
    }else{
        if(selectedPiece != null){
            exchangedPiece = checkPieceClicked();
            var tmp = {xPos:selectedPiece.xPos,yPos:selectedPiece.yPos};
            selectedPiece.xPos = exchangedPiece.xPos;
            selectedPiece.yPos = exchangedPiece.yPos;
            exchangedPiece.xPos = tmp.xPos;
            exchangedPiece.yPos = tmp.yPos;
            moves = true;
            movesCount ++;
            pieceClicked = false;

            resetPuzzleAndCheckWin();
        }
        
        
    }
}

/**
***********************************    GEKLICKTES PUZZLETEIL     ***********************************************
Es wird festgestellt, auf welches Puzzleteil geklickt wurde.
**/
function checkPieceClicked(){
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        if(mouse.x < piece.xPos || mouse.x > (piece.xPos + pieceWidth) || mouse.y < piece.yPos || mouse.y > (piece.yPos + pieceHeight)){
            //PIECE NOT HIT
        }
        else{
            return piece;
        }
    }
    return null;
}

/**
***********************************    PUZZLE GEWINNEN    ***********************************************
Überprüfen, ob jedes Puzzleteil sich in seiner Gewinnposition befindet
**/
function resetPuzzleAndCheckWin(){
    context.clearRect(canvasX, canvasY, puzzleWidth, puzzleHeight);
    var gameWin = true;
    var i;
    var piece;
    for(i = 0;i < pieces.length;i++){
        piece = pieces[i];
        context.drawImage(img, piece.sx, piece.sy, pieceWidth, pieceHeight, piece.xPos, piece.yPos, pieceWidth, pieceHeight);
        context.strokeRect(piece.xPos, piece.yPos,  pieceWidth, pieceHeight);
        canvas.updateTexture();
        if(piece.xPos != piece.dx || piece.yPos != piece.dy){
            gameWin = false;
            coinReset = true;
            
        }
    }
    if(gameWin){
        setTimeout(function(){ 
            coinReset = false;
            game_Win = true; 
        }, 500);
    }
}
