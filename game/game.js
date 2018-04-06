class Player {
    constructor(game) {
        console.log(game);
        this.game = game;
        this.camera = this.createCamera();
        this.weapon = new Weapon(this.game, this);
    }
    createCamera() {
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(-5, 4, 0), this.game.scene);
        camera.attachControl(this.game.scene.getEngine().getRenderingCanvas());
        camera.ellipsoid = new BABYLON.Vector3(2, 2, 2);
        // movement of the camera
        camera.keysUp = [87];    //W
        camera.keysDown = [83];   //D
        camera.keysLeft = [65];  //A
        camera.keysRight = [68]; //S
        camera.speed = 1;
        camera.inertia = 0.7;
        camera.angularSensibility = 5000;
        camera.angularInertia = 0;
        // collisions
        camera.checkCollisions = true;
        // gravity
        camera.applyGravity = true;
        return camera;
    }
    shoot() {

    }
}
class Weapon {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.mat = new BABYLON.StandardMaterial("mat", this.game.scene);
        // this.mat.emissiveColor = new BABYLON.Color3(1, 0, 1);
        // this.mat.specularColor = new BABYLON.Color3(1, 0, 1);
        this.mat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        this.mesh = this.createWeapon();
        console.log(this.mesh);
    }
    createWeapon() {
        var mesh = BABYLON.MeshBuilder.CreateBox('weapon', {height: 0.5, width: 0.5, depth: 4}, this.game.scene);
        mesh.material = this.mat;
        mesh.rotation.x = -Math.PI;
        mesh.rotation.y = Math.PI;
        mesh.position.x += 2;
        mesh.position.y -= 2;
        mesh.position.z += 5;
        mesh.parent = this.player.camera;
        return mesh;
    }
}
class Target {
    constructor(game) {
        this.game = game;
        var sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 64, diameter: 4}, this.game.scene);
        sphere.position.y = 2;
        sphere.checkCollisions = true;
    }
}
class Map {
    constructor(game) {
        this.game = game;
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0));
        var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height: 100, width: 100, subdivisions: 4}, this.game.scene);
        ground.checkCollisions = true;
    }
}
class Game {
    constructor(engine) {
        this.engine = engine;
        this.scene = this.createScene();
        // add things
        var t1 = new Target(this);
        this.player = new Player(this);
        this.map = new Map(this);
    }
    createScene() {
        var scene = new BABYLON.Scene(this.engine);
        console.log(scene);
        // gravity
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        // collisions
        scene.collisionsEnabled = true;
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
engine.resize();
engine.runRenderLoop(function() {
    g.scene.render();
});
window.addEventListener('resize', function() {
    engine.resize();
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



