<template>
    <h1 class="title">Senha de acesso</h1>
    <Form @submit="nextStep">
      <Input label="Senha" type="password" v-model="form.password" />
      <div>
          <Button @click="backStep">Voltar</Button>
          <Button type="submit">Continuar</Button>
      </div>
    </Form>
</template>

<script setup>
  import Input from '@/components/ui/Input.vue'
  import Button from '@/components/ui/Button.vue'
  import Form from '@/components/ui/Form.vue'
  import { defineProps, defineEmits } from 'vue'

  const props = defineProps({
      form: Object,
  });

  const emit = defineEmits(['backStep', 'nextStep']);

  function backStep() {
      emit('backStep')
  }

  function nextStep() {
      emit('nextStep')
  }
</script>