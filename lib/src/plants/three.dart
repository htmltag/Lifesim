//Author: Jonathan Søyland-Lier
//Blueprint of a three.import.

part of lifesim;

class Three {
  THREE.CubeGeometry trunkCubeGeometry;
  THREE.CubeGeometry leavesCubeGeometry;
  Vector3 trunkV3;
  Vector3 leavesV3;

  Three(WorldUnitCube threeSize) {
    trunkCubeGeometry = new THREE.CubeGeometry(
        threeSize.width / 4, threeSize.height * 4, threeSize.depth / 4);
    leavesCubeGeometry = new THREE.CubeGeometry(
        threeSize.width, threeSize.height, threeSize.depth);
    posistionTrunkLeaves(threeSize);
  }

  void posistionTrunkLeaves(WorldUnitCube threeSize) {
    trunkV3 = new Vector3(
        threeSize.width / 2, threeSize.height * 2, threeSize.depth / 2);
    leavesV3 = new Vector3(
        threeSize.width / 2, threeSize.height * 4, threeSize.depth / 2);
  }
}
