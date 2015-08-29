//Author: Jonathan Søyland-Lier
//Defines this worlds unitsizes.

part of lifesim;

class WorldUnitSizes {
  double unit;
  double unitGroup;
  double worldSize;
  double _smallHouse;
  double _normalHouse;
  double _bigHouse;
  double _normalRoad;
  double _norlmalOakThree;
  double _normalGrass;
  double personJoeSize;

  WorldUnitSizes({double this.unit: 5.0, double this.unitGroup: 10.0,
      double this.worldSize: 200.0}) {
    this._smallHouse = this.unitGroup;
    this._normalHouse = this.unitGroup * 1.5;
    this._bigHouse = this.unitGroup * 2;
    this._normalRoad = this.unitGroup * 2;
    this._norlmalOakThree = this.unit;
    this._normalGrass = this.unitGroup;
    this.personJoeSize = 2.0;
  }

  double getWorldSizeWidth() => unit * worldSize;
  double getWorldSizeHeight() => 0.0;
  double getWorldSizeDepth() => unit * worldSize;

  WorldUnitCube getSmallHouse() => new WorldUnitCube(
      width: this.unit * this._smallHouse,
      height: this.unit * this._smallHouse,
      depth: this.unit * (this._smallHouse));

  WorldUnitCube getNormalHouse() => new WorldUnitCube(
      width: this.unit * this._normalHouse,
      height: this.unit * this._normalHouse,
      depth: this.unit * (this._normalHouse));

  WorldUnitCube getBigHouse() => new WorldUnitCube(
      width: this.unit * this._bigHouse,
      height: this.unit * this._bigHouse,
      depth: this.unit * (this._bigHouse));

  WorldUnitCube getNormalRoad() => new WorldUnitCube(
      width: this.unit * this._normalRoad,
      height: this.unit,
      depth: this.unit * this._normalRoad);

  WorldUnitCube getNormalOakThree() => new WorldUnitCube(
      width: this.unit * this._norlmalOakThree,
      height: this.unit * this._norlmalOakThree,
      depth: this.unit * this._norlmalOakThree);

  WorldUnitCube getNormalGrass() => new WorldUnitCube(
      width: this.unit * this._normalGrass,
      height: this.unit,
      depth: this.unit * this._normalGrass);

  WorldUnitCube getAverageJoe() => new WorldUnitCube(
      width: this.personJoeSize,
      height: this.personJoeSize,
      depth: this.personJoeSize);
}
