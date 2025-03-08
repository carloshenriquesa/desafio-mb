<template>
    <header class="stepper">
        <p>Etapa <span class="stepper-count">{{ currentStep }}</span> de 4</p>
    </header>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    currentStep: Number,
    title: String
});

</script>
