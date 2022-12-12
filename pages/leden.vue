<template>
  <TwoColumn title="Leden">
    <template #content>
      <SideMenu :items="items" />
    </template>
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
const notification = undefined; // Als je hier een nummer invult, dan krijg je een notificatie met dat nummer

const items = [
  { title: "Zoeken", to: "/leden/zoeken" },
  { title: "Mijn Profiel", to: "/leden/mijn-profiel" },
  { title: "Administratie" },
  { title: "Persoon toevoegen", to: "/leden/admin/toevoegen" },
  { title: "Lidmaatschap toevoegen", to: "/leden/admin/lidmaatschappen" },
  {
    title: "Uitschrijvingen",
    to: "/leden/admin/uitschrijvingen",
    badge: notification,
  },
  { title: "Tools", to: "/leden/admin/tools" },
];
</script>
