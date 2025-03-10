<template>
  <main>
    <UiStepper :currentStep="currentStep" />

    <EmailForm
      v-model:form="form"
      @nextStep="nextStep()"
      v-if="currentStep === 1"
    />

    <PersonForm
      v-model:form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 2"
    />

    <PasswordForm
      v-model:form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 3"
    />

    <ReviewForm v-model:form="form" v-if="currentStep === 4" />
  </main>
</template>

<script setup>
import EmailForm from "@/components/EmailForm.vue";
import PersonForm from "@/components/PersonForm.vue";
import PasswordForm from "@/components/PasswordForm.vue";
import ReviewForm from "@/components/ReviewForm.vue";
import UiStepper from "./components/ui/UiStepper.vue";
import { ref, watch } from "vue";

const currentStep = ref(1);

const form = ref({
  email: "",
  personType: "",
  name: "",
  cpf: "",
  cnpj: "",
  birthDate: "",
  openingDate: "",
  phone: "",
  password: "",
});

// Caso o usuáro retorne à primeira tela e muda o tipo de pessoa, reseta todos os dados das etapas posteriores a primeira.
watch(
  () => form.value.personType,
  () => {
    Object.assign(form.value, {
      name: "",
      cpf: "",
      cnpj: "",
      birthDate: "",
      openingDate: "",
      phone: "",
      password: "",
    });
  },
);

function nextStep() {
  currentStep.value++;
}

function backStep() {
  currentStep.value--;
}
</script>
