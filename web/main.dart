//Author: Jonathan Søyland-Lier
//The main class for running this application.

import 'dart:html';
import 'package:three/three.dart' as THREE;
import 'package:three/extras/controls/first_person_controls.dart';
import '../lib/lifesim.dart' as LifeSim;

class Game {
  LifeSim.WorldUnitSizes unitSize; //UnitSize the the world.
  LifeSim.World world;
  LifeSim.WorldMaterials materials;
  LifeSim.House house;
  LifeSim.MapGenerator mGenerator;

  FirstPersonControls controls;
  num MOVESPEED, LOOKSPEED;

  void init() {

    //Sett values
    materials = new LifeSim.WorldMaterials(); //Different materials
    unitSize = new LifeSim.WorldUnitSizes(); //uses default unit sizes.
    mGenerator = new LifeSim.MapGenerator(); //Generates roads and stuff.
    this.MOVESPEED = 1.5;
    this.LOOKSPEED = 0.002;

    //Set up the game world.
    this.world = new LifeSim.World(
        unitSize.getWorldSizeWidth(), unitSize.getWorldSizeDepth())
      ..groundPlane.position.setValues(unitSize.getWorldSizeWidth() / 2, 0.0,
          unitSize.getWorldSizeWidth() / 2)
      ..camera.position.setValues(unitSize.getWorldSizeWidth() / 2,
          unitSize.unit * 3.5, unitSize.getWorldSizeDepth() / 2);

    //Generate roads and houses
    List<THREE.Mesh> meshList = mGenerator.generateMeshes();
    for (THREE.Mesh mesh in meshList) {
      world.sceneAdd(mesh);
    }

    //first person control
    controls = new FirstPersonControls(
        this.world.camera, this.world.renderer.domElement);
    controls.movementSpeed = MOVESPEED;
    controls.lookSpeed = LOOKSPEED;
    controls.lookVertical = false;
    controls.mouseDragOn = true;
  }

  void animate(num time) {
    window.requestAnimationFrame(animate);
    controls.update(1.0);
    this.world.render();
  }
}

void main() {
  Game game = new Game();
  game.init();
  game.animate(0);
}
