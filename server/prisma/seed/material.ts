import {
  array,
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
  const materialTypes = create(
    materialsJson,
    array(MaterialTypeCreateChildren),
  );

  for (const materialType of materialTypes) {
    await makeMaterialType(materialType);
  }
};

const makeMaterialType = async (
  materialType: MaterialTypeCreateChildren,
  parentId?: string,
) => {
  const newMaterialType = await material.type.create({
    name: materialType.name,
    parentId,
  });

  for (const mat of materialType.materials) {
    material.create({ ...mat, typeId: newMaterialType.id });
  }

  const children = create(
    materialType.children,
    array(MaterialTypeCreateChildren),
  );

  for (const c of children) {
    await makeMaterialType(c, newMaterialType.id);
  }
};

/**
 * Materialtype validator with children and materials.
 */
const MaterialTypeCreateChildren = assign(
  MaterialTypeCreate,
  object({
    children: defaulted(array(unknown()), []),
    materials: defaulted(array(MaterialImplicitCreate), []),
  }),
);
// eslint-disable-next-line no-redeclare
export type MaterialTypeCreateChildren = Infer<
  typeof MaterialTypeCreateChildren
>;
