<template>
  <h1 class="title">{{ title }}</h1>
  <UiForm @submit="nextStep">
    <template #fields>
      <UiInput
        label="Nome"
        type="text"
        v-model="localUiForm.name"
        :error="errorMessage.name"
      />
      <template v-if="localUiForm.personType == PERSON_TYPES.PF.code">
        <UiInput
          label="CPF"
          type="text"
          mask="###.###.###-##"
          v-model="localUiForm.cpf"
          :error="errorMessage.cpf"
        />
        <UiInput
          label="Data de nascimento"
          type="date"
          v-model="localUiForm.birthDate"
          :error="errorMessage.birthDate"
        />
      </template>
      <template v-else>
        <UiInput
          label="CNPJ"
          type="text"
          mask="##.###.###/####-##"
          v-model="localUiForm.cnpj"
          :error="errorMessage.cnpj"
        />
        <UiInput
          label="Data de abertura"
          type="date"
          v-model="localUiForm.openingDate"
          :error="errorMessage.openingDate"
        />
      </template>
      <UiInput
        label="Telefone"
        type="text"
        mask="(##) #####-####"
        v-model="localUiForm.phone"
        :error="errorMessage.phone"
      />
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
import {
  isValidCPF,
  isValidCNPJ,
  isValidBirthDate,
  isValidOpeningDate,
  isValidNameLength,
  isValidPhone,
} from "@shared/validators.js";
import { PERSON_TYPES } from "@shared/constants.js";

const props = defineProps({
  form: Object,
});

const localUiForm = ref({ ...props.form });

const title = computed(() => {
  return localUiForm.value.personType == PERSON_TYPES.PF.code
    ? "Pessoa Física"
    : "Pessoa Jurídica";
});

const errorMessage = ref({
  name: "",
  cpf: "",
  cnpj: "",
  birthDate: "",
  openingDate: "",
  phone: "",
});

const emit = defineEmits(["backStep", "nextStep", "update:form"]);

const isDisabled = computed(() => {
  if (localUiForm.value.personType == PERSON_TYPES.PF.code) {
    return (
      !localUiForm.value.name.length ||
      !localUiForm.value.cpf.length ||
      !localUiForm.value.birthDate.length ||
      !localUiForm.value.phone.length
    );
  } else {
    return (
      !localUiForm.value.name.length ||
      !localUiForm.value.cnpj.length ||
      !localUiForm.value.openingDate.length ||
      !localUiForm.value.phone.length
    );
  }
});

function backStep() {
  emit("backStep");
}

function nextStep() {
  errorMessage.value.name = isValidNameLength(localUiForm.value.name)
    ? ""
    : "Nome inválido";
  errorMessage.value.phone = isValidPhone(localUiForm.value.phone)
    ? ""
    : "Telefone inválido";
  if (localUiForm.value.personType == PERSON_TYPES.PF.code) {
    errorMessage.value.cpf = isValidCPF(localUiForm.value.cpf)
      ? ""
      : "CPF inválido";
    errorMessage.value.birthDate = isValidBirthDate(localUiForm.value.birthDate)
      ? ""
      : "Necessário ser maior de 18 anos";
  } else {
    errorMessage.value.cnpj = isValidCNPJ(localUiForm.value.cnpj)
      ? ""
      : "CNPJ inválido";
    errorMessage.value.openingDate = isValidOpeningDate(
      localUiForm.value.openingDate,
    )
      ? ""
      : "Data de abertura inválida";
  }

  const isErrorEmpty = Object.values(errorMessage.value).every(
    (error) => !error,
  );
  if (!isErrorEmpty) {
    return;
  }

  emit("update:form", { ...localUiForm.value });
  emit("nextStep");
}
</script>
