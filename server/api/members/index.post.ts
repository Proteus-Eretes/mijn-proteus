import { defineEventHandler } from "h3";
import { NameTitle, Sex } from "@prisma/client";
import { date, enums, object, size, string } from "superstruct";
import { member } from "~/server/logic";
import { readValidatedBody } from "~/server/utils";

const body = object({
  title: enums(Object.values(NameTitle)),
  initials: size(string(), 1, 10),
  firstName: size(string(), 1, 40),
  insertion: size(string(), 1, 10),
  lastName: size(string(), 1, 40),
  dateOfBirth: date(),
  sex: enums(Object.values(Sex)),
  address: object({
    street: size(string(), 1, 40),
    number: size(string(), 1, 40),
    city: size(string(), 1, 40),
    zipcode: size(string(), 1, 20),
    country: size(string(), 1, 40),
  }),
});

export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, body);
  const { address, ...memberData } = data;
  return await member.create({
    ...memberData,
    address: {
      create: address,
    },
  });
});
