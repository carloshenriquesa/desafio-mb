<template>
    <div class="input-container">
        <label>{{ label }}</label>
        <template v-if="props.mask">
            <input
                :type="type"
                :value="modelValue"
                @input="handleInput"
                :placeholder="placeholder"
                :class="[
                    'input', 
                    { 'input-error': hasError }
                ]"
                v-mask="mask"
            />
        </template>
        <template v-else>
            <input
                :type="type"
                :value="modelValue"
                @input="handleInput"
                :placeholder="placeholder"
                :class="[
                    'input', 
                    { 'input-error': hasError }
                ]"
            />
        </template>
        <span v-if="hasError" class="input-error__message">{{ errorMessage }}</span>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text',
    },
    placeholder: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    mask: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['update:modelValue']);

const hasError = ref(false);
const errorMessage = ref('');

const handleInput = (event) => {
    const value = event.target.value;
    hasError.value = false;
    errorMessage.value = '';

    emit('update:modelValue', value);
}
</script>
