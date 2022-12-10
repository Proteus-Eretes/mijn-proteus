import {
  array,
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
  const groups = create(groupsJson, array(GroupCreateChildren));

  for (const group of groups) {
    await makeGroup(group);
  }
};

const makeGroup = async (g: GroupCreateChildren, parentId?: string) => {
  const { children, ...groupData } = g;

  const newGroup = await group.create({
    ...groupData,
    parentId: parentId || null,
  });

  for (const c of create(children, array(GroupCreateChildren))) {
    await makeGroup(c, newGroup.id);
  }
};

/**
 * Validator which allows children keys, assigned as unknown.
 * This will be validated in the recursive call.
 * It's not possible to validate the entire thing, as typescript does not allow for recursive types.
 */
const GroupCreateChildren = assign(
  GroupCreate,
  object({ children: defaulted(array(unknown()), []) }),
);
// eslint-disable-next-line no-redeclare
export type GroupCreateChildren = Infer<typeof GroupCreateChildren>;
