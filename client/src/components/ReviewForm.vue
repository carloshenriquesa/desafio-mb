<template>
    <h1 class="title">Revise suas informações</h1>

    <Alert :type="alertMessage.type" :text="alertMessage.text" v-if="alertMessage.type" />

    <Form @submit="register">
        <template #fields>
            <Input label="Endereço de e-mail" type="text" v-model="form.email" :error="errorMessage.email" :disabled="isLoading" />
            <Input label="Nome" type="text" v-model="form.name" :error="errorMessage.name" :disabled="isLoading" />
            <template v-if="form.personType == 'PF'">
                <Input label="CPF" type="text" :mask="MASKS.CPF" v-model="form.cpf" :error="errorMessage.cpf" :disabled="isLoading" />
                <Input label="Data de nascimento" type="date" v-model="form.birthDate" :error="errorMessage.birthDate" :disabled="isLoading" />
            </template>
            <template v-else>
                <Input label="CNPJ" type="text" :mask="MASKS.CNPJ" v-model="form.cnpj" :error="errorMessage.cnpj" :disabled="isLoading" />
                <Input label="Data de abertura" type="date" v-model="form.openingDate" :error="errorMessage.openingDate" :disabled="isLoading" />
            </template>
            <Input label="Telefone" type="text" :mask="MASKS.PHONE" v-model="form.phone" :error="errorMessage.phone" :disabled="isLoading" />
            <Input label="Senha" type="password" v-model="form.password" :error="errorMessage.password" :disabled="isLoading" />
        </template>
        
        <template #footer>
            <Button type="submit" :disabled="isDisabled || isLoading">{{ isLoading ? 'Enviando...' : 'Cadastrar' }}</Button>
        </template>
    </Form>
</template>

<script setup>
    import Input from '@/components/ui/Input.vue'
    import Button from '@/components/ui/Button.vue'
    import Form from '@/components/ui/Form.vue'
    import Alert from './ui/Alert.vue'
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { 
        isValidEmail, 
        isValidNameLength, 
        isValidCPF, 
        isValidCNPJ, 
        isValidOpeningDate, 
        isValidBirthDate, 
        isValidPhone, 
        isValidPassword 
    } from '@shared/validators.js'
    import { PERSON_TYPES, MASKS } from '@shared/constants.js'
    import { postRegisterService } from '@/services/registerService'

    const props = defineProps({
        form: Object,
    });

    const alertMessage = ref({
        type: '',
        text: ''
    });

    const errorMessage = ref({
        name: '',
        email: '',
        cpf: '',
        cnpj: '',
        birthDate: '',
        openingDate: '',
        phone: '',
        password: '',
    });

    const emit = defineEmits(['backStep', 'nextStep']);
    const isLoading = ref(false);

    const isDisabled = computed(() => {
        if (props.form.personType == PERSON_TYPES.PF.code) {
            return !props.form.name.length ||
                !props.form.email.length || 
                !props.form.cpf.length || 
                !props.form.birthDate.length ||
                !props.form.password.length ||
                !props.form.phone.length;
        } else {
            return !props.form.name.length || 
                !props.form.email.length || 
                !props.form.cnpj.length || 
                !props.form.openingDate.length ||
                !props.form.password.length ||
                !props.form.phone.length;
        }
    });

    async function register() {
        alertMessage.value.type = '';
        alertMessage.value.text = '';
        
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

        try {
            isLoading.value = true;
            const response = await postRegisterService(props.form);
            alertMessage.value.type = 'success';
            alertMessage.value.text = `${response.user.name} (${response.user.email}) cadastrado(a) com sucesso!`
        } catch (error) {
            alertMessage.value.type = 'error';
            alertMessage.value.text = error.message;
        } finally {
            isLoading.value = false;
        }
    }
</script>