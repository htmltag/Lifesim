//Author: Jonathan Søyland-Lier
//Class that contains all the materials

part of lifesim;

class WorldMaterials {
  WorldMaterials();

  //Colors
  static num lightBlueColor = 0xCCD7FF;
  static num darkBlueColor = 0x124666;
  static num brownColor = 0x5E5D63;
  static num asphaltBlack = 0x666666;
  static num oakTrunkColor = 0x59341E;
  static num oakLeavesColor = 0x78B859;
  static num oakLeavesColor2 = 0x33A649;
  static num grassColor = 0x4E9F63;
  static num groundColor = 0xCCBAA9;
  static num brickColor = 0x9C665E;
  static num mortarColor = 0xCCBAA9;

  //Houses
  THREE.Material houseMaterial =
      new THREE.MeshBasicMaterial(color: darkBlueColor);

  THREE.Material houseShaderMaterial(double width, double depth) {
    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(darkBlueColor),
      "scale": new THREE.Uniform.float(1.5)
    };
    THREE.Material houseMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#bluenoisevertexshader').text,
        fragmentShader: querySelector('#bluenoisefragmentshader').text);
    return houseMaterial;
  }

  //Windows
  THREE.Material windowBlue() {
    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(lightBlueColor),
      "alpha": new THREE.Uniform.float(0.5)
    };
    THREE.Material windowMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#transparentvertexshader').text,
        fragmentShader: querySelector('#transparentfragmentshader').text);
    return windowMaterial;
  }
  //Doors
  THREE.Material doorBrown() {
    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(brownColor)
    };
    THREE.Material doorMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#vertexshader').text,
        fragmentShader: querySelector('#fragmentshader').text);
    return doorMaterial;
  }

  //Roads
  THREE.Material roadAsphaltBlack() {
    Map<String, THREE.Uniform> asphaltUniforms = {
      "color": new THREE.Uniform.color(asphaltBlack)
    };
    THREE.Material asphaltMaterial = new THREE.ShaderMaterial(
        uniforms: asphaltUniforms,
        vertexShader: querySelector('#vertexshader').text,
        fragmentShader: querySelector('#fragmentshader').text);
    return asphaltMaterial;
  }

  //Three
  THREE.Material oakTrunk() {
    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(oakTrunkColor),
      "scale": new THREE.Uniform.float(2.0)
    };
    THREE.Material oakTrunkMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#rednoisevertexshader').text,
        fragmentShader: querySelector('#rednoisefragmentshader').text);
    return oakTrunkMaterial;
  }

  THREE.Material oakLeaves() {
    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(oakLeavesColor),
      "scale": new THREE.Uniform.float(2.0)
    };
    THREE.Material oakLeavesMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#greennoisevertexshader').text,
        fragmentShader: querySelector('#greennoisefragmentshader').text);
    return oakLeavesMaterial;
  }

  THREE.Material grass() {
    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(grassColor),
      "scale": new THREE.Uniform.float(3.0)
    };
    THREE.Material grassMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#greennoisevertexshader').text,
        fragmentShader: querySelector('#greennoisefragmentshader').text);
    return grassMaterial;
  }

  THREE.Material ground() {
    /*Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(groundColor)
    };
    THREE.Material groundMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#vertexshader').text,
        fragmentShader: querySelector('#fragmentshader').text);*/

    Map<String, THREE.Uniform> uniforms = {
      "color": new THREE.Uniform.color(groundColor),
      "scale": new THREE.Uniform.float(1.0)
    };
    THREE.Material groundMaterial = new THREE.ShaderMaterial(
        uniforms: uniforms,
        vertexShader: querySelector('#rednoisevertexshader').text,
        fragmentShader: querySelector('#rednoisefragmentshader').text);

    return groundMaterial;
  }
}
