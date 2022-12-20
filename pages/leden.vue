<template>
  <TwoColumn title="Leden" :items="menuItems">
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
const route = useRoute();

const menuItems = computed(() => [
  ...standard.value,
  ...(route.params.id ? selected.value : []),
  ...admin.value, // TODO: Add admin check
]);

const standard = computed(() => [
  {
    icon: "ic:search",
    title: "Zoeken",
    to: "/leden",
  },
  {
    icon: "ic:baseline-account-circle",
    title: "Mijn Profiel",
    to: `/leden`, // TODO: Route to logged in member
  },
]);

const selected = computed(() => [
  {
    title: "Lid",
  },
  {
    icon: "ic:baseline-account-circle",
    title: "Profiel",
    to: `/leden/${route.params.id}`,
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

const admin = computed(() => [
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
