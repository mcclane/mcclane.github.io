class Player {
    constructor(scene) {
        this.scene = scene;
        // set up some constants
        this.camera = this.createCamera();
    }
    createCamera() {
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-5, 4, 0), this.scene);
        camera.attachControl(this.scene.getEngine().getRenderingCanvas());
        camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
        // movement of the camera
        camera.keysUp = [87];    //W
        camera.keysDown = [83];   //D
        camera.keysLeft = [65];  //A
        camera.keysRight = [68]; //S
        camera.speed = 1;
        camera.inertia = 0.9;
        camera.angularSensibility = 5000;
        // collisions
        camera.checkCollisions = true;
        // gravity
        camera.applyGravity = true;
        return camera;
    }
    shoot() {

    }
}
class Target {
    constructor(scene) {
        this.scene = scene;
        var sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, this.scene);
        sphere.position.y = 2;
        sphere.checkCollisions = true;
    }
}
class Map {
    constructor(scene) {
        this.scene = scene;
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
        var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height: 100, width: 100, subdivisions: 2}, this.scene);
        ground.checkCollisions = true;
    }
}
class Game {
    constructor(engine) {
        this.engine = engine;
        this.scene = this.createScene();
    }
    createScene() {
        var scene = new BABYLON.Scene(this.engine);
        console.log(scene);
        // gravity
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        // collisions
        scene.collisionsEnabled = true;
        // add things to the scene
        var t1 = new Target(scene);
        this.player = new Player(scene);
        this.map = new Map(scene);

        return scene;
    }

}
// pointer lock stuff
var canvas = document.getElementById("game-canvas-1");
canvas.requestPointerLock = canvas.requestPointerLock ||
    canvas.mozRequestPointerLock;
document.exitPointerLock = document.exitPointerLock ||
    document.mozExitPointerLock;
canvas.onclick = function() {
    canvas.requestPointerLock();
}

// create the engine, game, and start it!
var engine = new BABYLON.Engine(canvas, true);
engine.isPointerLock = true;
g = new Game(engine);
engine.runRenderLoop(function() {
    g.scene.render();
});

// function createScene() {
//     // scene, gravity, collisions
//     var scene = new BABYLON.Scene(engine);
//     scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
//     scene.collisionsEnabled = true;
//
//     /*
//         camera stuff
//     */
//     var camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 10, 0), scene);
//     camera.attachControl(engine.getRenderingCanvas());
//     camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
//     // movement of the camera
//     camera.keysUp = [87];    //W
//     camera.keysDown = [83];   //D
//     camera.keysLeft = [65];  //A
//     camera.keysRight = [68]; //S
//     camera.speed = 1;
//     camera.inertia = 0.9;
//     camera.angularSensibility = 5000;
//     // collisions
//     camera.checkCollisions = true;
//     // gravity
//     camera.applyGravity = true;
//     /*
//         lighting
//     */
//     var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
//
//     // objects in the scene
//     var sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, scene);
//     sphere.checkCollisions = true;
//     sphere.position.y = 1;
//
//     // ground
//     var ground = new BABYLON.MeshBuilder.CreateGround('ground1', {height: 100, width: 100, subdivisions: 2}, scene);
//     ground.checkCollisions = true;
//
//     return scene;
// }
// rendering the scene
//var scene = createScene();


window.addEventListener('resize', function() {
    engine.resize();
});
