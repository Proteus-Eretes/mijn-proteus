import {
  array,
  assert,
  Describe,
  lazy,
  object,
  optional,
  size,
  string,
} from "superstruct";

import { materialType } from "../../logic";

import materialTypes from "./testdata/materialType.json" assert { type: "json" };

type MaterialType = {
  name: string;
  subTypes?: MaterialType[];
};

const MaterialTypeSeed: Describe<MaterialType> = object({
  name: size(string(), 2, 40),
  subTypes: lazy(() => optional(array(MaterialTypeSeed))),
});

const createType = async (type: MaterialType, superId?: string) => {
  const created = await materialType.create(type.name, superId);
  console.info(`Created material type: ${created.name}.`);

  for (const subType of type.subTypes || []) {
    await createType(subType, created.id);
  }
};

export default async () => {
  assert(materialTypes, array(MaterialTypeSeed));

  for (const type of materialTypes) {
    await createType(type);
  }
};
