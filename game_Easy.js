/**********************************************************     GLOBALE VARIABLEN   **********************************************/
var background;           
var catcher;                                                    // Komponenten des Spiels
var timer, t, sec, intervalTime;                                // Komponenten für den Timer
var counter, count;                                             // Komponenten für die Punkte
var btn_back;                                                   // Zurückbutton
var stones = [], coins = [], c, s;                              // Arrays für die Elemente
var coinPointsInterval, stonePointsInterval;                    // Intervalle für die Punkteanzeige
var lives, life = [];                                           // Komponenten für die "Leben"
var coinsFallen, coinsCollected;                                // Zähler für die Auswertung


class Game_Easy extends Phaser.Scene {

    constructor() {
        super({ key: "Game_Easy"});
    }

    preload() {
        this.load.image('sam','assets/sam.png');
    }

    create(){
	/*************************************    HINTERGRUND     ***********************************************
         Ist die Höhe des Bildes kleiner als die Höhe des Geräts, so wird die Höhe an die des Geräts angepasst
         Ist die Breite kleiner als die des Geräts, so wird die Breite des Bildes dem des Geräts angepasst
         Das Verhältnis des Bildes bleibt gleich, sodass sich das Bild nicht streckt
        **/
        background = this.add.image(0, 0, 'sam');   
        if (background.height < game.config.height){
            background.displayHeight = this.sys.game.config.height;
            if(background.width < game.config.width){
                background.displayHeight = this.sys.game.config.height;
            }
        }
        else if(background.width < game.config.width){
            background.displayWidth = this.sys.game.config.width;
        }
        background.scaleX = background.scaleY;
        background.y = game.config.height/2;
        background.x = game.config.width/2;
    }

}