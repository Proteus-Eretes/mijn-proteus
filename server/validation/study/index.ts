import {
  Describe,
  enums,
  Infer,
  object,
  omit,
  partial,
  size,
  string,
} from "superstruct";
import { Institution, Study as PrismaStudy, StudyLevel } from "@prisma/client";

import { uuid } from "../utils";

export * from "./member";

/**
 * Complete study validator.
 * This has all fields, but is probably not useful on it's own.
 */
const Study: Describe<PrismaStudy> = object({
  id: uuid(),
  name: size(string(), 2, 40),
  level: enums(Object.values(StudyLevel)),
  institution: enums(Object.values(Institution)),
});

/**
 * Study creation struct.
 * It omits the ID of the member, requires valid contacts, and provides a default title.
 */
export const StudyCreate = omit(Study, ["id"]);
// eslint-disable-next-line no-redeclare
export type StudyCreate = Infer<typeof StudyCreate>;

/**
 * Study update validator.
 * Similar to study creation, but all fields are optional.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const StudyUpdate = partial(StudyCreate);
// eslint-disable-next-line no-redeclare
export type StudyUpdate = Infer<typeof StudyUpdate>;
