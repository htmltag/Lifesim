//Author: Jonathan Søyland-Lier
//Generate grass.

part of lifesim;

class Grass {
  THREE.Mesh grassMesh;

  Grass(WorldUnitCube grassSize, THREE.Material grassMaterial) {
    THREE.PlaneGeometry grassPlane =
        new THREE.PlaneGeometry(grassSize.width, grassSize.depth);
    grassMesh = new THREE.Mesh(grassPlane, grassMaterial)
      ..position.setValues(0.0, 0.0, 0.0)
      ..rotation.x = THREE.degToRad(-90);
  }
}
