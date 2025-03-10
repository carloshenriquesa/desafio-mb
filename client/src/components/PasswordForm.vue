<template>
  <h1 class="title">Senha de acesso</h1>
  <UiForm @submit="nextStep">
    <template #fields>
      <UiInput
        label="Senha"
        type="password"
        v-model="localUiForm.password"
        :error="errorMessage.password"
      />
      <small
        >A senha precisa ter, no mínimo, 8 dígitos, com letras e números.</small
      >
    </template>
    <template #footer>
      <UiButton type="button" variant="outline" @click="backStep"
        >Voltar</UiButton
      >
      <UiButton type="submit" :disabled="isDisabled">Continuar</UiButton>
    </template>
  </UiForm>
</template>

<script setup>
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiForm from "@/components/ui/UiForm.vue";
import { ref, computed } from "vue";
import { isValidPassword } from "@shared/validators.js";

const props = defineProps({
  form: Object,
});

const localUiForm = ref({ ...props.form });

const errorMessage = ref({
  password: "",
});

const emit = defineEmits(["backStep", "nextStep", "update:form"]);

const isDisabled = computed(() => {
  return !localUiForm.value.password.length;
});

function backStep() {
  emit("backStep");
}

function nextStep() {
  errorMessage.value.password = isValidPassword(localUiForm.value.password)
    ? ""
    : "Senha inválida";
  if (errorMessage.value.password) return;

  emit("update:form", { ...localUiForm.value });
  emit("nextStep");
}
</script>
