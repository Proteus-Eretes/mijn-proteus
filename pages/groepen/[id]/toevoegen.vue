<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ group.name }}
    <Icon name="ic:chevron-right" />
    Lid toevoegen
  </h1>
  <div class="overflow-x-auto shadow">form hiero</div>
</template>

<script setup lang="ts">
import { Group } from ".prisma/client";

defineProps<{
  group: Group & { children: Group[] };
}>();
</script>
