// Define a player class that extends the me.Entity class
class Player extends me.Entity {
    constructor(x, y, settings) {
        super(x, y, settings);

        // Set the player's speed and direction
        this.body.setMaxVelocity(4, 4);
        this.body.setFriction(0.4, 0.4);
        this.direction = new me.Vector2d(0, 0);
    }

    // Update the player's movement based on user input
    update(dt) {
        // Get the user input for movement
        this.direction.set(0, 0);
        if (me.input.isKeyPressed("left")) {
            this.direction.x -= 1;
        }
        if (me.input.isKeyPressed("right")) {
            this.direction.x += 1;
        }
        if (me.input.isKeyPressed("up")) {
            this.direction.y -= 1;
        }
        if (me.input.isKeyPressed("down")) {
            this.direction.y += 1;
        }

        // Update the player's movement based on the direction and speed
        this.body.vel.x = this.direction.x * this.body.maxVel.x;
        this.body.vel.y = this.direction.y * this.body.maxVel.y;
        this.body.update(dt);

        // Update the player's animation based on the direction and movement
        if (this.body.vel.x !== 0 || this.body.vel.y !== 0) {
            this.renderable.setCurrentAnimation("walk");
        } else {
            this.renderable.setCurrentAnimation("stand");
        }
        this.renderable.flipX(this.direction.x < 0);
    }
}

// Create a new instance of the player class and add it to the game world
const player = new Player(0, 0, {
    width: 32,
    height: 32,
    "image": "assets/Characters/Human/Human_0_Idle0.png",
    framewidth: 32,
    frameheight: 32,
    anchorPoint: new me.Vector2d(0.5, 0.5),
    shapes: [new me.Rect(0, 0, 32, 32)]
});
me.game.world.addChild(player);
