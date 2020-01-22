/**********************************************************     GLOBALE VARIABLEN   **********************************************/
var background;           
var PUZZLE_DIFFICULTY =


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