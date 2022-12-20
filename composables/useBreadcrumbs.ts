import { Group, Member } from "~/server/types";

export const useBreadcrumbs = () => {
  const route = computed(() => useRoute().path.slice(1).split("/"));

  const breadCrumbs = computed(() => {
    const crumbs = [];
    let link = "";

    for (const crumb of route.value) {
      crumbs.push({
        name: formatCrumb(crumb),
        link: (link = link + "/" + crumb),
      });
    }
    return crumbs;
  });

  const groupCrumbs = (group: Group) =>
    computed(() => {
      const crumbs = [];
      let link = "";

      for (const crumb of route.value) {
        link = link + "/" + crumb;
        const name = crumb === group.id ? group.name : formatCrumb(crumb);
        crumbs.push({ name, link });
      }
      return crumbs;
    });

  const memberCrumbs = (member: Member) =>
    computed(() => {
      const crumbs = [];
      let link = "";

      for (const crumb of route.value) {
        link = link + "/" + crumb;
        const name =
          crumb === member.id
            ? `${member.firstName} ${member.insertion} ${member.lastName}`
            : formatCrumb(crumb);
        crumbs.push({ name, link });
      }
      return crumbs;
    });

  return {
    breadCrumbs,
    memberCrumbs,
    groupCrumbs,
  };
};

const formatCrumb = (crumb: string) => {
  let parts = crumb.split("-");
  parts = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
  return parts.join(" ");
};
