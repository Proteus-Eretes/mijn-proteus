<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ group.name }}
    <Icon name="ic:chevron-right" />
    Uitschrijvingen
  </h1>
  <div class="overflow-x-auto shadow">uitschrijvingen hiero</div>
</template>

<script setup lang="ts">
import { Group } from ".prisma/client";

defineProps<{
  group: Group & { children: Group[] };
}>();
</script>
