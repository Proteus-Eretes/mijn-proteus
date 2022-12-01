import { quote } from "~/server/logic";

export default async () => {
  await quote.create({
    content: "You're an alcoholic, right?",
    by: "Someone",
  });

  await quote.create({
    content: "You can't beun twice in one day.",
    by: "Someone else",
  });
};
