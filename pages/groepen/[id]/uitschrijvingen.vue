<template>
  <div class="overflow-x-auto shadow">uitschrijvingen hiero</div>
</template>

<script setup lang="ts">
import { Group } from "~/server/types";

defineProps<{
  group: Group;
}>();
</script>
