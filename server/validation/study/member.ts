import {
  defaulted,
  Describe,
  Infer,
  nullable,
  object,
  omit,
  partial,
  size,
  string,
} from "superstruct";
import { MemberStudy as PrismaMemberStudy } from "@prisma/client";

import { dateString, uuid } from "../utils";

/**
 * Complete study validator.
 * This has all fields, but is probably not useful on it's own.
 */
const StudyMember: Describe<PrismaMemberStudy> = object({
  id: uuid(),
  studentNumber: size(string(), 0, 40),
  startDate: dateString(),
  stopDate: nullable(dateString()),
  memberId: uuid(),
  studyId: uuid(),
});

/**
 * Study member creation struct.
 * It omits the ID of the member, requires valid contacts, and provides a default title.
 */
export const StudyMemberCreate = defaulted(omit(StudyMember, ["id"]), {
  studentNumber: "",
  stopDate: null,
});
// eslint-disable-next-line no-redeclare
export type StudyMemberCreate = Infer<typeof StudyMemberCreate>;

/**
 * Study member update validator.
 * Similar to study member creation, but all fields are optional.
 * If the fields are actually allowed to be editted is not defined here.
 */
export const StudyMemberUpdate = partial(StudyMemberCreate);
// eslint-disable-next-line no-redeclare
export type StudyMemberUpdate = Infer<typeof StudyMemberUpdate>;
