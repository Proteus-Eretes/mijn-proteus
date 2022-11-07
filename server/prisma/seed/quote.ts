import { quote } from "../../logic";

export default async () => {
  await quote.create({
    content: "You're an alcoholic, right?",
    by: "Someone",
  });
  console.info("Quote Created.");

  await quote.create({
    content: "You can't beun twice in one day.",
    by: "Someone else",
  });
  console.info("Quote Created.");
};
