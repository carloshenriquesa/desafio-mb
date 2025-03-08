<template>
  <main>
    <Breadcrumb :currentStep="currentStep" />
    <EmailForm 
      :form="form"
      @nextStep="nextStep"
      v-if="currentStep === 1" />
    <PersonForm
      :form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 2 && form.personType === 'PF'" />
    <LegalPersonForm
      :form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 2 && form.personType === 'PJ'" />
    <PasswordForm
      :form="form"
      @backStep="backStep"
      @nextStep="nextStep"
      v-if="currentStep === 3" />
    <ReviewForm :form="form" v-if="currentStep === 4" />
  </main>
</template>

<script setup>
  import EmailForm from '@/components/EmailForm.vue'
  import PersonForm from '@/components/PersonForm.vue'
  import LegalPersonForm from '@/components/LegalPersonForm.vue'
  import PasswordForm from '@/components/PasswordForm.vue'
  import ReviewForm from '@/components/ReviewForm.vue'
  import Breadcrumb from './components/ui/Breadcrumb.vue'
  import { ref } from 'vue'

  const currentStep = ref(1);
  const form = ref({
    email: '',
    personType: '',
    name: '',
    cpf: '',
    cnpj: '',
    birthDate: '',
    openingDate: '',
    phone: '',
    password: '',
  });

  function nextStep() {
    currentStep.value++;
  }

  function backStep() {
    currentStep.value--;
  }
  
</script>
