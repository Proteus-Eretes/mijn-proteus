<template>
  <TwoColumn title="Groepen">
    <template #content>
      <SideMenu :items="items" />
    </template>
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
const items = [
  { title: "Zoeken", to: "/groepen/zoeken" },
  { title: "Mijn Groepen", to: "/groepen/mijn-groepen" },
  { title: "Groep Maken", to: "/groepen/admin/aanmaken" },
];
</script>
