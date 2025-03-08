<template>
    <h1 class="title">Revise suas informações</h1>
    <Form @submit="nextStep">
        <Input label="Endereço de e-mail" type="text" v-model="form.email" />
        <Input label="Nome" type="text" v-model="form.name" />
        <template v-if="form.personType == 'PF'">
            <Input label="CPF" type="text" mask="###.###.###-##" v-model="form.cpf" />
            <Input label="Data de nascimento" type="date" v-model="form.birthDate" />
        </template>
        <template v-else>
            <Input label="CNPJ" type="text" mask="##.###.###/####-##" v-model="form.cnpj" />
            <Input label="Data de abertura" type="date" v-model="form.openingDate" />
        </template>
        <Input label="Telefone" type="text" mask="(##) #####-####" v-model="form.phone" />
        <Input label="Senha" type="password" v-model="form.password" />
        <Button type="submit">Cadastrar</Button>
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

    function nextStep() {
        emit('nextStep')
    }
</script>