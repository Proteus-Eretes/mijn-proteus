import { array, create, object, optional, size, string } from "superstruct";

import materialsJson from "./testdata/material.json" assert { type: "json" };

import { material, materialType } from "~/server/logic";

const MaterialSeed = object({
  name: size(string(), 2, 40),
  typeName: size(string(), 2, 40),
  comment: optional(size(string(), 1, 200)),
});

export default async () => {
  const materials = create(materialsJson, array(MaterialSeed));

  for (const mat of materials) {
    const type = await materialType.findByName(mat.typeName);

    if (!type) {
      throw new Error(`Cannot find material type ${mat.typeName}.`);
    }

    await material.create(mat.name, type.id, mat.comment);
  }
};
