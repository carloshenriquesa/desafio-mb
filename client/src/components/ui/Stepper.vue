<template>
    <header class="stepper">
        <p>Etapa <span class="stepper-counter">{{ currentStep }}</span> de <span class="stepper-total">4</span></p>
    </header>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    currentStep: Number,
    title: String
});

</script>
