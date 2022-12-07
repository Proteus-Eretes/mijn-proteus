import { array, assert, enums, object, string } from "superstruct";
import { ContactType, NameTitle, Sex } from "@prisma/client";

import members from "./testdata/member.json" assert { type: "json" };

import { member } from "~/server/logic";
import { dateString } from "~/server/validation/utils";

const ContactSeed = object({
  type: enums(Object.values(ContactType)),
  value: string(),
});

const MemberSeed = object({
  title: enums(Object.values(NameTitle)),
  initials: string(),
  firstName: string(),
  insertion: string(),
  lastName: string(),
  dateOfBirth: dateString(),
  sex: enums(Object.values(Sex)),
  street: string(),
  number: string(),
  city: string(),
  zipcode: string(),
  country: string(),
  contacts: array(ContactSeed),
});

export default async () => {
  assert(members, array(MemberSeed));

  for (const m of members) {
    const { dateOfBirth, ...memberData } = m;
    await member.create({
      ...memberData,
      dateOfBirth: new Date(dateOfBirth),
    });
  }
};
