import { contact } from "./contact";
import { group } from "./group";
import { material } from "./material";
import { member } from "./member";
import { membership } from "./membership";
import { memberStudy } from "./memberStudy";

export const constraints = [
  ...contact,
  ...group,
  ...memberStudy,
  ...membership,
  ...member,
  ...material,
];
