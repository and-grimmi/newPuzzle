
/**********************************************************     GLOBALE VARIABLEN   **********************************************/

var btn_home, btn_next;                                         // Button um zum Menü zu kommen
var congrats;                                                   //Texte
var mike
var coins, coinImage, counterText;
var x;

class Game_Win extends Phaser.Scene {

    constructor() {
        super({key: 'Game_Win'});
    }


    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
    */
    preload() {
        this.load.image('mike', 'assets/Mike.png');
        this.load.image('next', 'assets/next.png');

    }

    create() {
        game_Win = false;
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

        mike = this.add.image(0, 0, 'mike');
        mike.y = game.config.height - 150;
        mike.x = game.config.width * 0.5;
        mike.setScale(0.3);

        
        congrats = this.add.text(0, 0, "GLÜCKWUNSCH!", {fontFamily: 'AhkioW05-Light', fontSize: '120px', fill: "#000000"});
        congrats.y = (game.config.height * 0.08);
        congrats.x = (game.config.width / 2) - (congrats.width/2);

        var expl1 = this.add.text(0, 0, "Du hast 10 Münzen", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        expl1.y = game.config.height * 0.25;
        expl1.x = (game.config.width/2) - (expl1.width/2);

        var expl2 = this.add.text(0, 0, "dazu gewonnen", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        expl2.y = game.config.height * 0.35;
        expl2.x = (game.config.width/2) - (expl2.width/2);


        coinImage = this.add.image(0, 0, 'coin');
        coinImage.setScale(0.2);
        coinImage.y = (game.config.height * 0.5);
        coinImage.x = (game.config.width / 2) - 100;
        

        counterText = this.add.text(0, 0, count, {fontFamily: 'AhkioW05-Light', fontSize: '80px', fill: "#000000" });
        counterText.y = coinImage.y - (counterText.height/2);
        counterText.x = coinImage.x + 100;
        counterText.setDepth(1);


        

        /**
         ***********************************    HOMEBUTTON     ***********************************************
         Klickt man auf den Button, kommt man zu Hauptmenü
        **/
        btn_home = this.add.image(50, 50, 'home');
        //btn_home.setScale(0.15);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Picture_Selector');
            this.scene.stop('Puzzle_Game');
            this.scene.stop('Game_Win');
            this.scene.start('Start');
        });

        btn_next = this.add.image(game.config.width * 0.95, 50, 'next');
        btn_next.setScale(0.1);
        btn_next.setInteractive();
        btn_next.on('pointerdown', () => {
            this.scene.stop('Game_Win');
            this.scene.start('Picture_Selector');
        });

        x = 1;
       
    }
    update(){

        setTimeout(function(){ 
            if(x <= 10){
                counterText.setText((count += 1));
               x++;
            }
        }, 800);

    }

    
}