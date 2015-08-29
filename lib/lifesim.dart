//Author: Jonathan Søyland-Lier
//The LifeSim library.

library lifesim;

//Import libraries.
import 'dart:html';
import 'package:three/three.dart' as THREE;
import 'package:vector_math/vector_math.dart';

//Parts for creating a world.
part 'src/core/world.dart';
part 'src/core/world_unit_sizes.dart';
part 'src/core/world_unit_cube.dart';
part 'src/core/plane.dart';
part 'src/core/world_materials.dart';

//Parts for creating buildings.
part 'src/buildings/building.dart';
part 'src/buildings/house.dart';

//Parts for roads
part 'src/roads/road.dart';
part 'src/roads/asphalt.dart';

//Map
part 'src/map/map_units.dart';
part 'src/map/map_parts.dart';
part 'src/map/map_list.dart';
part 'src/map/map_generator.dart';

//Plants
part 'src/plants/three.dart';
part 'src/plants/oak.dart';
part 'src/plants/grass.dart';

//People
part 'src/people/person.dart';
part 'src/people/person_joe.dart';
part 'src/people/person_material_parts.dart';
part 'src/people/person_material.dart';
