<template>
  <TwoColumn title="Leden">
    <template #content>
      <SideMenu :items="items" />
    </template>
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
const { data } = useSession();

const items = [
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
  {
    title: "Administratie",
  },
  {
    icon: "ic:baseline-person-add-alt-1",
    title: "Persoon toevoegen",
    to: "/leden/toevoegen",
  },
  {
    icon: "ic:baseline-person-remove",
    title: "Persoon verwijderen",
    to: "/leden/verwijderen",
  },
  {
    icon: "ic:baseline-mail-outline",
    title: "Persoon uitnodigen",
    to: "/leden/uitnodigen",
  },
];
</script>
