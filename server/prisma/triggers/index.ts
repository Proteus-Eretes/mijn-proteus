import { prisma } from "..";

import { constraints } from "./constraints";
import { extensions } from "./extensions";
import { functions } from "./functions";
import { sync } from "./sync";

export const addTriggers = async () => {
  return await prisma.$transaction([
    ...extensions(),
    ...functions(),
    ...constraints(),
    ...sync(),
  ]);
};
