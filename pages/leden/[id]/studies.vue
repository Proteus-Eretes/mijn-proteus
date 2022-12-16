<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
    <Icon name="ic:chevron-right" />
    Studies Beheren
  </h1>
  <div class="overflow-x-auto shadow">Studiebeheersysteem hiero</div>
</template>

<script setup lang="ts">
defineProps<{
  member: unknown;
}>();
</script>
