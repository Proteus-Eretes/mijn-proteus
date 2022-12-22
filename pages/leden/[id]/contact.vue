<template>
  <div class="overflow-x-auto shadow">Contactgegevensbeheersysteem hiero</div>
</template>

<script setup lang="ts">
import { Member } from "~/server/types";

defineProps<{
  member: Member;
}>();
</script>
