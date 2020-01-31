/**********************************************************     GLOBALE VARIABLEN   **********************************************/
var title;                                                                 // Titel des Spiels
var background;                                                       
var btn_home;

class Instruction extends Phaser.Scene{
    
    constructor() {
        super({key: 'Instruction'});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */

    preload(){
        this.load.image('weltall', 'assets/weltall.png');
        this.load.image('home', 'assets/home.png');
        this.load.video('gif', 'assets/Anleitung.gif', 'loadeddata', false, true);
        
    }

    create() { 
        /**
        **********************************    HINTERGRUND     *********************************************
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

        btn_home = this.add.image(50, 50, 'home');
        btn_home.setScale(0.15);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Instruction');
            this.scene.start('Start');
        });

        var expl1 = this.add.text(0, 0, "Durch das Tauschen eines Puzzleteils", {fontFamily: 'AhkioW05-Light', fontSize: '60px', fill: "#000000"});
        expl1.y = game.config.height * 0.10;
        expl1.x = (game.config.width/2) - (expl1.width/2);

        var expl2 = this.add.text(0, 0, "verlierst du eine Münze.", {fontFamily: 'AhkioW05-Light', fontSize: '60px', fill: "#000000"});
        expl2.y = game.config.height * 0.15;
        expl2.x = (game.config.width/2) - (expl2.width/2);

        var expl3 = this.add.text(0, 0, "Pass auf,", {fontFamily: 'AhkioW05-Light', fontSize: '60px', fill: "#000000"});
        expl3.y = game.config.height * 0.20;
        expl3.x = (game.config.width/2) - (expl3.width/2);

        var expl4 = this.add.text(0, 0, "dass du nicht alle Münzen ausgibst!!", {fontFamily: 'AhkioW05-Light', fontSize: '60px', fill: "#000000"});
        expl4.y = game.config.height * 0.25;
        expl4.x = (game.config.width/2) - (expl4.width/2);



        var video = this.add.video(game.config.width * 0.5, game.config.height * 0.60, 'gif');
        video.play(true);
        video.setScale(0.9);
    }
}