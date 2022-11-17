<template>
  <div class="card shadow">
    <div class="card-body">
      <h2 class="card-title text-primary">{{ title }}</h2>
      <slot />
      <div v-if="$slots.actions" class="card-actions justify-end">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title: string;
}

defineProps<Props>();
</script>
