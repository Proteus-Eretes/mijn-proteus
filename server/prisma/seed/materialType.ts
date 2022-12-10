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

import materialTypes from "./testdata/materialType.json" assert { type: "json" };

import { materialType } from "~/server/logic";

type MaterialType = {
  name: string;
  children?: MaterialType[];
};

const MaterialTypeSeed: Describe<MaterialType> = object({
  name: size(string(), 2, 40),
  children: lazy(() => optional(array(MaterialTypeSeed))),
});

const createType = async (type: MaterialType, parentId?: string) => {
  const created = await materialType.create(type.name, parentId);

  for (const child of type.children || []) {
    await createType(child, created.id);
  }
};

export default async () => {
  assert(materialTypes, array(MaterialTypeSeed));

  for (const type of materialTypes) {
    await createType(type);
  }
};
