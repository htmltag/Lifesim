//Author: Jonathan Søyland-Lier
//Put togheter the materials for a person.

part of lifesim;

class PersonMaterial {
  PersonMaterial();

  static num torsoColor = 0x66AEFF;
  static num headColor = 0xFFE5BB;
  static num leftArmColor = 0x66AEFF;
  static num rightArmColor = 0x66AEFF;
  static num leftLegColor = 0xD8D7FF;
  static num rightLegColor = 0xD8D7FF;

  PersonMaterialParts averageJoe() {
    THREE.Material torso = new THREE.MeshPhongMaterial(color: torsoColor);
    THREE.Material head = new THREE.MeshPhongMaterial(color: headColor);
    THREE.Material lArm = new THREE.MeshPhongMaterial(color: leftArmColor);
    THREE.Material rArm = new THREE.MeshPhongMaterial(color: rightArmColor);
    THREE.Material lLeg = new THREE.MeshPhongMaterial(color: leftLegColor);
    THREE.Material rLeg = new THREE.MeshPhongMaterial(color: rightLegColor);
    PersonMaterialParts materials =
        new PersonMaterialParts(torso, head, lArm, rArm, lLeg, rLeg);
    return materials;
  }
}
