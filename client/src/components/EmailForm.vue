<template>
  <h1 class="title">Seja bem vindo(a)</h1>
  <Form @submit="nextStep">
    <template #fields>
      <Input
        label="Endereço de e-mail"
        type="text"
        v-model="form.email"
        :error="errorMessage.email"
      />
      <div>
        <Radio
          idFor="PF"
          value="PF"
          name="personType"
          v-model="form.personType"
          label="Pessoa Física"
        />
        <Radio
          idFor="PJ"
          value="PJ"
          name="personType"
          v-model="form.personType"
          label="Pessoa jurídica"
        />
      </div>
    </template>
    <template #footer>
      <Button type="submit" :disabled="isDisabled">Continuar</Button>
    </template>
  </Form>
</template>

<script setup>
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import Form from "@/components/ui/Form.vue";
import Radio from "./ui/Radio.vue";
import { defineProps, defineEmits } from "vue";
import { ref, computed } from "vue";
import { isValidEmail } from "@shared/validators.js";
import { PERSON_TYPES } from "@shared/constants.js";

const props = defineProps({
  form: Object,
});

const errorMessage = ref({
  email: "",
});

const emit = defineEmits(["nextStep"]);

const isDisabled = computed(() => {
  return !props.form.email.length || !props.form.personType;
});

function nextStep() {
  errorMessage.value.email = isValidEmail(props.form.email)
    ? ""
    : "E-mail inválido";
  if (errorMessage.value.email) return;

  emit("nextStep");
}
</script>
