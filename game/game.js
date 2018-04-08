class Player {
    constructor(game) {
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
        camera.speed = 2;
        camera.inertia = 0.7;
        camera.angularSensibility = 5000;
        camera.angularInertia = 0;
        // collisions
        camera.checkCollisions = true;
        // gravity
        camera.applyGravity = true;
        camera.fov = 1;
        return camera;
    }
}
class Weapon {
    constructor(game, player) {
        this.game = game;
        this.player = player;
        this.mat = new BABYLON.StandardMaterial("mat", this.game.scene);
        this.mat.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);
        this.mesh = this.createWeapon();
        this.zoomed = false;
        this.gunSight = this.addGunSight(this.game.scene);
    }
    createWeapon() {
        var barrel =  BABYLON.MeshBuilder.CreateCylinder('barrel', {diameter: 0.25, height: 4}, this.game.scene);
        barrel.position.z += 0.5;
        barrel.rotation.x = Math.PI/2;

        var upper = BABYLON.MeshBuilder.CreateBox('upper', {height: 0.25, width: 0.25, depth: 2}, this.game.scene);

        var scope = BABYLON.MeshBuilder.CreateCylinder('scope', {diameter: 0.25, height: 0.5}, this.game.scene);
        scope.position.y += 0.25;
        scope.rotation.x = Math.PI/2;
        var hole = BABYLON.MeshBuilder.CreateCylinder('scope', {diameter: 0.22, height: 0.5}, this.game.scene);
        hole.position.y += 0.25;
        hole.rotation.x = Math.PI/2;
        var scopeCSG = BABYLON.CSG.FromMesh(scope);
        scopeCSG.subtractInPlace(BABYLON.CSG.FromMesh(hole));
        scope = scopeCSG.toMesh("scope", this.mat, this.game.scene, false);
        hole.dispose();

        var lower = BABYLON.MeshBuilder.CreateBox('lower', {height: 0.75, width: 0.25, depth: 0.25}, this.game.scene);
        lower.position.y -= 0.25;
        lower.position.z -= 0.75;
        lower.rotation.x = Math.PI/6;

        var magazine = BABYLON.MeshBuilder.CreateBox('magazine', {height: 0.5, width: 0.25, depth: 0.25}, this.game.scene);
        magazine.position.y -= 0.25;

        var stock = BABYLON.MeshBuilder.CreateBox('stock', {height: 0.25, width: 0.25, depth: 0.5}, this.game.scene);
        stock.rotation.x = Math.PI/2;
        stock.position.y -= 0.25;
        stock.position.z -= 1.5;

        var mesh = BABYLON.Mesh.MergeMeshes([barrel, scope, upper, lower, magazine, stock]);
        mesh.position.x += 0.5;
        mesh.position.y -= 0.3;
        mesh.position.z += 2;
        mesh.parent = this.player.camera;
        mesh.material = this.mat;
        return mesh;
    }
    toggleZoom() {
        if(this.zoomed) {
            this.zoomed = false;
            this.player.camera.fov = 1;
            this.mesh.position.x = 0.5;
            this.mesh.position.y = -0.3;
            this.mesh.position.z = 2;
        }
        else {
            this.zoomed = true;
            this.player.camera.fov = 0.25;
            this.mesh.position.x = 0;
            this.mesh.position.y = -0.25;
            this.mesh.position.z = 1;
        }
    }
    addGunSight(scene) { // taken from https://www.babylonjs-playground.com/index.html#2GXKNW#22
        if (scene.activeCameras.length === 0){
            scene.activeCameras.push(scene.activeCamera);
        }

        var secondCamera = new BABYLON.FreeCamera("GunSightCamera", new BABYLON.Vector3(0, 0, -50), scene);
        secondCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
        secondCamera.layerMask = 0x20000000;
        scene.activeCameras.push(secondCamera);

        var meshes = [];
        var h = 250;
        var w = 250;

        var y = BABYLON.Mesh.CreateBox("y", h * .2, scene);
        y.scaling = new BABYLON.Vector3(0.05, 1, 1);
        y.position = new BABYLON.Vector3(0, 0, 0);
        meshes.push(y);

        var x = BABYLON.Mesh.CreateBox("x", h * .2, scene);
        x.scaling = new BABYLON.Vector3(1, 0.05, 1);
        x.position = new BABYLON.Vector3(0, 0, 0);
        meshes.push(x);

        var lineTop = BABYLON.Mesh.CreateBox("lineTop", w * .8, scene);
        lineTop.scaling = new BABYLON.Vector3(1, 0.005, 1);
        lineTop.position = new BABYLON.Vector3(0, h * 0.5, 0);
        meshes.push(lineTop);

        var lineBottom = BABYLON.Mesh.CreateBox("lineBottom", w * .8, scene);
        lineBottom.scaling = new BABYLON.Vector3(1, 0.005, 1);
        lineBottom.position = new BABYLON.Vector3(0, h * -0.5, 0);
        meshes.push(lineBottom);

        var lineLeft = BABYLON.Mesh.CreateBox("lineLeft", h, scene);
        lineLeft.scaling = new BABYLON.Vector3(0.010, 1,  1);
        lineLeft.position = new BABYLON.Vector3(w * -.4, 0, 0);
        meshes.push(lineLeft);

        var lineRight = BABYLON.Mesh.CreateBox("lineRight", h, scene);
        lineRight.scaling = new BABYLON.Vector3(0.010, 1,  1);
        lineRight.position = new BABYLON.Vector3(w * .4, 0, 0);
        meshes.push(lineRight);

        var gunSight = BABYLON.Mesh.MergeMeshes(meshes);
        gunSight.name = "gunSight";
        gunSight.layerMask = 0x20000000;
        gunSight.freezeWorldMatrix();

        var mat = new BABYLON.StandardMaterial("emissive mat",scene);
        mat.checkReadyOnlyOnce = true;
        mat.emissiveColor = new BABYLON.Color3(0,1,0);

        gunSight.material = mat;
        return gunSight;
    }
    shoot() {
        var bullet = BABYLON.MeshBuilder.CreateCylinder('bullet', {diameter: 0.07, height: 0.15}, this.game.scene);
        // set up the position of the bullet
        bullet.rotation.x = this.player.camera.rotation.x + Math.PI/2;
        bullet.rotation.y = this.player.camera.rotation.y;
        bullet.rotation.z = this.player.camera.rotation.z;
        var x = this.player.weapon.gunSight.position.x + this.player.camera.position.x;
        var y = this.player.weapon.gunSight.position.y + this.player.camera.position.y;
        var z = this.player.weapon.gunSight.position.z + this.player.camera.position.z;
        bullet.position = new BABYLON.Vector3(x, y, z);

        // set the material of the bullet
        bullet.material = new BABYLON.StandardMaterial('bulletTexture', this.game.scene);
        bullet.material.diffuseColor = new BABYLON.Color3(3, 2, 0);

        var invView = new BABYLON.Matrix();
        this.player.camera.getViewMatrix().invertToRef(invView);
        var direction = BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(0, 0, 1), invView);
        direction.normalize();
        direction.scaleInPlace(10);

        bullet.physicsImpostor = new BABYLON.PhysicsImpostor(bullet, BABYLON.PhysicsImpostor.CylinderImpostor, {mass: .1, restitution: 0.5}, this.game.scene);
        bullet.physicsImpostor.applyImpulse(direction, bullet.getAbsolutePosition());
        bullet.physicsImpostor.registerOnPhysicsCollide(this.game.map.ground.physicsImpostor, function(main, collided) {
            main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
        });
        for(var i = 0;i < this.game.targets.length;i++) {
            bullet.physicsImpostor.registerOnPhysicsCollide(this.game.targets[i].mesh.physicsImpostor, function (main, collided) {
                toBeRemoved.push(main.object);
                collided.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
            });
        }
        for(var i = 0;i < this.game.enemies.length;i++) {
            bullet.physicsImpostor.registerOnPhysicsCollide(this.game.enemies[i].mesh.physicsImpostor, function (main, collided) {
                toBeRemoved.push(main.object);
                toBeRemoved.push(collided.object);
            });
        }
    }
}
class Enemy {
    constructor(game, position) {
        this.game = game;
        this.position = position;
        this.mesh = this.createMesh();
    }
    createMesh() {
        var box = new BABYLON.MeshBuilder.CreateBox('enemy', {height: 5, width: 5, depth: 5}, this.game.scene);
        box.position = this.position;
        box.physicsImpostor = new BABYLON.PhysicsImpostor(box, BABYLON.PhysicsImpostor.BoxImpostor, {mass: 0.1, restitution: 0.5}, this.game.scene);
        box.checkCollisions = true;
        return box;
    }
}
class Target {
    constructor(game, position) {
        this.game = game;
        var sphere = new BABYLON.MeshBuilder.CreateSphere('Target', {segments: 64, diameter: 4}, this.game.scene);
        sphere.position = position;
        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, {mass: 1, restitution: 0}, this.game.scene);
        sphere.checkCollisions = true;
        this.mesh = sphere;
        this.mesh.material = new BABYLON.StandardMaterial('bulletTexture', this.game.scene);
        this.mesh.material.diffuseColor = new BABYLON.Color3(3, 2, 0);
    }
}
class Map {
    constructor(game) {
        this.game = game;
        var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0));
        this.ground = BABYLON.MeshBuilder.CreateBox('ground1', {height: 5, width: 100, depth: 100, subdivisions: 4}, this.game.scene);
        this.ground.physicsImpostor = new BABYLON.PhysicsImpostor(this.ground, BABYLON.PhysicsImpostor.BoxImpostor, {move: false, mass: 0, restitution: 0.5, friction: 0.5}, this.game.scene);
        this.ground.checkCollisions = true;
    }
}
class Game {
    constructor(engine) {
        this.engine = engine;
        this.scene = this.createScene();
        // add things
        this.player = new Player(this);
        this.map = new Map(this);
        this.targets = [
            new Target(this, new BABYLON.Vector3(0, 0, 0)),
            new Target(this, new BABYLON.Vector3(4, 2, 0)),
            new Target(this, new BABYLON.Vector3(8, 1, 0)),
            new Target(this, new BABYLON.Vector3(14, 2, 0))
        ];
        this.enemies = [
            new Enemy(this, new BABYLON.Vector3(4, 6, 4))
        ];
        createEventListeners(this.player);
        function createEventListeners(player) {
            // shooting
            window.addEventListener('click', function() {
                player.weapon.shoot();
            });
            // keypresses
            window.addEventListener('keydown', function(e) {
                switch(e.keyCode) {
                    case 16:
                        player.weapon.toggleZoom();
                        break;
                }
            });
            window.addEventListener('keyup', function(e) {
                switch(e.keyCode) {
                    case 16:
                        player.weapon.toggleZoom();
                        break;
                }
            });
        }
    }
    createScene() {
        var scene = new BABYLON.Scene(this.engine);
        // gravity
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
        var physics = new BABYLON.CannonJSPlugin();
        scene.enablePhysics(scene.gravity, physics);
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

//global list of things to be removed at each tick of the render loop
var toBeRemoved = [];
window.onload = function() {
    // create the engine, game
    var engine = new BABYLON.Engine(canvas, true);
    engine.isPointerLock = true;
    g = new Game(engine);
    // start it!
    engine.runRenderLoop(function () {
        g.scene.render();
        for(var i = 0;i < toBeRemoved.length;i++) {
            console.log("To Be Removed: "+toBeRemoved[i]);
            toBeRemoved[i].dispose();
        }
        toBeRemoved = [];
    });
    window.addEventListener('resize', function () {
        engine.resize();
    });
}
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



