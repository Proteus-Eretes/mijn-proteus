<template>
  <div class="flex max-lg:flex-col items-start w-full">
    <div
      tabindex="0"
      class="collapse lg:collapse-open max-lg:collapse-arrow w-full lg:w-1/3 xl:w-1/4 bg-base-100 shadow"
    >
      <div class="collapse-title text-xl lg:text-2xl font-medium text-primary">
        {{ title }}
      </div>
      <div class="collapse-content">
        <ul class="menu">
          <li v-for="item in items" :key="item.title" :class="classes(item.to)">
            <span v-if="!item.to">{{ item.title }}</span>
            <NuxtLink v-else :to="item.to">
              <Icon
                :name="item.icon || 'ic:baseline-question-mark'"
                size="20px"
              />
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
      </div>
    </div>
    <div class="divider divider-horizontal max-lg:hidden"></div>
    <div class="flex-1 w-full max-lg:pt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface MenuItem {
  icon?: string;
  title: string;
  to?: string;
  badge?: string;
}

defineProps<{
  title: string;
  items: MenuItem[];
}>();

const classes = (route?: string): string => {
  if (!route) return "menu-title pt-5";
  return useRoute().path.endsWith(route) ? "bordered" : "";
};
</script>
