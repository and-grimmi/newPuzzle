
class Game_Easy extends Phaser.Scene {

    constructor() {
        super({ key: "Game_Easy"});
    }

    preload() {
        this.load.image('sam','assets/sam.png');
    }

    create(){
        background = this.add.image(800,800,'sam');
    }

}