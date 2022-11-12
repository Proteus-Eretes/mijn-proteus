<template>
  <ul
    tabindex="0"
    class="dropdown-content menu menu-compact mt-3 p-2 shadow bg-base-100/80 backdrop-blur rounded-box w-52"
  >
    <li
      v-for="item in flattenedItems"
      :key="item.name"
      :class="!item.target ? 'menu-title' : ''"
    >
      <NuxtLink v-if="item.target" :to="item.target" :title="item.name">
        <Icon :name="item.icon" size="20px" />
        {{ item.name }}
      </NuxtLink>
      <span v-else>
        {{ item.name }}
      </span>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { MenuItem } from "./NavBar.vue";

const props = defineProps<{
  items: MenuItem[];
}>();

// Flatten the items with their children, adding the parent's name as the menu title.
const flattenedItems = computed(() => {
  return props.items.flatMap((item) => {
    return [
      { name: item.name, target: undefined, icon: undefined },
      item,
      ...(item.children || []),
    ];
  });
});
</script>
