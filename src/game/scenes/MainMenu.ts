// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

export default class MainMenu extends Phaser.Scene {

	constructor() {
		super("MainMenu");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	editorCreate(): void {

		// background
		this.add.image(512, 384, "background");

		// logo
		const logo = this.add.image(512, 384, "logo");

		// text
		const text = this.add.text(512, 264, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "DNAliens";
		text.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "Arial Black", "fontSize": "128px", "stroke": "#000000", "strokeThickness": 8 });

		// text_1
		const text_1 = this.add.text(71, 458, "", {});
		text_1.text = "This is a simple game demonstrating how levels \ncan be organized to tell small sections of \na story to protect application stability.\n";
		text_1.setStyle({ "fontSize": "32px" });

		this.logo = logo;

		this.events.emit("scene-awake");
	}

	private logo!: Phaser.GameObjects.Image;

	/* START-USER-CODE */
    logoTween: Phaser.Tweens.Tween | null;

	// Write your code here
    create ()
    {
        this.editorCreate();

        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    moveLogo (vueCallback: ({ x, y }: { x: number, y: number }) => void)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        } 
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (vueCallback)
                    {
                        vueCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
export { MainMenu };