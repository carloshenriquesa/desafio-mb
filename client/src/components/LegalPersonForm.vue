<template>
    <h1 class="title">Pessoa Jurídica</h1>
    <Form @submit="nextStep">
      <Input label="Nome" type="text" v-model="form.name" />
      <Input label="CNPJ" type="cnpj" mask="##.###.###/####-##" v-model="form.cnpj" />
      <Input label="Data de nascimento" type="date" v-model="form.openingDate" />
      <Input label="Telefone" type="tel" mask="(##) #####-####" v-model="form.phone" />
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