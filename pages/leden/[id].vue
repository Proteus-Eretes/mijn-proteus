<template>
  <NuxtPage :member="member" />
</template>

<script lang="ts" setup>
const { data: member } = await useFetch<
  Awaited<
    ReturnType<typeof import("~/server/api/members/[id]/index.get").default>
  >
>("/api/members/" + useRoute().params.id);
</script>
