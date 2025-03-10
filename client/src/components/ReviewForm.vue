<template>
  <h1 class="title">Revise suas informações</h1>

  <UiAlert
    :type="alertMessage.type"
    :text="alertMessage.text"
    v-if="alertMessage.type"
  />

  <UiForm @submit="register">
    <template #fields>
      <UiInput
        label="Endereço de e-mail"
        type="text"
        v-model="localUiForm.email"
        :error="errorMessage.email"
        :disabled="isLoading"
      />
      <UiInput
        label="Nome"
        type="text"
        v-model="localUiForm.name"
        :error="errorMessage.name"
        :disabled="isLoading"
      />
      <template v-if="localUiForm.personType == 'PF'">
        <UiInput
          label="CPF"
          type="text"
          :mask="MASKS.CPF"
          v-model="localUiForm.cpf"
          :error="errorMessage.cpf"
          :disabled="isLoading"
        />
        <UiInput
          label="Data de nascimento"
          type="date"
          v-model="localUiForm.birthDate"
          :error="errorMessage.birthDate"
          :disabled="isLoading"
        />
      </template>
      <template v-else>
        <UiInput
          label="CNPJ"
          type="text"
          :mask="MASKS.CNPJ"
          v-model="localUiForm.cnpj"
          :error="errorMessage.cnpj"
          :disabled="isLoading"
        />
        <UiInput
          label="Data de abertura"
          type="date"
          v-model="localUiForm.openingDate"
          :error="errorMessage.openingDate"
          :disabled="isLoading"
        />
      </template>
      <UiInput
        label="Telefone"
        type="text"
        :mask="MASKS.PHONE"
        v-model="localUiForm.phone"
        :error="errorMessage.phone"
        :disabled="isLoading"
      />
      <UiInput
        label="Senha"
        type="password"
        v-model="localUiForm.password"
        :error="errorMessage.password"
        :disabled="isLoading"
      />
    </template>

    <template #footer>
      <UiButton type="submit" :disabled="isDisabled || isLoading">{{
        isLoading ? "Enviando..." : "Cadastrar"
      }}</UiButton>
    </template>
  </UiForm>
</template>

<script setup>
import UiInput from "@/components/ui/UiInput.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiForm from "@/components/ui/UiForm.vue";
import UiAlert from "./ui/UiAlert.vue";
import { ref, computed } from "vue";
import {
  isValidEmail,
  isValidNameLength,
  isValidCPF,
  isValidCNPJ,
  isValidOpeningDate,
  isValidBirthDate,
  isValidPhone,
  isValidPassword,
} from "@shared/validators.js";
import { PERSON_TYPES, MASKS } from "@shared/constants.js";
import { postRegisterService } from "@/services/registerService";

const props = defineProps({
  form: Object,
});

const localUiForm = ref({ ...props.form });

const alertMessage = ref({
  type: "",
  text: "",
});

const errorMessage = ref({
  name: "",
  email: "",
  cpf: "",
  cnpj: "",
  birthDate: "",
  openingDate: "",
  phone: "",
  password: "",
});

const isLoading = ref(false);

const isDisabled = computed(() => {
  if (localUiForm.value.personType == PERSON_TYPES.PF.code) {
    return (
      !localUiForm.value.name.length ||
      !localUiForm.value.email.length ||
      !localUiForm.value.cpf.length ||
      !localUiForm.value.birthDate.length ||
      !localUiForm.value.password.length ||
      !localUiForm.value.phone.length
    );
  } else {
    return (
      !localUiForm.value.name.length ||
      !localUiForm.value.email.length ||
      !localUiForm.value.cnpj.length ||
      !localUiForm.value.openingDate.length ||
      !localUiForm.value.password.length ||
      !localUiForm.value.phone.length
    );
  }
});

async function register() {
  alertMessage.value.type = "";
  alertMessage.value.text = "";

  errorMessage.value.email = isValidEmail(localUiForm.value.email)
    ? ""
    : "E-mail inválido";
  errorMessage.value.name = isValidNameLength(localUiForm.value.name)
    ? ""
    : "Nome inválido";
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
  errorMessage.value.phone = isValidPhone(localUiForm.value.phone)
    ? ""
    : "Telefone inválido";
  errorMessage.value.password = isValidPassword(localUiForm.value.password)
    ? ""
    : "Senha inválida";

  const isErroEmpty = Object.values(errorMessage.value).every(
    (error) => !error,
  );
  if (!isErroEmpty) {
    return;
  }

  try {
    isLoading.value = true;
    const response = await postRegisterService(localUiForm.value);
    alertMessage.value.type = "success";
    alertMessage.value.text = `Cadastro de ${response.user.name} (${response.user.email}) realizado com sucesso!`;
  } catch (error) {
    alertMessage.value.type = "error";
    alertMessage.value.text = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>
