/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {

	constructor() {
		super("Game");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
		const background = this.add.image(525, 250, "starry-background");
		background.alpha = 0.5;

		// shineFx
		background.preFX!.addShine(0.5, 0.5, 3, false);

		// planet
		const planet = this.add.image(182, 679, "planet-foreground");
		planet.scaleX = 0.8256807618576166;
		planet.scaleY = 0.4273117498493313;

		// player-character
		const player_character = this.add.sprite(235, 644, "player-character");
		player_character.name="player-character";
		player_character.scaleX = 0.3;
		player_character.scaleY = 0.3;
		player_character.flipX = true;

		// lop-character
		const lop_character = this.add.sprite(895, 603, "lop");
		lop_character.name="lop-character";
		lop_character.scaleX = 0.1;
		lop_character.scaleY = 0.1;

		// spaceship
		const spaceship = this.add.sprite(1125, 113, "spaceship-256");
		spaceship.name="spaceship";
		spaceship.scaleX = 0.5;
		spaceship.scaleY = 0.5;
		spaceship.angle = -166;

		// spaceship_crashed
		const spaceship_crashed = this.add.sprite(-452, 561, "spaceship-crashed-2048");
		spaceship_crashed.scaleX = 0.2;
		spaceship_crashed.scaleY = 0.2;
		spaceship_crashed.angle = 172;

		// frisbee
		const frisbee = this.add.sprite(339, 658, "frisbee");
		frisbee.name="frisbee";
		frisbee.scaleX = 0.5;
		frisbee.scaleY = 0.5;
		frisbee.setInteractive();

		// text_1
		const text_1 = this.add.text(370, 698, "", {});
		text_1.text = "Click the frisbee to throw it!";
		text_1.setStyle({ "backgroundColor": "#087590ff", "strokeThickness": 0.5 });

		// crash
		const crash = this.add.sprite(184, 425, "crash");
		crash.name="crash";
		crash.scaleX = 0.25;
		crash.scaleY = 0.25;
		crash.visible = false;

		// glowFx
		crash.postFX!.addGlow(16318083, 4, 0, false, 0.1, 10);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
        this.editorCreate();

        this.cameras.main.setBackgroundColor(0x000000);

        // Add bouncing animation to player character
        this.tweens.add({
            targets: this.children.list.find(child => child.name === 'player-character'),
            y: '+=20',
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

        // Add bouncing animation to lop character
        this.tweens.add({
            targets: this.children.list.find(child => child.name === 'lop-character'),
            y: '+=20',
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });

			const frisbee = this.children.list.find(child => child.name === 'frisbee') as Phaser.GameObjects.Sprite;
			// Store initial position
			const initialX = frisbee.x;
			const initialY = frisbee.y;
			let hasBeenClicked = false;

			frisbee.on('pointerdown', () => {
				// Frisbee animation
				this.tweens.add({
					targets: frisbee,
					x: 895,
					y: 603,
					duration: 1500,
					yoyo: true,
					ease: 'Cubic.easeInOut',
					onComplete: () => {
						frisbee.x = initialX;
						frisbee.y = initialY;
					}
				});

				// Trigger spaceship animation only on first click
				if (!hasBeenClicked) {
					hasBeenClicked = true;
					this.time.delayedCall(2000, () => {
						// Play spaceship sound
						this.sound.play('spaceship-flight-crash');

						this.tweens.add({
							targets: this.children.list.find(child => child.name === 'spaceship') as Phaser.GameObjects.Sprite,
							x: -160,
							y: 480,
							duration: 3000,
							ease: 'Linear'
						});
					});
					this.time.delayedCall(5000, () => {
						const crash = this.children.list.find(child => child.name === 'crash') as Phaser.GameObjects.Sprite;
						crash.visible = true;	
					});
				}
			});

        EventBus.emit('current-scene-ready', this);
	}

    changeScene ()
    {
        this.scene.start('GameOver');
    }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
