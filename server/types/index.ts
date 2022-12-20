export type Member = Awaited<
  ReturnType<typeof import("~/server/api/members/[id]/index.get").default>
>;
export type Members = Awaited<
  ReturnType<typeof import("~/server/api/members/index.get").default>
>;

export type Group = Awaited<
  ReturnType<typeof import("~/server/api/groups/[id]/index.get").default>
>;
export type Groups = Awaited<
  ReturnType<typeof import("~/server/api/groups/index.get").default>
>;

export type Studies = Awaited<
  ReturnType<typeof import("~/server/api/studies/options/index.get").default>
>;
