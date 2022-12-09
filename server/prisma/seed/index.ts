import group from "./group";
import material from "./material";
import materialType from "./materialType";
import member from "./member";
import quote from "./quote";
import study from "./study";

export const seed = async () => {
  try {
    await group();
    await material();
    await materialType();
    await member();
    await quote();
    await study();
  } catch (e) {
    console.error("Seeding failed!");
    console.error(e);
  }
};
