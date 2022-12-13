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
  { icon: "ic:search", title: "Zoeken", to: "/groepen/zoeken" },
  { icon: "ic:group", title: "Mijn Groepen", to: "/groepen/mijn-groepen" },
  { icon: "ic:add", title: "Groep Maken", to: "/groepen/nieuw" },
];
</script>
