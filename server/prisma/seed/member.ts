import { array, create } from "superstruct";

import { member } from "~/server/logic";
import { MemberCreateValidator } from "~/server/validation";

import membersJson from "./testdata/member.json" assert { type: "json" };

export default async () => {
  const members = create(membersJson, array(MemberCreateValidator));

  for (const m of members) {
    await member.create(m);
  }
};
