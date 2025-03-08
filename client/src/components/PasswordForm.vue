<template>
    <h1 class="title">Senha de acesso</h1>
    <Form @submit="nextStep">
        <template #fields>
            <Input 
                label="Senha" 
                type="password" 
                v-model="form.password" 
                :error="errorMessage.password"/>
            <small>A senha precisa ter, no mínimo, 8 dígitos, com letras e números.</small>
        </template>
        <template #footer>
            <Button @click="backStep">Voltar</Button>
            <Button type="submit" :disabled="isDisabled">Continuar</Button>
        </template>
    </Form>
</template>

<script setup>
    import Input from '@/components/ui/Input.vue'
    import Button from '@/components/ui/Button.vue'
    import Form from '@/components/ui/Form.vue'
    import { ref, computed, defineProps, defineEmits } from 'vue'
    import { isValidPassword } from '@shared/validators.js'

    const props = defineProps({
        form: Object,
    });

    const errorMessage = ref({
        password: '',
    });

    const emit = defineEmits(['backStep', 'nextStep']);

    const isDisabled = computed(() => {
        return !props.form.name.length;
    });

    function backStep() {
        emit('backStep')
    }

    function nextStep() {
        errorMessage.value.password = isValidPassword(props.form.password) ? '' : 'Senha inválida';
        if (errorMessage.value.password) return;
        emit('nextStep')
    }
</script>