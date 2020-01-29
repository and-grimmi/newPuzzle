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
        //Icons erstellt von <a href="https://www.flaticon.com/de/autoren/gregor-cresnar" title="Gregor Cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com/de/" title="Flaticon"> www.flaticon.com</a>
        this.load.video('gif', 'assets/gif.mp4', 'loadeddata', false, true);
        
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
        //btn_home.setScale(0.2);
        btn_home.setDepth(1);
        btn_home.setInteractive();
        btn_home.on('pointerdown', () => {
            this.scene.stop('Instruction');
            this.scene.start('Start');
        });



        var video = this.add.video(game.config.width * 0.5, game.config.height * 0.60, 'gif');
        video.play(true);
        video.setScale(0.9);
    }
}