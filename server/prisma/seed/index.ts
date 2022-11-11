import materialType from "./materialType";
import material from "./material";
import quote from "./quote";
import group from "./group";
import study from "./study";

(async () => {
  console.info("--=== Start Seeding ===--");

  console.info("-- Seeding Material types --");
  await materialType();

  console.info("-- Seeding Materials --");
  await material();

  console.info("-- Seeding Quotes --");
  await quote();

  console.info("-- Seeding Groups --");
  await group();

  console.info("-- Seeding Studies --");
  await study();

  console.info("--=== Seeding Finished ===--");
})();
