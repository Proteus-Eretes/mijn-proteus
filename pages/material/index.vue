<template>
  <Breadcrumbs :crumbs="breadCrumbs.value" />
</template>

<script lang="ts" setup>
const { breadCrumbs } = useBreadcrumbs();
</script>
