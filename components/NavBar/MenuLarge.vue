<template>
  <ul class="menu menu-compact menu-horizontal rounded-box">
    <li
      v-for="item in items"
      :key="item.target"
      :tabindex="item.children ? 0 : undefined"
      class="hover:text-primary"
    >
      <NuxtLink :to="item.target" :title="item.name" class="px-2">
        <Icon :name="item.icon" size="24px" class="-mr-2" />
        {{ item.name }}
        <Icon
          v-if="item.children"
          name="material-symbols:keyboard-arrow-down"
          size="20px"
        />
      </NuxtLink>
      <ul
        v-if="item.children"
        class="menu bg-base-100 shadow z-40 w-min-full rounded-box text-neutral"
      >
        <li
          v-for="child in item.children"
          :key="child.name"
          class="hover:text-primary"
        >
          <NuxtLink :to="child.target" :title="child.name">
            <Icon :name="child.icon" size="24px" class="h-full" />
            {{ child.name }}
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { MenuItem } from "./NavBar.vue";

interface Props {
  items: MenuItem[];
}

defineProps<Props>();
</script>
