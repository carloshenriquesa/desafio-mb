<template>
  <div :class="['alert', `alert-${type}`]">
    <strong class="alert-text">{{ text }}</strong>
  </div>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    validator: (value) => ["success", "error"].includes(value),
  },
  text: String,
});
</script>
