<template>
  <ul class="menu">
    <li v-for="item in items" :key="item.title" :class="classes(item.to)">
      <span v-if="!item.to">{{ item.title }}</span>
      <NuxtLink v-else :to="item.to">
        <span>{{ item.title }}</span>
        <span
          v-if="item.badge"
          class="indicator-item indicator-middle badge badge-secondary"
        >
          {{ item.badge }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface SideMenuItem {
  title: string;
  to?: string;
  badge?: string;
}

defineProps<{
  items: SideMenuItem[];
}>();

const classes = (route?: string): string => {
  if (!route) return "menu-title";
  return useRoute().path.includes(route) ? "bordered" : "";
};
</script>
