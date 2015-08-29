//Author: Jonathan Søyland-Lier
//blueprint for roads.import.

part of lifesim;

class Road {
  Plane roadPlane;

  Road(WorldUnitCube asphaltSize) {
    this.roadPlane = new Plane();
    this.roadPlane.wallPlane =
        new THREE.PlaneGeometry(asphaltSize.width, asphaltSize.depth);
    this.roadPlane.wallDeg = -90;
  }
}
