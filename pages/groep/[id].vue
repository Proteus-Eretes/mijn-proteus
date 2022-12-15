<template>
  <TwoColumn :title="group.name">
    <template #content>
      <SideMenu :items="items" />
    </template>
    <NuxtPage :group="group" />
  </TwoColumn>
</template>

<script lang="ts" setup>
const numberOfUitschrijvingen = undefined;
const route = useRoute();

const { data: group } = await useFetch<
  Awaited<
    ReturnType<typeof import("~/server/api/groups/[id]/index.get").default>
  >
>("/api/groups/" + route.params.id);

const items = [
  {
    icon: "ic:outline-info",
    title: "Overzicht",
    to: `/groep/${route.params.id}/overzicht`,
  },
  {
    icon: "ic:baseline-person-add-alt-1",
    title: "Lid toevoegen",
    to: `/groep/${route.params.id}/toevoegen`,
  },
  {
    icon: "ic:baseline-person-remove",
    title: "Uitschrijvingen",
    to: `/groep/${route.params.id}/uitschrijvingen`,
    badge: numberOfUitschrijvingen,
  },
  {
    icon: "ic:baseline-manage-accounts",
    title: "Leden Beheren",
    to: `/groep/${route.params.id}/leden`,
  },
  {
    icon: "ic:baseline-settings",
    title: "Groep Instellingen",
    to: `/groep/${route.params.id}/instellingen`,
  },
  {
    title: "Groepen",
  },
  {
    icon: "ic:search",
    title: "Zoeken",
    to: "/groepen/zoeken",
  },
  {
    icon: "ic:group",
    title: "Mijn Groepen",
    to: "/groepen/mijn-groepen",
  },
  {
    icon: "ic:add",
    title: "Groep Maken",
    to: "/groepen/nieuw",
  },
];
</script>
