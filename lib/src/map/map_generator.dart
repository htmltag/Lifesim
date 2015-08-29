//Author: Jonathan Søyland-Lier
//Generates the map.

part of lifesim;

class MapGenerator {
  List<THREE.Mesh> meshList;
  WorldMaterials materials;
  PersonMaterial personMaterials;
  WorldUnitSizes wUnits;
  WorldUnitCube wCube;
  MapList mapList;
  THREE.Material materialGrass,
      materialHouse,
      materialSmallHouse,
      materialNormalHouse,
      materialBigHouse,
      materialWindows,
      materialDoor,
      materialAsphalt,
      materialOakTrunk,
      materialOakLeaves;

  MapGenerator() {
    meshList = new List<THREE.Mesh>();
    materials = new WorldMaterials();
    personMaterials = new PersonMaterial();
    mapList = new MapList();
    wUnits = new WorldUnitSizes();
    materialGrass = materials.grass();
    materialHouse = materials.houseMaterial;
    materialSmallHouse = materials.houseShaderMaterial(
        wUnits.getSmallHouse().width, wUnits.getSmallHouse().depth);
    materialNormalHouse = materials.houseShaderMaterial(
        wUnits.getNormalHouse().width, wUnits.getNormalHouse().depth);
    materialBigHouse = materials.houseShaderMaterial(
        wUnits.getBigHouse().width, wUnits.getBigHouse().depth);
    materialWindows = materials.windowBlue();
    materialDoor = materials.doorBrown();
    materialAsphalt = materials.roadAsphaltBlack();
    materialOakTrunk = materials.oakTrunk();
    materialOakLeaves = materials.oakLeaves();
  }

  List<THREE.Mesh> generateMeshes() {
    List<MapUnits> mList = mapList.generateMap();
    for (MapUnits mu in mList) {
      switch (mu.parts) {
        case MapParts.asphaltRoad:
          meshList.add(makeAsphaltMesh(mu));
          break;
        case MapParts.normalBuilding:
          meshList.add(makeNormalHouseMesh(mu));
          break;
        case MapParts.smallBuilding:
          meshList.add(makeSmallHouseMesh(mu));
          break;
        case MapParts.bigBuilding:
          meshList.add(makeBigHouseMesh(mu));
          break;
        case MapParts.normalOakThree:
          meshList.add(makeNormalOakThreeMesh(mu));
          break;
        case MapParts.normalGrass:
          meshList.add(makeNormalGrassMesh(mu));
          break;
        case MapParts.averageJoe:
          meshList.add(makeAverageJoeMesh(mu));
          break;
      }
    }
    return meshList;
  }

  THREE.Mesh makeAsphaltMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getNormalRoad());
    Asphalt aRoad = new Asphalt(wUnits.getNormalRoad(), this.materialAsphalt);
    aRoad.asphalt.position.setFrom(pos);
    return aRoad.asphalt;
  }

  THREE.Mesh makeNormalHouseMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getNormalHouse());
    House house =
        new House(wUnits.getNormalHouse(), 3, false, this.materialNormalHouse);
    house.houseObject3D.position.setFrom(pos);
    house.addDoorAndWindows(this.materialDoor, this.materialWindows);
    return house.houseObject3D;
  }

  THREE.Mesh makeSmallHouseMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getSmallHouse());
    House house =
        new House(wUnits.getSmallHouse(), 2, false, this.materialSmallHouse);
    house.houseObject3D.position.setFrom(pos);
    house.addDoorAndWindows(this.materialDoor, this.materialWindows);
    return house.houseObject3D;
  }

  THREE.Mesh makeBigHouseMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getBigHouse());
    House house =
        new House(wUnits.getBigHouse(), 4, false, this.materialBigHouse);
    house.houseObject3D.position.setFrom(pos);
    house.addDoorAndWindows(this.materialDoor, this.materialWindows);
    return house.houseObject3D;
  }

  THREE.Mesh makeNormalOakThreeMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getNormalOakThree());
    Oak oak = new Oak(wUnits.getNormalOakThree(), this.materialOakTrunk,
        this.materialOakLeaves);
    oak.oakObject3D.position.setFrom(pos);
    return oak.oakObject3D;
  }

  THREE.Mesh makeNormalGrassMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getNormalGrass());
    Grass grass = new Grass(wUnits.getNormalGrass(), this.materialGrass);
    grass.grassMesh.position.setFrom(pos);
    return grass.grassMesh;
  }

  THREE.Mesh makeAverageJoeMesh(MapUnits mUnit) {
    Vector3 pos = calculatePos(mUnit, wUnits.getAverageJoe());
    PersonJoe joe =
        new PersonJoe(wUnits.personJoeSize, personMaterials.averageJoe());
    joe.personObject3D.position.setFrom(pos);
    return joe.personObject3D;
  }

  //Todo fix this!!!
  Vector3 calculatePos(MapUnits mUnit, WorldUnitCube uCube) {
    double xPos = (wUnits.getWorldSizeWidth()) -
        (mUnit.x * (wUnits.unitGroup * wUnits.unit));
    double zPos = (wUnits.getWorldSizeDepth()) -
        (mUnit.z * (wUnits.unitGroup * wUnits.unit));
    double posXCenter = uCube.width / 2;
    double posZCenter = uCube.depth / 2;
    double posX = xPos - posXCenter;
    double posZ = zPos - posZCenter;
    double yPos = mUnit.y;
    return new Vector3(posX, yPos, posZ);
  }
}
