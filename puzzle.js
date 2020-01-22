

/**********************************************************     SCHRIFTART      ***************************************************/

var new_font = new FontFace('AhkioW05-Light', 'url(Fonts/AhkioW05-Light.ttf)');
new_font.load().then(function(loaded_face) {
    document.fonts.add(loaded_face);
}).catch(function(error) {
});

/**********************************************************    SETUP FÜR PHASER    ***********************************************/

var config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    physics: {
        default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Game_Easy]
    //scene: [End_Time]
    //scene: [Start]
};

var game = new Phaser.Game(config);