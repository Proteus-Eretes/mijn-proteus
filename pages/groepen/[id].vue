<template>
  <NuxtPage :group="group" />
</template>

<script lang="ts" setup>
const { data: group } = await useFetch<
  Awaited<
    ReturnType<typeof import("~/server/api/groups/[id]/index.get").default>
  >
>("/api/groups/" + useRoute().params.id);
</script>
