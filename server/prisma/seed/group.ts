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

import { group } from "~/server/logic";
import { GroupCreate } from "~/server/validation";

import { groupsJson } from "./testdata";

export default async () => {
  assert(groupsJson, array(unknown()));

  for (const g of groupsJson) {
    const group = create(g, GroupCreateChildren);

    await makeGroup(group);
  }
};

const makeGroup = async (g: GroupCreateChildren, parentId?: string) => {
  const { children, ...groupData } = g;

  const newGroup = await group.create({
    ...groupData,
    parentId: parentId || null,
  });

  for (const c of children) {
    const child = create(c, GroupCreateChildren);

    await makeGroup(child, newGroup.id);
  }
};

/**
 * Validator which allows children keys, assigned as unknown.
 * This will be validated in the recursive call.
 * It's not possible to validate the entire thing, as typescript does not allow for recursive types.
 */
const GroupCreateChildren = defaulted(
  assign(GroupCreate, object({ children: array(unknown()) })),
  {
    description: "",
    stopDate: null,
    permissions: [],
    parentId: null,
    children: [],
  },
);
// eslint-disable-next-line no-redeclare
export type GroupCreateChildren = Infer<typeof GroupCreateChildren>;
