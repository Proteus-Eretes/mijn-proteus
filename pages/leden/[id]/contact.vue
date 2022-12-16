<template>
  <h1 class="text-4xl text-primary font-bold mb-4">
    {{ member.firstName }} {{ member.insertion }} {{ member.lastName }}
    <Icon name="ic:chevron-right" />
    Contactgegevens Beheren
  </h1>
  <div class="overflow-x-auto shadow">Contactgegevensbeheersysteem hiero</div>
</template>

<script setup lang="ts">
import { Member } from ".prisma/client";

defineProps<{
  member: Member;
}>();
</script>
