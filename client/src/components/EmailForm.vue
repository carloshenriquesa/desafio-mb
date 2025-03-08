    <template>
        <h1 class="title">Seja bem vindo(a)</h1>
        <Form @submit="nextStep">
            <Input
                label="Endereço de e-mail"
                type="text"
                v-model="form.email"
                :error="errorMessage"/>
            <div>
                <Radio
                    :idFor="PERSON_TYPES.PF.code"
                    :value="PERSON_TYPES.PF.code"
                    name="personType"
                    v-model="form.personType"
                    :label="PERSON_TYPES.PF.label"
                />
                <Radio
                    :idFor="PERSON_TYPES.PJ.code"
                    :value="PERSON_TYPES.PJ.code"
                    name="personType"
                    v-model="form.personType"
                    :label="PERSON_TYPES.PJ.label"
                />
            </div>
            <Button type="submit" :disabled="isDisabled">Continuar</Button>
        </Form>
    </template>

<script setup>
    import Input from '@/components/ui/Input.vue'
    import Button from '@/components/ui/Button.vue'
    import Form from '@/components/ui/Form.vue'
    import Radio from './ui/Radio.vue';
    import { defineProps, defineEmits } from 'vue'
    import { ref, computed } from 'vue';
    import { isValidEmail } from '@shared/validators.js';
    import { PERSON_TYPES } from '@shared/constants.js';

    const props = defineProps({
        form: Object,
    });

    const errorMessage = ref('');

    const emit = defineEmits(['nextStep']);

    const isDisabled = computed(() => {
        return !props.form.email || !props.form.personType;
    });

    function nextStep() {
        if (!isValidEmail(props.form.email)) {
            errorMessage.value = 'E-mail inválido';
            return;
        }
        emit('nextStep');
    }
</script>