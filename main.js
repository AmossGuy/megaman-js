"use strict";

var game;

window.onload = function() {
	game = new Phaser.Game({
		parent: "game-area",
		width: 400,
		height: 224,
		scene: LevelScene,
		canvasStyle: "width: 100%; height: 100%;",
		render: {
			pixelArt: true
		}
	});
}
