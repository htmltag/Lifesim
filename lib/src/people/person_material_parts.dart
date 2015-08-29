//Author: Jonathan Søyland-Lier
//Class for holding all the materials for a person.

part of lifesim;

class PersonMaterialParts {
  THREE.Material torsoMaterial;
  THREE.Material headMaterial;
  THREE.Material leftArmMaterial;
  THREE.Material rightArmMaterial;
  THREE.Material leftLegMaterial;
  THREE.Material rightLegMaterial;

  PersonMaterialParts(this.torsoMaterial, this.headMaterial,
      this.leftArmMaterial, this.rightArmMaterial, this.leftLegMaterial,
      this.rightLegMaterial);
}
