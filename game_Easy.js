
class Game_Easy extends Phaser.Scene {

    constructor() {
        super({ key: "Game_Easy"});
    }

    preload() {
        game.load.spritesheet('sam','assets/sam.png');
    }

    create(){
        var car = game.add.sprite(570,100,'sam');
    }



}