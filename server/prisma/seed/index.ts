import materialType from "./materialType";
import material from "./material";
import quote from "./quote";
import study from "./study";
import group from "./group";
import member from "./member";

(async () => {
  console.info("--=== Start Seeding ===--");

  console.info("-- Seeding Material types --");
  await materialType();

  console.info("-- Seeding Materials --");
  await material();

  console.info("-- Seeding Quotes --");
  await quote();

  console.info("-- Seeding Studies --");
  await study();

  console.info("-- Seeding Groups --");
  await group();

  console.info("-- Seeding Members --");
  await member();

  console.info("--=== Seeding Finished ===--");
})();
