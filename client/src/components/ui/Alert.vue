<template>
  <div :class="['alert', `alert-${type}`]">
    <strong class="alert-text">{{ text }}</strong>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  type: {
    type: String,
    validator: (value) => ["success", "error"].includes(value),
  },
  text: String,
});
</script>
