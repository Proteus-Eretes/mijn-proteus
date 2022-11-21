<template>
  <div class="form-control">
    <label v-if="title" class="label">
      <span class="label-text text-base font-bold">{{ title }}</span>
      <span v-if="required" class="label-text-alt text-error text-lg">*</span>
    </label>
    <input
      type="text"
      class="input"
      :class="classes"
      :title="title"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :value="modelValue"
      @input="
        $emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)
      "
    />
    <label v-if="error" class="label">
      <span class="label-text-alt text-error font-bold">{{ error }}</span>
    </label>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  modelValue?: string;
  title?: string;
  error?: string;
  placeholder: string;
  size?: "xs" | "sm" | "md" | "lg";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  bordered?: boolean;
  ghost?: boolean;
  disabled?: boolean;
  required?: boolean;
}

interface Emits {
  (eventName: "update:modelValue", value: string): void;
}

const props = defineProps<Props>();
defineEmits<Emits>();

const classes = computed(() => {
  return {
    "input-xs": props.size === "xs",
    "input-sm": props.size === "sm",
    "input-md": props.size === "md",
    "input-lg": props.size === "lg",
    "input-primary": props.color === "primary",
    "input-secondary": props.color === "secondary",
    "input-accent": props.color === "accent",
    "input-info": props.color === "info",
    "input-success": props.color === "success",
    "input-warning": props.color === "warning",
    "input-error": props.color === "error" || props.error,
    "input-bordered": props.bordered,
    "input-ghost": props.ghost,
  };
});
</script>
