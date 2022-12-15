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
    to: "/leden/" + data.value?.user?.proteusId,
  },
];
</script>
