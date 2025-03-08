    <template>
    <h1 class="title">Seja bem vindo(a)</h1>
    <Form @submit="nextStep">
        <Input label="Endereço de e-mail" type="text" v-model="form.email" />
        <div>
            <input id="PF" value="PF" type="radio" name="personType" v-model="form.personType" />
            <label for="PF">
                Pessoa física
            </label>
            <input id="PJ" value="PJ" type="radio" name="personType" v-model="form.personType" />
            <label for="PJ">
                Pessoa jurídica
            </label>
        </div>
        <Button type="submit">Continuar</Button>
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

    const emit = defineEmits(['nextStep']);

    function nextStep() {
        emit('nextStep');
    }
</script>