<template>
  <main>
    <Stepper :currentStep="currentStep" />

    <EmailForm :form="form" @nextStep="nextStep" v-if="currentStep === 1" />

    <PersonForm
      :form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 2"
    />

    <PasswordForm
      :form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 3"
    />

    <ReviewForm :form="form" v-if="currentStep === 4" />
  </main>
</template>

<script setup>
import EmailForm from "@/components/EmailForm.vue";
import PersonForm from "@/components/PersonForm.vue";
import PasswordForm from "@/components/PasswordForm.vue";
import ReviewForm from "@/components/ReviewForm.vue";
import Stepper from "./components/ui/Stepper.vue";
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
