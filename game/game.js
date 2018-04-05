var canvas = document.getElementById("game-canvas-1");
var engine = new BABYLON.Engine(canvas, true);
function createScene() {
    var scene = new BABYLON.Scene(engine);
    scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
    var camera = new BABYLON.UniversalCamera('camera', new BABYLON.Vector3(0, 5, -10), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);
    camera.applyGravity = true;
    camera.elipsoid = new BABYLON.Vector3(1, 1, 1);
    scene.collisionsEnabled = true;
    camera.checkCollisions = true;
    var light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
    var sphere = new BABYLON.MeshBuilder.CreateSphere('sphere', {segments: 16, diameter: 2}, scene);
    sphere.checkCollisions = true;
    sphere.position.y = 1;
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
