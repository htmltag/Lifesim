//Author: Jonathan Søyland-Lier
//Blueprint of a building.

part of lifesim;

class Building {
  Plane wall1;
  Plane wall2;
  Plane wall3;
  Plane wall4;
  Plane roof;
  double floorHeight;
  int numOfFloors;
  double width;
  double length;
  bool isInsideHouse;

  Building(WorldUnitCube buildingSize, this.numOfFloors, this.isInsideHouse) {
    this.width = buildingSize.width;
    this.length = buildingSize.depth;
    this.floorHeight = buildingSize.height;
    wall1 = new Plane();
    wall2 = new Plane();
    wall3 = new Plane();
    wall4 = new Plane();
    roof = new Plane();

    //Build clockwise wall1 is 12, wall2 is 3, wall3 is 6 and wall 4 is 9.
    this.wall1.wallPlane = new THREE.PlaneGeometry(
        this.width, this.floorHeight * this.numOfFloors);
    this.wall2.wallPlane = new THREE.PlaneGeometry(
        this.length, this.floorHeight * this.numOfFloors);
    this.wall3.wallPlane = new THREE.PlaneGeometry(
        this.width, this.floorHeight * this.numOfFloors);
    this.wall4.wallPlane = new THREE.PlaneGeometry(
        this.length, this.floorHeight * this.numOfFloors);
    this.roof.wallPlane = new THREE.PlaneGeometry(this.width, this.length);

    this.wall1.wallV3 = new Vector3(
        this.width / 2, (this.floorHeight * this.numOfFloors) / 2, 0.0);
    this.wall2.wallV3 = new Vector3(
        0.0, (this.floorHeight * this.numOfFloors) / 2, -this.length / 2);
    this.wall3.wallV3 = new Vector3(this.width / 2,
        (this.floorHeight * this.numOfFloors) / 2, (-this.length * 2) / 2);
    this.wall4.wallV3 = new Vector3(this.width,
        (this.floorHeight * this.numOfFloors) / 2, -this.length / 2);
    this.roof.wallV3 = new Vector3(this.width / 2,
        (this.floorHeight * this.numOfFloors), -this.length / 2);

    if (this.isInsideHouse) {
      this.wall1.wallDeg = 0;
      this.wall2.wallDeg = -270;
      this.wall3.wallDeg = 180;
      this.wall4.wallDeg = 270;
      this.roof.wallDeg = 90;
    } else {
      this.wall1.wallDeg = 0;
      this.wall2.wallDeg = 270;
      this.wall3.wallDeg = 180;
      this.wall4.wallDeg = -270;
      this.roof.wallDeg = -90;
      //this.wall1.wallDeg = -180;
      //this.wall2.wallDeg = 270;
      //this.wall3.wallDeg = 0;
      //this.wall4.wallDeg = -270;
      //this.roof.wallDeg = -90;
    }
  }
}
