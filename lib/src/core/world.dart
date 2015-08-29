//Author: Jonathan Søyland-Lier
//Setting up the game world. The main plane, adding camera and world light.

part of lifesim;

class World {
  double width;
  double length;
  num ambientLightColor;
  num directionalLightColor;
  num planeColor;
  THREE.Mesh groundPlane;
  THREE.DirectionalLight directionalLight;
  THREE.AmbientLight ambientLight;
  THREE.Scene scene;
  THREE.PerspectiveCamera camera;
  Element container;
  THREE.WebGLRenderer renderer;
  WorldMaterials materials;

  World(this.width, this.length) {
    //default values
    this.planeColor = 0xd3d3d3;
    this.ambientLightColor = 0x444444;
    this.directionalLightColor = 0xffffff;

    //Set up this world
    this._createScene();
    this._createPlane();
    this._setUpCamera();
    this._setUpLights();
    this._setUpRenderer();

    //Helpers
    //this._axisHelper();
  }

  //***************constructs new world*****************************

  void _createScene() {
    scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2(0x9db3b5, 0.001); // color, density
  }

  void _createPlane() {
    materials = new WorldMaterials();
    THREE.PlaneGeometry plane = new THREE.PlaneGeometry(width, length);
    this.groundPlane = new THREE.Mesh(plane, materials.ground());
    this.groundPlane.rotation.x = THREE.degToRad(-90);
    scene.add(groundPlane);
  }

  void _setUpCamera() {
    this.camera = new THREE.PerspectiveCamera(
        60.0, window.innerWidth / window.innerHeight, 1.0, 10000.0);
    this.camera.position.y = 40.0;
    this.camera.position.x = width / 2;
    this.camera.position.z = length / 2;
    scene.add(camera);
  }

  void _setUpLights() {
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
      ..position.setValues(width / 2, length / 2, width / 2);
    scene.add(this.directionalLight);

    this.ambientLight = new THREE.AmbientLight(0x444444);
    scene.add(this.ambientLight);
  }

  void _setUpRenderer() {
    //Sets up the renderer.
    container = new Element.tag('span');
    document.body.nodes.add(container);
    renderer = new THREE.WebGLRenderer(antialias: true)
      ..setSize(window.innerWidth, window.innerHeight);
    container.nodes.add(renderer.domElement);

    window.onResize.listen(onWindowResize);
  }

  void render() {
    renderer.render(scene, camera);
  }

  //Takes action if window resizes.
  onWindowResize(event) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  //*********************Scene*****************************

  void sceneAdd(THREE.Object3D object) {
    this.scene.add(object);
  }

  void sceneRemoveObject(THREE.Object3D object) {
    this.scene.remove(object);
  }

  void sceneClear() {
    this.sceneClear();
  }

  //*********************Helpers***************************

  void _axisHelper() {
    THREE.AxisHelper axis = new THREE.AxisHelper();
    scene.add(axis);
  }
}
