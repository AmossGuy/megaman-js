"use strict";

class LevelScene extends Phaser.Scene {
	constructor() {
		super({
			key: "LevelScene",
			physics: {
				default: "arcade",
				arcade: {
				}
			}
		});
	}
	preload() {
		this.load.tilemapTiledJSON("map", "testmap.json");
		this.load.image("testtiles", "testtiles.png");
		this.load.image("megaman", "megaman_sprites/stand.png");
	}
	create() {
		this.data.set("solidgroup", this.add.group());
		
		var tilemap = this.add.tilemap("map");
		
		var tileset = tilemap.addTilesetImage("testtiles");
		var layer = tilemap.createStaticLayer("Tile Layer 1", tileset);
		
		layer.setCollisionFromCollisionGroup();
		this.data.get("solidgroup").add(layer);
		
		var room = tilemap.objects[0]["objects"].filter(function(object) {
			return object["type"] == "room";
		})[0];
		
		this.cameras.main.setBounds(room["x"], room["y"], room["width"], room["height"]);
		this.physics.world.setBounds(room["x"], room["y"], room["width"], room["height"]);
		
		var player_start = tilemap.objects[0]["objects"].filter(function(object) {
			return object["type"] == "player_start";
		})[0];
		
		var player = new PlayerObject(this, player_start["x"], player_start["y"], {
			"left":  this.input.keyboard.addKey(37),
			"right": this.input.keyboard.addKey(39),
			"jump":  this.input.keyboard.addKey(90)
		});
		
		this.cameras.main.startFollow(player);
	}
}
