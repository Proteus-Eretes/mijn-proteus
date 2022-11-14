import { array, assert, enums, object, string } from "superstruct";
import { NameTitle, Sex } from "@prisma/client";
import { member } from "../../logic";
import { dateString } from "../../validation";
import members from "./testdata/member.json" assert { type: "json" };

const MemberSeed = object({
  title: enums(Object.values(NameTitle)),
  initials: string(),
  firstName: string(),
  insertion: string(),
  lastName: string(),
  dateOfBirth: dateString(),
  sex: enums(Object.values(Sex)),
  address: object({
    street: string(),
    number: string(),
    city: string(),
    zipcode: string(),
    country: string(),
  }),
});

export default async () => {
  assert(members, array(MemberSeed));

  for (const m of members) {
    const { address, dateOfBirth, ...memberData } = m;
    const newMember = await member.create({
      ...memberData,
      dateOfBirth: new Date(dateOfBirth),
      address: { create: address },
    });
    console.info(
      `Created member: ${newMember.firstName} ${newMember.lastName}`,
    );
  }
};
