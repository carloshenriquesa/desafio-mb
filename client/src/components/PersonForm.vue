<template>
    <h1 class="title">Pessoa Física</h1>
    <Form @submit="nextStep">
      <Input label="Nome" type="text" v-model="form.name" />
      <Input
        label="CPF" 
        type="cpf" 
        mask="###.###.###-##" 
        v-model="form.cpf" 
        :error="errorMessage"/>
      <Input label="Data de nascimento" type="date" v-model="form.birthDate" />
      <Input label="Telefone" type="text" mask="(##) #####-####" v-model="form.phone" />
      <div>
          <Button @click="backStep">Voltar</Button>
          <Button type="submit" :disabled="isDisabled">Continuar</Button>
      </div>
    </Form>
</template>

<script setup>
    import Input from '@/components/ui/Input.vue';
    import Button from '@/components/ui/Button.vue';
    import Form from '@/components/ui/Form.vue';
    import { ref, computed, defineProps, defineEmits } from 'vue';
    import { isValidCPF } from '@shared/validators.js';

    const props = defineProps({
        form: Object,
    });

    const errorMessage = ref('');

    const emit = defineEmits(['backStep', 'nextStep']);

    const isDisabled = computed(() => {
        return props.form.name.lenght < 3 || 
            props.form.cpf.lenght < 11 ||
            props.form.birthDate.lenght < 7 ||
            props.form.phone.lenght < 10;
    });

    function backStep() {
        emit('backStep')
    }

    function nextStep() {
        if(!isValidCPF(props.form.cpf)) {
            errorMessage.value = 'CPF inválido';
            return;
        }
        emit('nextStep')
    }
</script>