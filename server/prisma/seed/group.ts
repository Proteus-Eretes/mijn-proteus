import {
  array,
  assign,
  create,
  defaulted,
  Infer,
  object,
  unknown,
} from "superstruct";

import { GroupCreate } from "~/server/validation";
import { prisma } from "~/server/prisma";

import groupsJson from "./testdata/group.json" assert { type: "json" };

const makeGroup = async (group: GroupCreateChildren, parentId?: string) => {
  const newGroup = await prisma.group.create({
    data: {
      ...group,
      parentId,
      children: undefined,
    },
  });

  const children = create(group.children, array(GroupCreateChildren));
  for (const c of children) {
    await makeGroup(c, newGroup.id);
  }
};

export default async () => {
  const groups = create(groupsJson, array(GroupCreateChildren));

  for (const group of groups) {
    await makeGroup(group);
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
