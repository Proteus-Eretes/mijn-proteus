import { Institution, StudyLevel } from "@prisma/client";

import { study } from "~/server/logic";

export default async () => {
  await study.create({
    name: "Electrical Engineering",
    level: StudyLevel.BACHELOR_OF_SCIENCE,
    institution: Institution.UNIVERSITY_OF_TECHNOLOGY_DELFT,
  });

  await study.create({
    name: "Computer Science & Engineering",
    level: StudyLevel.BACHELOR_OF_SCIENCE,
    institution: Institution.UNIVERSITY_OF_TECHNOLOGY_DELFT,
  });
};
