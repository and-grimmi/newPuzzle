
class Game_Easy extends Phaser.Scene {

    constructor() {
        super({ key: "Game_Easy"});
    }

    preload() {
        this.load.spritesheet('sam','assets/sam.png');
    }

    create(){
        var car = this.add.sprite(570,100,'sam');
    }



}