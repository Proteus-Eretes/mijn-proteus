import materialType from "./materialType";
import material from "./material";
import quote from "./quote";
import study from "./study";
import group from "./group";
import member from "./member";

export const seed = async () => {
  try {
    await materialType();
    await material();
    await quote();
    await study();
    await group();
    await member();
  } catch (e) {
    console.error("Seeding failed!");
    console.error(e);
  }
};
