<template>
  <Breadcrumbs :crumbs="breadCrumbs" />
</template>

<script lang="ts" setup>
const { breadCrumbs } = useBreadcrumbs();
</script>
