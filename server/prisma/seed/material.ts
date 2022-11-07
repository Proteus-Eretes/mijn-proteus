import { array, assert, object, optional, size, string } from "superstruct";

import { material, materialType } from "../../logic";

import materials from "./testdata/material.json" assert { type: "json" };

const MaterialSeed = object({
  name: size(string(), 2, 40),
  typeName: size(string(), 2, 40),
  comment: optional(size(string(), 1, 200)),
});

export default async () => {
  assert(materials, array(MaterialSeed));

  for (const mat of materials) {
    const type = await materialType.findByName(mat.typeName);

    if (!type) {
      throw new Error(`Cannot find material type ${mat.typeName}.`);
    }

    await material.create(mat.name, type.id, mat.comment);
    console.info(`Created material: ${mat.name}.`);
  }
};
