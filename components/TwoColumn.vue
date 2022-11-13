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
        <slot name="content" />
      </div>
    </div>
    <div class="divider divider-horizontal max-lg:hidden"></div>
    <div class="flex-1 max-lg:pt-2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>
