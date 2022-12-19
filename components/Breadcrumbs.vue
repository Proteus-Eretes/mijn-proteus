<template>
  <div class="text-xl breadcrumbs">
    <ul class="text-primary font-bold">
      <li v-for="crumb in crumbs" :key="crumb.name">
        <NuxtLink :to="crumb.link">{{ crumb.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  crumbs: {
    name: string;
    link: string;
  }[];
}>();
</script>
