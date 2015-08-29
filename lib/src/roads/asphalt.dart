//Author: Jonathan Søyland-Lier
//makes a road out of asphalt.

part of lifesim;

class Asphalt extends Road {
  THREE.Mesh asphalt;

  Asphalt(WorldUnitCube asphaltSize, THREE.Material material)
      : super(asphaltSize) {
    asphalt = new THREE.Mesh(this.roadPlane.wallPlane, material);
    asphalt.rotation.x = THREE.degToRad(this.roadPlane.wallDeg);
  }
}
