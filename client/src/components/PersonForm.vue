<template>
  <h1 class="title">{{ title }}</h1>
  <Form @submit="nextStep">
    <template #fields>
      <Input
        label="Nome"
        type="text"
        v-model="form.name"
        :error="errorMessage.name"
      />
      <template v-if="form.personType == PERSON_TYPES.PF.code">
        <Input
          label="CPF"
          type="text"
          mask="###.###.###-##"
          v-model="form.cpf"
          :error="errorMessage.cpf"
        />
        <Input
          label="Data de nascimento"
          type="date"
          v-model="form.birthDate"
          :error="errorMessage.birthDate"
        />
      </template>
      <template v-else>
        <Input
          label="CNPJ"
          type="text"
          mask="##.###.###/####-##"
          v-model="form.cnpj"
          :error="errorMessage.cnpj"
        />
        <Input
          label="Data de abertura"
          type="date"
          v-model="form.openingDate"
          :error="errorMessage.openingDate"
        />
      </template>
      <Input
        label="Telefone"
        type="text"
        mask="(##) #####-####"
        v-model="form.phone"
        :error="errorMessage.phone"
      />
    </template>
    <template #footer>
      <Button type="button" variant="outline" @click="backStep">Voltar</Button>
      <Button type="submit" :disabled="isDisabled">Continuar</Button>
    </template>
  </Form>
</template>

<script setup>
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import Form from "@/components/ui/Form.vue";
import { ref, computed, defineProps, defineEmits } from "vue";
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

const title = computed(() => {
  return props.form.personType == PERSON_TYPES.PF.code
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

const emit = defineEmits(["backStep", "nextStep"]);

const isDisabled = computed(() => {
  if (props.form.personType == PERSON_TYPES.PF.code) {
    return (
      !props.form.name.length ||
      !props.form.cpf.length ||
      !props.form.birthDate.length ||
      !props.form.phone.length
    );
  } else {
    return (
      !props.form.name.length ||
      !props.form.cnpj.length ||
      !props.form.openingDate.length ||
      !props.form.phone.length
    );
  }
});

function backStep() {
  emit("backStep");
}

function nextStep() {
  errorMessage.value.name = isValidNameLength(props.form.name)
    ? ""
    : "Nome inválido";
  errorMessage.value.phone = isValidPhone(props.form.phone)
    ? ""
    : "Telefone inválido";
  if (props.form.personType == PERSON_TYPES.PF.code) {
    errorMessage.value.cpf = isValidCPF(props.form.cpf) ? "" : "CPF inválido";
    errorMessage.value.birthDate = isValidBirthDate(props.form.birthDate)
      ? ""
      : "Necessário ser maior de 18 anos";
  } else {
    errorMessage.value.cnpj = isValidCNPJ(props.form.cnpj)
      ? ""
      : "CNPJ inválido";
    errorMessage.value.openingDate = isValidOpeningDate(props.form.openingDate)
      ? ""
      : "Data de abertura inválida";
  }

  const isErrorEmpty = Object.values(errorMessage.value).every(
    (error) => !error,
  );
  if (!isErrorEmpty) {
    return;
  }

  emit("nextStep");
}
</script>
