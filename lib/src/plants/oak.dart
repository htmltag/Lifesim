//Author: Jonathan Søyland-Lier
//Creats an Oak three.

part of lifesim;

class Oak extends Three {
  THREE.Object3D oakObject3D;
  THREE.Mesh trunkMesh;
  THREE.Mesh leavesMesh;

  Oak(WorldUnitCube threeSize, THREE.Material trunkMaterial,
      THREE.Material leavesMaterial)
      : super(threeSize) {
    this.trunkMesh = new THREE.Mesh(this.trunkCubeGeometry, trunkMaterial)
      ..position.setFrom(this.trunkV3);

    this.leavesMesh = new THREE.Mesh(this.leavesCubeGeometry, leavesMaterial)
      ..position.setFrom(this.leavesV3);

    this.oakObject3D = new THREE.Object3D();
    this.oakObject3D.add(this.trunkMesh);
    this.oakObject3D.add(this.leavesMesh);
  }
}
