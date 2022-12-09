import { array, create } from "superstruct";

import membersJson from "./testdata/member.json" assert { type: "json" };

import { member } from "~/server/logic";
import { MemberCreateValidator } from "~/server/validation";

export default async () => {
  const members = create(membersJson, array(MemberCreateValidator));

  for (const m of members) {
    await member.create(m);
  }
};
