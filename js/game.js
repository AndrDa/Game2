// Define the player object
var PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        // Call the parent constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        // Set the sprite
        this.body.setVelocity(3, 3);
        this.body.setMaxVelocity(3, 3);
        this.body.setFriction(0.4, 0.4);
        this.body.gravity = 0;

        // Set the collision type
        this.body.collisionType = me.collision.types.PLAYER_OBJECT;
    },

    // Update the player position
    update: function(dt) {
        if (me.input.isKeyPressed("up")) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        }
        if (me.input.isKeyPressed("down")) {
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        }
        if (me.input.isKeyPressed("left")) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
        }
        // Update the body's position and velocity
        this.body.update(dt);

        // Return true if the body's position or velocity changed
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    }
});

// Define the game state
var GameState = me.State.extend({
    // Load the game resources
    preload: function() {
        me.loader.preload([
            // Add your game assets here, like images and audio
        ]);
    },

    onResetEvent: function() {
        // Load the player sprite
        me.loader.load(playerImage, function() {
            // Create a new instance of the player entity
            var player = new PlayerEntity(100, 100, {
                "image": playerImage.image,
                "width": playerImage.width,
                "height": playerImage.height
            });

            // Add the player to the game world
            me.game.world.addChild(player);
        });

        // Bind the WASD keys to player movement
        me.input.bindKey(me.input.KEY.W, "up");
        me.input.bindKey(me.input.KEY.A, "left");
        me.input.bindKey(me.input.KEY.S, "down");
        me.input.bindKey(me.input.KEY.D, "right");
    }

    // Clean up the game state
    onDestroyEvent: function() {
        // Remove the player object from the game world
        me.game.world.removeChild(me.game.world.getEntityByName("player")[0]);
    }
});

// Initialize MelonJS
me.init();

// Set the resources to preload
me.loader.preload([
    {name: "player", type: "image", src: "img/player.png"}
]);

// Add the game states to the state manager
me.state.add("game", new GameState());

// Start the game with the game state
me.state.change("game");
