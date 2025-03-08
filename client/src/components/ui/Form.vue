<template>
    <form 
        class="form" 
        @submit.prevent="$emit('submit')"
    >
        <slot></slot>
    </form>
</template>

<script setup>
    const emit = defineEmits(['submit'])
</script>
