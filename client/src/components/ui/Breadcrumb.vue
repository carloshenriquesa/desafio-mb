<template>
    <p>Etapa <span class="color-primary">{{ currentStep }}</span> de 4</p>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    currentStep: Number
});

</script>
