import { study } from "../../logic";

export default async () => {
  await study.createOption({
    name: "Electrical Engineering",
    level: "BACHELOR_OF_SCIENCE",
    institution: "UNIVERSITY_OF_TECHNOLOGY_DELFT",
  });
  console.info("Study Created.");

  await study.createOption({
    name: "Computer Science & Engineering",
    level: "BACHELOR_OF_SCIENCE",
    institution: "UNIVERSITY_OF_TECHNOLOGY_DELFT",
  });
  console.info("Study Created.");
};
