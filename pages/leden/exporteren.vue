<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
  <div class="overflow-x-auto shadow">Export tool hiero</div>
</template>

<script setup lang="ts">
const { breadCrumbs } = useBreadcrumbs();
</script>
