import {
  array,
  assert,
  date,
  Describe,
  lazy,
  object,
  optional,
  size,
  string,
} from "superstruct";

import { Group, Prisma } from "@prisma/client";
import groups from "./testdata/group.json" assert { type: "json" };
import { group } from "~/server/logic";

import { uuid } from "~/server/validation";

type GroupTree = {
  name: string;
  description: string;
  startDate?: Date;
  stopDate?: Date;
  children?: GroupTree[];
  parentId?: string;
};

const GroupSeed: Describe<GroupTree> = object({
  name: size(string(), 2, 50),
  description: size(string(), 2, 120),
  startDate: optional(date()),
  stopDate: optional(date()),
  children: lazy(() => optional(array(GroupSeed))),
  parentId: optional(uuid()),
});

const createGroup = async (
  child: GroupTree,
  parent?: Group,
): Promise<Group | null> => {
  assert(child, GroupSeed);

  if (!child.startDate) {
    child.startDate = parent?.startDate ?? new Date("2000-01-01");
  }
  if (parent) child.parentId = parent.id;

  const newGroup = await group.create(child as Prisma.GroupCreateInput);
  console.info(`Created group: ${newGroup.name}.`);

  if (child.children) {
    for (const c of child.children) {
      await createGroup(c, newGroup);
    }
  }

  return newGroup;
};

export default async () => {
  assert(groups, array(GroupSeed));

  for (const data of groups) {
    const newGroup = await createGroup(data);
    if (!newGroup) console.error(`Failed to create group with input: ${data}`);
    else console.info(`Created group: ${newGroup.name}.`);
  }
};
