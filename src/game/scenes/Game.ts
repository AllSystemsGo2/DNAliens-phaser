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
		player_character.scaleX = 0.3;
		player_character.scaleY = 0.3;
		player_character.flipX = true;

		// lop-character
		const lop_character = this.add.sprite(895, 603, "lop");
		lop_character.scaleX = 0.1;
		lop_character.scaleY = 0.1;

		// sprite_1
		const sprite_1 = this.add.sprite(1125, 113, "spaceship-256");
		sprite_1.scaleX = 0.5;
		sprite_1.scaleY = 0.5;
		sprite_1.angle = -166;

		// sprite_2
		const sprite_2 = this.add.sprite(-452, 561, "spaceship-crashed-2048");
		sprite_2.scaleX = 0.2;
		sprite_2.scaleY = 0.2;
		sprite_2.angle = 172;

		// frisbee
		const frisbee = this.add.sprite(339, 658, "frisbee");
		frisbee.scaleX = 0.5;
		frisbee.scaleY = 0.5;

		// text_1
		const text_1 = this.add.text(370, 698, "", {});
		text_1.text = "Click the frisbee to throw it!";
		text_1.setStyle({ "backgroundColor": "#087590ff", "strokeThickness": 0.5 });

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

        this.editorCreate();

        this.cameras.main.setBackgroundColor(0x000000);

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
