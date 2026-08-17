<script setup lang="ts">
import { Form, Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import TextLink from '@/components/TextLink.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthBase from '@/layouts/AuthLayout.vue';
import { login } from '@/routes';
import { store } from '@/routes/register';
const docNumber = ref('')
const docType = ref('V')
function handleSubmit(data: Record<string, any>) {
    
  const payloadFinal = { ...data };

    payloadFinal.id_card = `${docType.value}-${docNumber.value}`;
    
    if (payloadFinal.name) {
        payloadFinal.name = payloadFinal.name.trim();
    }
    delete payloadFinal.docType;
    delete payloadFinal.docNumber;
    console.log('--- PAYLOAD FINAL LISTO PARA EL SERVIDOR ---');
    console.log(payloadFinal);

    return payloadFinal;
}

function handleAuthSuccess() {
    // 1. Analizamos los parámetros de la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    const redirectTarget = urlParams.get('redirect');

    if (redirectTarget === 'publicar') {
        router.visit('/dashboard/publicacion/crear');
    }
}

</script>

<template>
    <AuthBase
        title="Crea una cuenta"
        description="Crea una cuenta para empezar a publicar tus avisos"
    >
        <Head title="Register" />
              <!--  -->

        <Form
            v-bind="store.form()"
            :reset-on-success="['password', 'password_confirmation']"
            v-slot="{ errors, processing }"
            class="flex flex-col gap-6"
            :transform="handleSubmit"
              @success="handleAuthSuccess" 
        >
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="name">Nombre completo</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autofocus
                        :tabindex="1"
                        autocomplete="name"
                        name="name"
                        placeholder="Pedro Pérez"
                        class="placeholder:text-text-main/50"
                    />
                    <InputError :message="errors.name" />
                </div>

                <div class="grid gap-2">
                    <Label for="email">Correo electronico</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        :tabindex="2"
                        autocomplete="email"
                        name="email"
                        placeholder="email@example.com"
                        class="placeholder:text-text-main/50"
                    />
                    <InputError :message="errors.email" />
                </div>

                     <div class="flex flex-col gap-2">
                        <label for="doc-number" class="text-sm font-semibold italic">
                            Documento de Identidad <span class="text-red-500" aria-hidden="true">*</span><span class="sr-only">(Obligatorio)</span>
                        </label>
                        <div class="relative flex items-center gap-0 rounded-lg border  bg-background transition-all focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]  group">
                            <label for="doc-type" class="sr-only">Tipo de documento de identidad</label>
                            <select
                                id="doc-type"
                                v-model="docType"
                                class="h-full cursor-pointer rounded-l-lg border-r border-primary/20 bg-transparent py-3 pr-2 pl-4 text-base font-bold  outline-none text-text-main/50 group-focus-within:text-primary"
                            >
                                <option value="V" class="bg-background text-foreground">V</option>
                                <option value="E" class="bg-background text-foreground">E</option>
                                <option value="P" class="bg-background text-foreground">P</option>
                                <option value="J" class="bg-background text-foreground">J</option>
                            </select>

                            <input
                                id="doc-number"
                                v-model="docNumber"
                                type="text"
                                inputmode="numeric"
                                pattern="[0-999999999]*"
                                maxlength="9"
                                placeholder="12345678"
                                aria-describedby="doc-hint"
                                class="w-full rounded-r-lg bg-transparent px-4 py-3 text-base transition-all outline-none"
                                @input="docNumber = (docNumber as string).replace(/\D/g, '')"
                                required
                            />
                        </div>
                     
                    </div>
          
                <div class="grid gap-2">
                    <Label for="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        :tabindex="3"
                        autocomplete="new-password"
                        name="password"
                        placeholder="●●●●●●●"
                        class="placeholder:text-text-main/50"
                    />
                    <InputError :message="errors.password" />
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirmar contraseña</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        required
                        :tabindex="4"
                        autocomplete="new-password"
                        name="password_confirmation"
                        placeholder="●●●●●●●"
                        class="placeholder:text-text-main/50"
                    />
                    <InputError :message="errors.password_confirmation" />
                </div>

                <Button
                    type="submit"
                    class="mt-2 w-full"
                    tabindex="5"
                    :disabled="processing"
                    data-test="register-user-button"
                >
                    <Spinner v-if="processing" />
                    Crear cuenta
                </Button>
            </div>

            <div class="text-center text-sm text-text-main/50">
                ¿Ya estas registrado?
                <TextLink
                    :href="login()"
                    class="underline underline-offset-4"
                    :tabindex="6"
                    >Inicia sesión</TextLink
                >
            </div>
        </Form>
    </AuthBase>
</template>
