<template>
  <TwoColumn title="Leden">
    <template #content>
      <SideMenu :items="menuItems" />
    </template>
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
import { MenuItem } from "~~/components/SideMenu.vue";

const { data } = useSession();
const route = useRoute();

const menuItems = computed<MenuItem[]>(() => {
  let items = standard.value;
  if (route.params.id) items = [...items, ...selected.value];
  // if (data.value?.user?.isAdmin) items = [...items, ...admin.value];
  return items;
});

const standard = computed<MenuItem[]>(() => [
  {
    icon: "ic:search",
    title: "Zoeken",
    to: "/leden/zoeken",
  },
  {
    icon: "ic:baseline-account-circle",
    title: "Mijn Profiel",
    to: `/leden/${data.value?.user?.proteusId}/profiel`,
  },
]);

const selected = computed<MenuItem[]>(() => [
  {
    title: "Lid",
  },
  {
    icon: "ic:baseline-account-circle",
    title: "Profiel",
    to: `/leden/${route.params.id}/profiel`,
  },
  {
    icon: "ic:group",
    title: "Lidmaatschappen",
    to: `/leden/${route.params.id}/groepen`,
  },
  {
    icon: "ic:baseline-menu-book",
    title: "Studies",
    to: `/leden/${route.params.id}/studies`,
  },
  {
    icon: "ic:baseline-phone",
    title: "Contact opties",
    to: `/leden/${route.params.id}/contact`,
  },
  {
    icon: "ic:baseline-assignment-ind",
    title: "Gegevens",
    to: `/leden/${route.params.id}/gegevens`,
  },
  {
    icon: "ic:settings",
    title: "Instellingen",
    to: `/leden/${route.params.id}/instellingen`,
  },
]);

const admin = computed<MenuItem[]>(() => [
  {
    title: "Tools",
  },
  {
    icon: "ic:baseline-person-add-alt-1",
    title: "Toevoegen",
    to: "/leden/toevoegen",
  },
  {
    icon: "ic:baseline-mail-outline",
    title: "Uitnodigen",
    to: "/leden/uitnodigen",
  },
  {
    icon: "ic:baseline-download",
    title: "Exporteren",
    to: "/leden/exporteren",
  },
]);
</script>
