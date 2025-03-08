<template>
    <div class="input-radio">
        <input
            :id="idFor" 
            :value="value"
            @input="handleInput" 
            type="radio" 
            :name="name" />
        <label class="input-radio__label" :for="idFor">{{ label }}</label>
    </div>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
    modelValue: {
        type: [String, Number, Boolean],
        required: true
    },
    value: {
        type: [String, Number, Boolean],
        required: true
    },
    name: {
        type: String,
        required: true
    },
    idFor: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    }
});

const handleInput = (event) => {
    const value = event.target.value;
    emit('update:modelValue', value);
}
</script>