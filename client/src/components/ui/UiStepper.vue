<template>
  <header class="stepper">
    <p>
      Etapa <span class="stepper-counter">{{ currentStep }}</span> de
      <span class="stepper-total">4</span>
    </p>
  </header>
</template>

<script setup>
defineProps({
  currentStep: Number,
});
</script>
