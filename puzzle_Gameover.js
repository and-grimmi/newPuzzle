/**********************************************************     GLOBALE VARIABLEN   **********************************************/
var btn_home;                                                   // Button um zum Menü zu kommen
var  t1, t2, t3;                                                //Texte
var sam;

class Game_Over extends Phaser.Scene {

    constructor() {
        super({key: "Game_Over"});
    }


    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
    */
    preload() {
        this.load.image('sam', 'assets/sam.png');
    }

    create() {

        /**
         ***********************************    HINTERGRUND     ***********************************************
         Ist die Höhe des Bildes kleiner als die Höhe des Geräts, so wird die Höhe an die des Geräts angepasst
         Ist die Breite kleiner als die des Geräts, so wird die Breite des Bildes dem des Geräts angepasst
         Das Verhältnis des Bildes bleibt gleich, sodass sich das Bild nicht streckt
        **/
        background = this.add.image(0, 0, 'weltall');   
        background.displayHeight = this.sys.game.config.height;
        background.scaleX = background.scaleY;
        background.y = game.config.height/2;
        background.x = game.config.width/2;
        this.cameras.main.setBackgroundColor('#FFFFFF')
        background.alpha = 0.5;

        sam = this.add.image(0, 0, 'sam');
        sam.setScale(0.7);
        sam.y = game.config.height/2 + 100;
        sam.x = game.config.width * 0.35;

        t1 = this.add.text(0, 0, "OH JE", {fontFamily: 'AhkioW05-Light', fontSize: '120px', fill: "#000000"});
        t1.y = (game.config.height * 0.15);
        t1.x = (game.config.width * 0.45);
        
        t2 = this.add.text(0, 0, "Du hast leider keine", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        t2.y = (game.config.height * 0.3);
        t2.x = (game.config.width * 0.35); 

        t3 = this.add.text(0, 0, "Münzen mehr.", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        t3.y = (game.config.height * 0.4);
        t3.x = (game.config.width * 0.4);

        /**
         ***********************************    HOMEBUTTON     ***********************************************
         Klickt man auf den Button, kommt man zu Hauptmenü
        **/
        btn_home = this.add.image(50, 50, 'home');
       // btn_home.setScale(0.15);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Picture_Selector');
            this.scene.stop('Puzzle_Game');
            this.scene.stop('Eame_Win');
            this.scene.start('Start');
        });
        

    }
}