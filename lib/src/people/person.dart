//Author: Jonathan Søyland-Lier
//Blueprint of a person.

part of lifesim;

class Person {
  THREE.CubeGeometry leftArmCube;
  Vector3 leftArmV3;
  THREE.CubeGeometry rightArmCube;
  Vector3 rightArmV3;
  THREE.CubeGeometry leftLegCube;
  Vector3 leftLegV3;
  THREE.CubeGeometry rightLegCube;
  Vector3 rightLegV3;
  THREE.CubeGeometry torsoCube;
  Vector3 torsoV3;
  THREE.CubeGeometry headCube;
  Vector3 headV3;

  Person(double size) {
    WorldUnitSizes wus = new WorldUnitSizes();
    this.torsoCube =
        new THREE.CubeGeometry(wus.unit, wus.unit * size, wus.unit);

    this.headCube =
        new THREE.CubeGeometry(wus.unit / 1.5, wus.unit / 1.5, wus.unit / 1.5);

    this.leftArmCube =
        new THREE.CubeGeometry(wus.unit / 8, wus.unit * size, wus.unit / 4);

    this.rightArmCube =
        new THREE.CubeGeometry(wus.unit / 8, wus.unit * size, wus.unit / 4);

    this.leftLegCube =
        new THREE.CubeGeometry(wus.unit / 4, wus.unit * size, wus.unit / 4);

    this.rightLegCube =
        new THREE.CubeGeometry(wus.unit / 4, wus.unit * size, wus.unit / 4);

    this.torsoV3 = new Vector3((wus.unit * size) / 2,
        (wus.unit * size) + (wus.unit / 2), wus.unit / 2);

    this.headV3 = new Vector3((wus.unit * size) / 2,
        ((wus.unit * size) * 2) - (wus.unit / 4), (wus.unit * size) / 4);

    this.leftArmV3 = new Vector3(((wus.unit * size) / 2) -
        (wus.unit / 2) -
        (wus.unit / 8), (wus.unit * size) + (wus.unit / 2), wus.unit / 2);

    this.rightArmV3 = new Vector3(((wus.unit * size) / 2) +
        (wus.unit / 2) +
        (wus.unit / 8), (wus.unit * size) + (wus.unit / 2), wus.unit / 2);

    this.leftLegV3 = new Vector3(
        ((wus.unit * size) / 2) - (wus.unit / 4), wus.unit / 2, wus.unit / 2);

    this.rightLegV3 = new Vector3(
        ((wus.unit * size) / 2) + (wus.unit / 4), wus.unit / 2, wus.unit / 2);
  }
}
