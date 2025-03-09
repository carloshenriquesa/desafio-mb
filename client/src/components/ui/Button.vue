<template>
  <button
    :class="['button', `button-${variant}`, { 'button-loading': loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
    :type="type"
  >
    <span v-if="loading" class="button-loader"></span>
    <slot v-else></slot>
  </button>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "outline"].includes(value),
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = (event) => {
  if (!props.loading && !props.disabled) {
    emit("click", event);
  }
};
</script>
