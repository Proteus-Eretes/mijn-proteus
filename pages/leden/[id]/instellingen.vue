<template>
  <div class="overflow-x-auto shadow">toevoegen hiero</div>
</template>

<script setup lang="ts">
import { Member } from "~/server/types";

defineProps<{
  member: Member;
}>();
</script>
