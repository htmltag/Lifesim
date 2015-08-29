//Author: Jonathan Søyland-Lier
//List of units for the map.

part of lifesim;

class MapList {
  List<MapUnits> maplist;

  MapList() {
    maplist = new List<MapUnits>();
  }

  List<MapUnits> generateMap() {
    //add road
    maplist.add(new MapUnits(3.0, 0.05, 0.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 1.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 2.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 3.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 4.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 5.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 7.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 8.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 9.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 10.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 11.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 12.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 14.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 15.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 16.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 17.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(3.0, 0.05, 18.0, MapParts.asphaltRoad));

    maplist.add(new MapUnits(4.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(5.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(6.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(7.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(8.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(9.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(10.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(11.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(12.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(13.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(14.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(15.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(16.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(17.0, 0.05, 6.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(18.0, 0.05, 6.0, MapParts.asphaltRoad));

    maplist.add(new MapUnits(4.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(5.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(6.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(7.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(8.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(9.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(10.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(11.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(12.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(13.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(14.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(15.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(16.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(17.0, 0.05, 13.0, MapParts.asphaltRoad));
    maplist.add(new MapUnits(18.0, 0.05, 13.0, MapParts.asphaltRoad));

    //Add house
    maplist.add(new MapUnits(6.0, 0.005, 8.0, MapParts.normalBuilding));
    maplist.add(new MapUnits(10.0, 0.005, 8.0, MapParts.normalBuilding));

    maplist.add(new MapUnits(12.0, 0.005, 8.0, MapParts.smallBuilding));

    maplist.add(new MapUnits(16.0, 0.005, 7.0, MapParts.bigBuilding));

    //Add oak three
    maplist.add(new MapUnits(0.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(1.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(2.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(5.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(6.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(7.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(8.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(9.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(10.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(11.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(12.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(13.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(14.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(15.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(16.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(17.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(18.0, 0.005, 5.0, MapParts.normalOakThree));
    maplist.add(new MapUnits(19.0, 0.005, 5.0, MapParts.normalOakThree));

    //grass
    maplist.add(new MapUnits(0.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(1.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(2.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(5.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(6.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(7.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(8.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(9.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(10.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(11.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(12.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(13.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(14.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(15.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(16.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(17.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(18.0, 0.05, 0.0, MapParts.normalGrass));
    maplist.add(new MapUnits(19.0, 0.05, 0.0, MapParts.normalGrass));

    maplist.add(new MapUnits(0.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(1.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(2.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(5.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(6.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(7.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(8.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(9.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(10.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(11.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(12.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(13.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(14.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(15.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(16.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(17.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(18.0, 0.05, 1.0, MapParts.normalGrass));
    maplist.add(new MapUnits(19.0, 0.05, 1.0, MapParts.normalGrass));

    maplist.add(new MapUnits(0.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(1.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(2.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(5.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(6.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(7.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(8.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(9.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(10.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(11.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(12.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(13.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(14.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(15.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(16.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(17.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(18.0, 0.05, 2.0, MapParts.normalGrass));
    maplist.add(new MapUnits(19.0, 0.05, 2.0, MapParts.normalGrass));

    maplist.add(new MapUnits(0.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(1.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(2.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(5.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(6.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(7.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(8.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(9.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(10.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(11.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(12.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(13.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(14.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(15.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(16.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(17.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(18.0, 0.05, 3.0, MapParts.normalGrass));
    maplist.add(new MapUnits(19.0, 0.05, 3.0, MapParts.normalGrass));

    maplist.add(new MapUnits(0.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(1.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(2.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(5.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(6.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(7.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(8.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(9.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(10.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(11.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(12.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(13.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(14.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(15.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(16.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(17.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(18.0, 0.05, 4.0, MapParts.normalGrass));
    maplist.add(new MapUnits(19.0, 0.05, 4.0, MapParts.normalGrass));

    maplist.add(new MapUnits(0.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(1.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(2.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(5.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(6.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(7.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(8.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(9.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(10.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(11.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(12.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(13.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(14.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(15.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(16.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(17.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(18.0, 0.05, 5.0, MapParts.normalGrass));
    maplist.add(new MapUnits(19.0, 0.05, 5.0, MapParts.normalGrass));

    //Joe
    maplist.add(new MapUnits(15.0, 0.05, 15.0, MapParts.averageJoe));

    return maplist;
  }
}
