<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
    <Icon name="ic:chevron-right" />
    Groepen Beheren
  </h1>
  <div class="overflow-x-auto shadow">Groepbeheersysteem hiero</div>
</template>

<script setup lang="ts">
defineProps<{
  member: unknown;
}>();
</script>
