"use strict";

class PlayerObject extends Phaser.Physics.Arcade.Sprite {
	constructor (scene, x, y, keys) {
		super(scene, x, y, "megaman");
		
		this.setData("keys", keys);
		this.setActive(true);
		scene.physics.world.enableBody(this, Phaser.Physics.Arcade.DYNAMIC_BODY);
		this.setCollideWorldBounds(true);
		this.body.gravity.y = 0.25 * 60 * 60;
		this.setMaxVelocity(Infinity, 6.25 * 60);
		scene.physics.add.collider(this, scene.data.get("solidgroup"));
		scene.events.addListener("update", this.update, this);
		
		this.setOrigin(0.5, 1);
		
		this.setSize(15, 39).setOffset(10, 0);
		
		scene.add.existing(this);
	}
	update () {
		var left = this.data.get("keys")["left"].isDown;
		var right = this.data.get("keys")["right"].isDown;
		var direction = left * -1 + right * 1;
		switch (direction) {
			case -1:
				this.setVelocityX(-1.5 * 60);
				this.flipX = true;
				break;
			case 1:
				this.setVelocityX(1.5 * 60);
				this.flipX = false;
				break;
			case 0:
				this.setVelocityX(0);
				break;
		}
		
		if (this.data.get("keys")["jump"].isDown && this.body.onFloor()) {
			this.setVelocityY(-5 * 60); // fix
		}
	}
}
