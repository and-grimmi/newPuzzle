/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var btn_home;                                                        // Button zur Startseie
var btn_img1, btn_img2, btn_img3, btn_img4;                          // Bildauswahl
var background;                                                      // Hintergrundbild
var coin, counterText, count;                                        // Komponenten für die Punkte (Münzen) 
var levelDificulty;  
var winCoins;                                               
                               

                                                      
class Picture_Selector extends Phaser.Scene{

    constructor() {
        super({key: 'Picture_Selector'});
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
        this.load.image('image01', 'assets/image01.png');
        this.load.image('image02', 'assets/image02.png');
        this.load.image('image03', 'assets/image03.png');
        this.load.image('image04', 'assets/image04.png');
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

        btn_img1 = this.add.image(0,0, 'image01');
        btn_img1.setScale(0.5);
        btn_img1.y = game.config.height * 0.30;
        btn_img1.x = game.config.width * 0.25;
        btn_img1.setInteractive();
        btn_img1.on('pointerup', () => {this.scene.start('Puzzle_Game',{ dificulty: levelDificulty, img: 'image01'})});
        btn_img1.on('pointerover', () => {
            btn_img1.setTint(0x7a7a7a);
        });
        btn_img1.on('pointerout', () => {
            btn_img1.clearTint();
        });
        

        btn_img2 = this.add.image(0,0, 'image02');
        btn_img2.setScale(0.5);
        btn_img2.y = game.config.height * 0.30;
        btn_img2.x = game.config.width * 0.75;
        btn_img2.setInteractive();
        btn_img2.on('pointerup', () => {this.scene.start('Puzzle_Game',{dificulty: levelDificulty, img: 'image02'})});
        btn_img2.on('pointerover', () => {
            btn_img2.setTint(0x7a7a7a);
        });
        btn_img2.on('pointerout', () => {
            btn_img2.clearTint();
        });

        btn_img3 = this.add.image(0,0, 'image03');
        btn_img3.setScale(0.5);
        btn_img3.y = game.config.height * 0.70;
        btn_img3.x = game.config.width * 0.25;
        btn_img3.setInteractive();
        btn_img3.on('pointerup', () => {this.scene.start('Puzzle_Game',{dificulty: levelDificulty, img: 'image03'})});
        btn_img3.on('pointerover', () => {
            btn_img3.setTint(0x7a7a7a);
        });
        btn_img3.on('pointerout', () => {
            btn_img3.clearTint();
        });

        btn_img4 = this.add.image(0,0, 'image04');
        btn_img4.setScale(0.5);
        btn_img4.y = game.config.height * 0.70;
        btn_img4.x = game.config.width * 0.75;
        btn_img4.setInteractive();
        btn_img4.on('pointerup', () => {this.scene.start('Puzzle_Game',{dificulty: levelDificulty, img: 'image04'})});
        btn_img4.on('pointerover', () => {
            btn_img4.setTint(0x7a7a7a);
        });
        btn_img4.on('pointerout', () => {
            btn_img4.clearTint();
        });
        



    }
}