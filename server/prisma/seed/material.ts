import {
  array,
  assert,
  assign,
  create,
  defaulted,
  Infer,
  object,
  unknown,
} from "superstruct";

import {
  MaterialImplicitCreate,
  MaterialTypeCreate,
} from "~~/server/validation";
import { material } from "~/server/logic";

import { materialsJson } from "./testdata";

export default async () => {
  assert(materialsJson, array(unknown()));

  for (const mt of materialsJson) {
    const materialType = create(mt, MaterialTypeCreateChildren);

    await makeMaterialType(materialType);
  }
};

const makeMaterialType = async (
  materialType: MaterialTypeCreateChildren,
  parentId?: string,
) => {
  const newMaterialType = await material.type.create({
    name: materialType.name,
    parentId: parentId || null,
  });

  for (const mat of materialType.materials) {
    material.create({ ...mat, typeId: newMaterialType.id });
  }

  for (const c of materialType.children) {
    const child = create(c, MaterialTypeCreateChildren);

    await makeMaterialType(child, newMaterialType.id);
  }
};

/**
 * Materialtype validator with children and materials.
 */
const MaterialTypeCreateChildren = defaulted(
  assign(
    MaterialTypeCreate,
    object({
      children: array(unknown()),
      materials: array(MaterialImplicitCreate),
    }),
  ),
  {
    parentId: null,
    children: [],
    materials: [],
  },
);
// eslint-disable-next-line no-redeclare
export type MaterialTypeCreateChildren = Infer<
  typeof MaterialTypeCreateChildren
>;
