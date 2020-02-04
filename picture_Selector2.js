/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var btn_home, btn_back;                                                        // Button zur Startseie
var btn_img5, btn_img6, btn_img7, btn_img8;                          // Bildauswahl
var background;                                                      // Hintergrundbild
var coin, counterText, count;                                        // Komponenten für die Punkte (Münzen) 
var levelDificulty;  
var winCoins;                                               
                               

                                                      
class Picture_Selector2 extends Phaser.Scene{

    constructor() {
        super({key: 'Picture_Selector2'});
    }

    init(data) {
        levelDificulty = data.dificulty;
        winCoins = data.winCoins;
        if (count == null || count == 0 || coinReset == true){
            count = 50;
        }

    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */

    preload(){
       // this.load.image('weltall', 'assets/weltall.png');
        this.load.image('home', 'assets/home.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('image05', 'assets/image05.png');
        this.load.image('image06', 'assets/image06.png');
        this.load.image('image07', 'assets/image07.png');
        this.load.image('image08', 'assets/image08.png');
        this.load.image('back', 'assets/back.png');
    }

    create() {   
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
        btn_home.setScale(0.15);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Picture_Selector');
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



        /**
        ***********************************    BILDAUSWAHL     ***********************************************
        
        **/

        btn_img5 = this.add.image(0,0, 'image05');
        btn_img5.setScale(0.5);
        btn_img5.y = game.config.height * 0.30;
        btn_img5.x = game.config.width * 0.25;
        btn_img5.setInteractive();
        btn_img5.on('pointerup', () => {this.scene.start('Puzzle_Game',{ dificulty: levelDificulty, img: 'image05'})});
        btn_img5.on('pointerover', () => {
            btn_img5.setTint(0x7a7a7a);
        });
        btn_img5.on('pointerout', () => {
            btn_img5.clearTint();
        });
        

        btn_img6 = this.add.image(0,0, 'image06');
        btn_img6.setScale(0.5);
        btn_img6.y = game.config.height * 0.30;
        btn_img6.x = game.config.width * 0.75;
        btn_img6.setInteractive();
        btn_img6.on('pointerup', () => {this.scene.start('Puzzle_Game',{dificulty: levelDificulty, img: 'image06'})});
        btn_img6.on('pointerover', () => {
            btn_img6.setTint(0x7a7a7a);
        });
        btn_img6.on('pointerout', () => {
            btn_img6.clearTint();
        });

        btn_img7 = this.add.image(0,0, 'image07');
        btn_img7.setScale(0.5);
        btn_img7.y = game.config.height * 0.70;
        btn_img7.x = game.config.width * 0.25;
        btn_img7.setInteractive();
        btn_img7.on('pointerup', () => {this.scene.start('Puzzle_Game',{dificulty: levelDificulty, img: 'image07'})});
        btn_img7.on('pointerover', () => {
            btn_img7.setTint(0x7a7a7a);
        });
        btn_img7.on('pointerout', () => {
            btn_img7.clearTint();
        });

        btn_img8 = this.add.image(0,0, 'image08');
        btn_img8.setScale(0.5);
        btn_img8.y = game.config.height * 0.70;
        btn_img8.x = game.config.width * 0.75;
        btn_img8.setInteractive();
        btn_img8.on('pointerup', () => {this.scene.start('Puzzle_Game',{dificulty: levelDificulty, img: 'image08'})});
        btn_img8.on('pointerover', () => {
            btn_img8.setTint(0x7a7a7a);
        });
        btn_img8.on('pointerout', () => {
            btn_img8.clearTint();
        });


        btn_back = this.add.image(game.config.width * 0.10, game.config.height * 0.92, 'back');
        btn_back.setScale(0.1);
        btn_back.setInteractive();
        btn_back.on('pointerdown', () => {
            this.scene.stop('Picture_Selector2');
            this.scene.start('Picture_Selector',{dificulty: levelDificulty, winCoins: winCoins});
        });
        
    }
}