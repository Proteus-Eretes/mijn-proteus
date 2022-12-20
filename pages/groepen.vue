<template>
  <TwoColumn title="Groepen" :items="menuItems">
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
import { MenuItem } from "~/components/TwoColumn.vue";

const numberOfUitschrijvingen = undefined;
const route = useRoute();

const menuItems = computed(() => {
  return [...standard, ...(route.params.id ? selected.value : [])];
});

const standard: MenuItem[] = [
  { icon: "ic:search", title: "Zoeken", to: "/groepen" },
  { icon: "ic:group", title: "Mijn Groepen", to: "/groepen/mijn-groepen" },
  { icon: "ic:add", title: "Groep Maken", to: "/groepen/nieuw" },
];

const selected = computed<MenuItem[]>(() => [
  {
    title: "Groep",
  },
  {
    icon: "ic:baseline-groups",
    title: "Overzicht",
    to: `/groepen/${route.params.id}`,
  },
  {
    icon: "ic:baseline-person-add-alt-1",
    title: "Lid toevoegen",
    to: `/groepen/${route.params.id}/toevoegen`,
  },
  {
    icon: "ic:baseline-person-remove",
    title: "Uitschrijvingen",
    to: `/groepen/${route.params.id}/uitschrijvingen`,
    badge: numberOfUitschrijvingen,
  },
  {
    icon: "ic:baseline-manage-accounts",
    title: "Leden Beheren",
    to: `/groepen/${route.params.id}/leden`,
  },
  {
    icon: "ic:baseline-settings",
    title: "Instellingen",
    to: `/groepen/${route.params.id}/instellingen`,
  },
]);
</script>
