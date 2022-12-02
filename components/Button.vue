<template>
  <button
    class="btn"
    :class="classes"
    :disabled="disabled"
    :type="type"
    :title="title"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
interface Props {
  type?: "submit" | "reset";
  title: string;
  size?: "xs" | "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  ghost?: boolean;
  link?: boolean;
  outline?: boolean;
  active?: boolean;
  disabled?: boolean;
  glass?: boolean;
  loading?: boolean;
  noAnimation?: boolean;
  wide?: boolean;
  block?: boolean;
  shape?: "circle" | "square";
}

const props = defineProps<Props>();
defineEmits<{
  (eventName: "click", value: void): void;
}>();

const classes = computed(() => {
  return {
    "btn-xs": props.size === "xs",
    "btn-sm": props.size === "sm",
    "btn-md": props.size === "md",
    "btn-lg": props.size === "lg",
    "btn-primary": props.color === "primary",
    "btn-secondary": props.color === "secondary",
    "btn-accent": props.color === "accent",
    "btn-info": props.color === "info",
    "btn-success": props.color === "success",
    "btn-warning": props.color === "warning",
    "btn-error": props.color === "error",
    "btn-ghost": props.ghost,
    "btn-link": props.link,
    "btn-outline": props.outline,
    "btn-active": props.active,
    "btn-disabled": props.disabled,
    "glass": props.glass,
    "loading": props.loading,
    "no-animation": props.noAnimation,
    "btn-wide": props.wide,
    "btn-block": props.block,
    "btn-circle": props.shape === "circle",
    "btn-square": props.shape === "square",
  };
});
</script>
