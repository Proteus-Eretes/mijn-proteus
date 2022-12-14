import { array, create } from "superstruct";

import { member } from "~/server/logic";
import { MemberCreate } from "~/server/validation";

import { membersJson } from "./testdata";

export default async () => {
  const members = create(membersJson, array(MemberCreate));

  for (const m of members) {
    await member.create(m);
  }
};
