var canvas = document.getElementById("game-canvas-1");
var engine = new BABYLON.Engine(canvas, true);
function createScene() {
    // scene, gravity, collisions
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    scene.collisionsEnabled = true;

    // camera stuff
    var camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 1, -5), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.keysUp.push(87);    //W
    camera.keysDown.push(83)   //D
    camera.keysLeft.push(65);  //A
    camera.keysRight.push(68); //S
    camera.elipsoid = new BABYLON.Vector3(1, 1, 1);
    camera.applyGravity = true;
    camera.checkCollisions = true;

    // lighting
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);

    // objects in the scene
    var sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, scene);
    sphere.checkCollisions = true;
    sphere.position.y = 1;

    // ground
    var ground = BABYLON.MeshBuilder.CreateGround('ground1', {height: 100, width: 100, subdivisions: 2}, scene);
    ground.checkCollisions = true;

    return scene;
}
var scene = createScene();
engine.runRenderLoop(function() {
    scene.render();
})

window.addEventListener('resize', function() {
    engine.resize();
});
