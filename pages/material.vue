<template>
  <TwoColumn title="Materiaal" :items="items">
    <NuxtPage />
  </TwoColumn>
</template>

<script lang="ts" setup>
const items = [
  {
    title: "Materiaal Home",
    link: "/material",
  },
  {
    title: "Materiaaltypes",
    link: "/material/types",
  },
];
</script>
