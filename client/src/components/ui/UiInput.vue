<template>
  <div class="input-container">
    <label>{{ label }}</label>
    <template v-if="mask">
      <input
        :type="type"
        :value="modelValue"
        @input="handleUiInput"
        :placeholder="placeholder"
        :class="['input', { 'input-error': error }]"
        v-mask="mask"
        :disabled="disabled"
      />
    </template>
    <template v-else>
      <input
        :type="type"
        :value="modelValue"
        @input="handleUiInput"
        :placeholder="placeholder"
        :class="['input', { 'input-error': error }]"
        :disabled="disabled"
      />
    </template>
    <span v-if="error" class="input-error__message">{{ error }}</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  mask: {
    type: String,
    default: null,
  },
  error: {
    type: String,
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const handleUiInput = (event) => {
  const value = event.target.value;

  emit("update:modelValue", value);
};
</script>
