import {
  array,
  assert,
  boolean,
  Describe,
  lazy,
  object,
  optional,
  size,
  string,
} from "superstruct";
import { Group } from "@prisma/client";
import { dateString } from "../../validation";
import { prisma } from "../../prisma/client";
import groups from "./testdata/group.json" assert { type: "json" };

type GroupTree = {
  name: string;
  description: string;
  startDate?: string;
  stopDate?: string;
  children?: GroupTree[];
};

const GroupSeed: Describe<GroupTree> = object({
  name: size(string(), 2, 50),
  description: size(string(), 2, 120),
  startDate: optional(dateString()),
  stopDate: optional(dateString()),
  children: lazy(() => optional(array(GroupSeed))),
});

const makeGroup = async (child: GroupTree, parent?: Group, level = 0) => {
  const newGroup = await prisma.group.create({
    data: {
      name: child.name,
      description: child.description,
      startDate: new Date(child.startDate ?? parent?.startDate ?? "2000-01-01"),
      stopDate: child.stopDate ? new Date(child.stopDate) : undefined,
      parentId: parent?.id,
    },
  });

  console.info(`${"...".repeat(level)}Created group: ${child.name}`);

  if (child.children?.length) {
    for (const c of child.children) {
      await makeGroup(c, newGroup, level + 1);
    }
  }
};

export default async () => {
  assert(groups, array(GroupSeed));

  for (const group of groups) {
    await makeGroup(group as unknown as GroupTree);
  }
};
