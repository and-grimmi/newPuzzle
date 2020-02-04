/**********************************************************     SCHRIFTART      ***************************************************/

var new_font = new FontFace('AhkioW05-Light', 'url(Fonts/AhkioW05-Light.ttf)');
new_font.load().then(function(loaded_face) {
    document.fonts.add(loaded_face);
}).catch(function(error) {
});

/**********************************************************    SETUP FÜR PHASER    ***********************************************/

let config = {
    type: Phaser.AUTO,
    width: 900,
    height: 1200,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Start, Instruction, Picture_Selector, Picture_Selector2, Puzzle_Game, Game_Win, Game_Over]
};

var game = new Phaser.Game(config);

