<template>
  <h1 class="title">Seja bem vindo(a)</h1>
  <UiForm @submit="nextStep">
    <template #fields>
      <UiInput
        label="Endereço de e-mail"
        type="text"
        v-model="localUiForm.email"
        :error="errorMessage.email"
      />
      <div>
        <UiRadio
          idFor="PF"
          value="PF"
          name="personType"
          v-model="localUiForm.personType"
          label="Pessoa Física"
        />
        <UiRadio
          idFor="PJ"
          value="PJ"
          name="personType"
          v-model="localUiForm.personType"
          label="Pessoa jurídica"
        />
      </div>
    </template>
    <template #footer>
      <UiButton type="submit" :disabled="isDisabled">Continuar</UiButton>
    </template>
  </UiForm>
</template>

<script setup>
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiForm from "@/components/ui/UiForm.vue";
import UiRadio from "./ui/UiRadio.vue";
import { ref, computed } from "vue";
import { isValidEmail } from "@shared/validators.js";

const props = defineProps({
  form: Object,
});

const localUiForm = ref({ ...props.form });

const errorMessage = ref({
  email: "",
});

const emit = defineEmits(["nextStep", "update:form"]);

const isDisabled = computed(() => {
  return !localUiForm.value.email.length || !localUiForm.value.personType;
});

function nextStep() {
  errorMessage.value.email = isValidEmail(localUiForm.value.email)
    ? ""
    : "E-mail inválido";
  if (errorMessage.value.email) return;

  emit("update:form", { ...localUiForm.value });

  emit("nextStep");
}
</script>
