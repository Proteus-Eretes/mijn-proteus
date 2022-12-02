import materialType from "./materialType";
import material from "./material";
import quote from "./quote";
import study from "./study";
import group from "./group";
import member from "./member";

export const seed = async () => {
  await materialType();
  await material();
  await quote();
  await study();
  await group();
  await member();
};
