<template>
    <form 
        class="form" 
        @submit.prevent="$emit('submit')"
    >
        <slot name="fields"></slot>
        
        <footer class="form-footer">
            <slot name="footer"></slot>
        </footer>
    </form>
</template>

<script setup>
    const emit = defineEmits(['submit'])
</script>
