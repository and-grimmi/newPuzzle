/**********************************************************     GLOBALE VARIABLEN   **********************************************/
var title;                                                                      // Titel des Spiels
var btn_easy, btn_medium, btn_hard;                                             // Button zur Levelauswahl
var background, classic;                                                        // Dekoelemente
var btn_frage;


class Start extends Phaser.Scene{
    
    constructor() {
        super({key: 'Start'});
    }

    /**
     ***************************************    BENÖTIGTE BILDER   ***************************************
     Um die Bilder zu ersetzten bitte die Datei mit dem Pfad in die Funktion preload() einfügen
     Es ist darauf zu achten die Bilder in der Funktion create() passend zu skalieren
    */

    preload(){
        this.load.image('weltall', 'assets/weltall.png');
        this.load.image('classic', 'assets/Splashsite_Classic.png');
        this.load.image('frage', 'assets/frage.png');
        //this.load.video('gif', 'assets/gif.mp4', 'loadeddata', false, true);
        
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

        /**
        ***********************************    FRAGE-BUTTON     ***********************************************
        Klickt man auf das Icon, gelangt man zu der Anleitung.
        **/  
        btn_frage = this.add.image(game.config.width * 0.95, 50, 'frage');
        btn_frage.setScale(0.1);
        btn_frage.setInteractive();
        btn_frage.on('pointerdown', () => {this.scene.start('Instruction');}); 

        /**
         ***************************************         STARTSEITE      ***********************************************
         Der Titel, die Kurzbeschreibung und die Bilder zur Präsentation werden hinzugefügt und zum Teil nicht sichtbar gesetzt
         Die Positionen sind alle relativ zur Höhe und Breite der Spiel-Config
        */
        title = this.add.text(0,0, "Willkommen beim Puzzle", {fontFamily: 'AhkioW05-Light', fontSize: '70px', fill: "#000000"});
        title.y = game.config.height * 0.1;
        title.x = (game.config.width/2) - (title.width/2);

       /* var video = this.add.video(game.config.width * 0.5, game.config.height * 0.73, 'gif');
        video.play(true);*/


        classic = this.add.image(0, 0, 'classic');
        classic.y = game.config.height * 0.73;
        classic.x = game.config.width * 0.5;
        //classic.setScale(0.9);

        /**
         **********************************************     LEVELBUTTONS        *******************************************************
         Texte welche als Button fungieren
         OnHover: der Text wird schattiert
         Klickt man auf den Text, so gelant man zum jeweiligen Level
        */


        btn_easy = this.add.text(0, 0,  "LEICHT", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_easy.y = game.config.height * 0.20;
        btn_easy.x = game.config.width/2 - 75;
        btn_easy.setInteractive();
        btn_easy.on('pointerup', () => {btn_easy.setStyle({fill: "#7F7F7F"}); this.scene.start('Picture_Selector',{ dificulty: 3, count: 20})});
        btn_easy.on('pointerover', () => {
            btn_easy.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_easy.on('pointerout', () => {
            btn_easy.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_medium = this.add.text(0, 0,  "MITTEL", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_medium.y = game.config.height * 0.30;
        btn_medium.x = game.config.width/2 - 75;
        btn_medium.setInteractive();
        btn_medium.on('pointerup', () => {btn_medium.setStyle({fill: "#7F7F7F"}); this.scene.start('Picture_Selector',{ dificulty: 4, count: 25})});
        btn_medium.on('pointerover', () => {
            btn_medium.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_medium.on('pointerout', () => {
            btn_medium.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })

        btn_hard = this.add.text(0, 0,  "SCHWER", {fontFamily: 'AhkioW05-Light', fontSize: '50px', fill: "#000000"});   
        btn_hard.y = game.config.height * 0.40;
        btn_hard.x = game.config.width/2 - 75;
        btn_hard.setInteractive();
        btn_hard.on('pointerup', () => {btn_hard.setStyle({fill: "#7F7F7F"}); this.scene.start('Picture_Selector',{ dificulty: 5, count: 30})});
        btn_hard.on('pointerover', () => {
            btn_hard.setShadow(3, 3, 'rgba(0,0,0,0.78)', 5);
        })
        btn_hard.on('pointerout', () => {
            btn_hard.setShadow(0, 0, 'rgba(0,0,0,0.78)', 0);
        })


    }
}