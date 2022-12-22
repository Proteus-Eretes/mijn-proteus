<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
  <div class="overflow-x-auto shadow">
    Stuur een persoonlijke link naar een email adres zodat de persoon zijn/haar
    gegevens kan invullen (handig voor OPE)
  </div>
</template>

<script setup lang="ts">
const { breadCrumbs } = useBreadcrumbs();
</script>
