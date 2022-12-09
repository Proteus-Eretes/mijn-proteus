import materialType from "./materialType";
import material from "./material";
import study from "./study";
import group from "./group";
import member from "./member";

export const seed = async () => {
  await materialType();
  await material();
  await study();
  await group();
  await member();
};
