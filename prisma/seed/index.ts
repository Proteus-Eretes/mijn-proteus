import materialType from "./materialType";
import quote from "./quote";

(async () => {
  console.info("--=== Start Seeding ===--");

  console.info("-- Seeding Material types --");
  await materialType();

  console.info("-- Seeding Quotes --");
  await quote();

  console.info("--=== Seeding Finished ===--");
})();
