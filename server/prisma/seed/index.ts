import group from "./group";
import material from "./material";
import materialType from "./materialType";
import member from "./member";
import study from "./study";

export const seed = async () => {
  try {
    await materialType();
    await material();
    await group();
    await study();
    await member();
  } catch (e) {
    console.error("Seeding failed!");
    console.error(e);
  }
};
