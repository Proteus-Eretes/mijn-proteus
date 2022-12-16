<template>
  <ul class="menu">
    <li v-for="item in items" :key="item.title" :class="classes(item.to)">
      <span v-if="!item.to">{{ item.title }}</span>
      <NuxtLink v-else :to="item.to">
        <Icon :name="item.icon" size="20px" />
        {{ item.title }}
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
export interface MenuItem {
  icon?: string;
  title: string;
  to?: string;
  badge?: string;
}

defineProps<{
  items: MenuItem[];
}>();

const classes = (route?: string): string => {
  if (!route) return "menu-title pt-5";
  return useRoute().path.endsWith(route) ? "bordered" : "";
};
</script>
