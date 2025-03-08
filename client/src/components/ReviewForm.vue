<template>
    <h1 class="title">Revise suas informações</h1>
    <Form @submit="register">
        <template #fields>
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
        </template>
        <template #footer>
            <Button type="submit" :disabled="isDisabled">Cadastrar</Button>
        </template>
    </Form>
</template>

<script setup>
    import Input from '@/components/ui/Input.vue'
    import Button from '@/components/ui/Button.vue'
    import Form from '@/components/ui/Form.vue'
    import { computed, defineProps, defineEmits } from 'vue'
    import { isValidEmail, isValidNameLength, isValidCPF, isValidCNPJ, isValidOpeningDate, isValidBirthDate, isValidPhone, isValidPassword } from '@shared/validators.js'
    import { PERSON_TYPES } from '@shared/constants.js'

    const props = defineProps({
        form: Object,
    });

    const emit = defineEmits(['backStep', 'nextStep']);

    const isDisabled = computed(() => {
        return !props.form.name.length || 
            !props.form.cnpj.length ||
            !props.form.openingDate.length ||
            !props.form.phone.length;
    });

    function register() {
        errorMessage.value.email = isValidEmail(props.form.email) ? '' : 'E-mail inválido';
        errorMessage.value.name = isValidNameLength(props.form.name) ? '' : 'Nome inválido';
        if (props.form.personType == PERSON_TYPES.PF.code) {
            errorMessage.value.cpf = isValidCPF(props.form.cpf) ? '' : 'CPF inválido';
            errorMessage.value.birthDate = isValidBirthDate(props.form.birthDate) ? '' : 'Necessário ser maior de 18 anos';
        } else {
            errorMessage.value.cnpj = isValidCNPJ(props.form.cnpj) ? '' : 'CNPJ inválido';
            errorMessage.value.openingDate = isValidOpeningDate(props.form.openingDate) ? '' : 'Data de abertura inválida';
        }
        errorMessage.value.phone = isValidPhone(props.form.phone) ? '' : 'Telefone inválido';
        errorMessage.value.password = isValidPassword(props.form.password) ? '' : 'Senha inválida';

        const isErroEmpty = Object.values(errorMessage.value).every((error) => !error);
        if (!isErroEmpty) {
            return;
        }

        emit('nextStep');
    }
</script>