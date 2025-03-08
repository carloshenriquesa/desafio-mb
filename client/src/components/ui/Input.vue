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
                    { 'input-error': error }
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
                    { 'input-error': error }
                ]"
            />
        </template>
        <span v-if="error" class="input-error__message">{{ error }}</span>
    </div>
</template>

<script setup>
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
    },
    error: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['update:modelValue']);

const handleInput = (event) => {
    const value = event.target.value;

    emit('update:modelValue', value);
}
</script>
