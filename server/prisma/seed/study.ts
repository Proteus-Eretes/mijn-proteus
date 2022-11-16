import { Institution, StudyLevel } from "@prisma/client";
import { study } from "../../logic";

export default async () => {
  await study.createOption({
    name: "Electrical Engineering",
    level: StudyLevel.BACHELOR_OF_SCIENCE,
    institution: Institution.UNIVERSITY_OF_TECHNOLOGY_DELFT,
  });
  console.info("Study Created.");

  await study.createOption({
    name: "Computer Science & Engineering",
    level: StudyLevel.BACHELOR_OF_SCIENCE,
    institution: Institution.UNIVERSITY_OF_TECHNOLOGY_DELFT,
  });
  console.info("Study Created.");
};
