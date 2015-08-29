//Author: Jonathan Søyland-Lier
//Here we set togheter a house.

part of lifesim;

class House extends Building {
  THREE.Mesh _wall1Mesh;
  THREE.Mesh _wall2Mesh;
  THREE.Mesh _wall3Mesh;
  THREE.Mesh _wall4Mesh;
  THREE.Mesh _roofMesh;
  THREE.Object3D houseObject3D;
  THREE.MeshBasicMaterial material;

  House(WorldUnitCube buildingSize, int floors, bool isInside, this.material)
      : super(buildingSize, floors, isInside) {
    this._wall1Mesh = new THREE.Mesh(this.wall1.wallPlane, this.material)
      ..name = "wall1"
      ..position.setFrom(this.wall1.wallV3)
      ..rotation.x = THREE.degToRad(this.wall1.wallDeg);

    this._wall2Mesh = new THREE.Mesh(this.wall2.wallPlane, this.material)
      ..name = "wall2"
      ..position.setFrom(this.wall2.wallV3)
      ..rotation.y = THREE.degToRad(this.wall2.wallDeg);

    this._wall3Mesh = new THREE.Mesh(this.wall3.wallPlane, this.material)
      ..name = "wall3"
      ..position.setFrom(this.wall3.wallV3)
      ..rotation.x = THREE.degToRad(this.wall3.wallDeg);

    this._wall4Mesh = new THREE.Mesh(this.wall4.wallPlane, this.material)
      ..name = "wall4"
      ..position.setFrom(this.wall4.wallV3)
      ..rotation.y = THREE.degToRad(this.wall4.wallDeg);

    this._roofMesh = new THREE.Mesh(this.roof.wallPlane, this.material)
      ..name = "roof"
      ..position.setFrom(this.roof.wallV3)
      ..rotation.x = THREE.degToRad(this.roof.wallDeg);

    houseObject3D = new THREE.Object3D();
    houseObject3D.add(this._wall1Mesh);
    houseObject3D.add(this._wall2Mesh);
    houseObject3D.add(this._wall3Mesh);
    houseObject3D.add(this._wall4Mesh);
    houseObject3D.add(this._roofMesh);
    houseObject3D.castShadow = true;
  }

  void addDoorAndWindows(
      THREE.Material doorMaterial, THREE.Material windowMaterial) {
    this._createAndPlaceWindows(
        1, this.numOfFloors, doorMaterial, windowMaterial);
    this._createAndPlaceWindows(
        2, this.numOfFloors, doorMaterial, windowMaterial);
    this._createAndPlaceWindows(
        3, this.numOfFloors, doorMaterial, windowMaterial);
    this._createAndPlaceWindows(
        4, this.numOfFloors, doorMaterial, windowMaterial);
  }

  void _createAndPlaceWindows(int wallNumber, int floorNumber,
      THREE.Material doorMaterial, THREE.Material windowMaterial) {
    Vector3 v3 = this.wall1.wallV3;
    num deg = this.wall1.wallDeg;
    double addToOutsideWall = -0.1;
    switch (wallNumber) {
      case 1:
        v3 = this.wall1.wallV3;
        deg = this.wall1.wallDeg;
        addToOutsideWall = this._wall1Mesh.position.z + 0.1;
        break;
      case 2:
        v3 = this.wall2.wallV3;
        deg = this.wall2.wallDeg;
        addToOutsideWall = this._wall2Mesh.position.x - 0.1;
        break;
      case 3:
        v3 = this.wall3.wallV3;
        deg = this.wall3.wallDeg;
        addToOutsideWall = this._wall3Mesh.position.z - 0.1;
        break;
      case 4:
        v3 = this.wall4.wallV3;
        deg = this.wall4.wallDeg;
        addToOutsideWall = this._wall4Mesh.position.x + 0.1;
        break;
    }

    if (wallNumber == 1 || wallNumber == 3) {
      int numOfWindowsPerFloor = 2;
      double spaceBetweenWindows =
          (this.width / numOfWindowsPerFloor) / (numOfWindowsPerFloor * 8);
      double oneWindowSize =
          (this.width / numOfWindowsPerFloor) + spaceBetweenWindows;
      double freeSpace = this.width - (oneWindowSize * numOfWindowsPerFloor);
      for (int i = 0; i < floorNumber; i++) {
        for (int j = 0; j < numOfWindowsPerFloor; j++) {
          THREE.Mesh windowWall = new THREE.Mesh(new THREE.PlaneGeometry(
              (this.width / numOfWindowsPerFloor) - (spaceBetweenWindows * 4),
              (this.floorHeight / 2)), windowMaterial)
            ..position.setFrom(v3)
            ..position.z = addToOutsideWall
            ..position.y = ((this.floorHeight / floorNumber) / 2) +
                (this.floorHeight) -
                (this.floorHeight / floorNumber)
            ..rotation.x = THREE.degToRad(deg);
          double yHeight = windowWall.position.y;
          windowWall.position.y = yHeight * (i + 1);
          windowWall.position.x = (oneWindowSize / 2) +
              (oneWindowSize * j) +
              ((freeSpace / numOfWindowsPerFloor) + (spaceBetweenWindows / 2));

          this.houseObject3D.add(windowWall);
        }
      }
    } else {
      int numOfWindowsPerFloor = 4;
      int windowCounter = 0;
      double spaceBetweenWindows =
          (this.length / numOfWindowsPerFloor) / (numOfWindowsPerFloor * 2);
      double oneWindowSize =
          (this.length / numOfWindowsPerFloor) + spaceBetweenWindows;
      double freeSpace = this.length - (oneWindowSize * numOfWindowsPerFloor);
      for (int i = 0; i < floorNumber; i++) {
        for (int j = 0; j < numOfWindowsPerFloor; j++) {
          THREE.Mesh windowWall = new THREE.Mesh(new THREE.PlaneGeometry(
              (this.length / numOfWindowsPerFloor) - (spaceBetweenWindows * 4),
              (this.floorHeight / 2)), windowMaterial)
            ..position.setFrom(v3)
            ..position.x = addToOutsideWall
            ..position.y = ((this.floorHeight / floorNumber) / 2) +
                (this.floorHeight) -
                (this.floorHeight / floorNumber)
            ..rotation.y = THREE.degToRad(deg);
          double yHeight = windowWall.position.y;
          windowWall.position.y = yHeight * (i + 1);
          windowWall.position.z = (-oneWindowSize / 2) +
              (-oneWindowSize * j) +
              ((-freeSpace / numOfWindowsPerFloor) + spaceBetweenWindows);
          if (windowCounter != 0 || wallNumber != 2) {
            this.houseObject3D.add(windowWall);
          } else {
            THREE.Mesh doorWall = new THREE.Mesh(new THREE.PlaneGeometry(
                    (this.length / numOfWindowsPerFloor) -
                        (spaceBetweenWindows * 4), (this.floorHeight / 2)),
                doorMaterial)
              ..position.setFrom(v3)
              ..position.x = addToOutsideWall
              ..position.y = ((this.floorHeight / floorNumber) / 2) +
                  (this.floorHeight) -
                  (this.floorHeight / floorNumber)
              ..rotation.y = THREE.degToRad(deg);
            doorWall.position.y = oneWindowSize / 2;
            doorWall.position.z = (-oneWindowSize / 2) +
                (-oneWindowSize * j) +
                ((freeSpace / numOfWindowsPerFloor));
            this.houseObject3D.add(doorWall);
          }
          windowCounter++;
        }
      }
    }
  }
}
