<script setup lang="ts">
import { inject, onMounted, provide, ref } from 'vue';
import { JsonForms } from '@jsonforms/vue';
import { createAjv, JsonFormsRendererRegistryEntry } from '@jsonforms/core';
import { defaultStyles, mergeStyles, vanillaRenderers } from '@jsonforms/vue-vanilla';
import { entry as kendoInputEntry } from '@/components/renderers/KendoInputRenderer';
import { entry as kendoDatePickerEntry } from '@/components/renderers/KendoDatePickerRenderer';

import { calculateAge } from '@/utils/functions'
import { useAuth } from '@/composables/useAuth';
import schema from '@/forms/profile/schema';
import uiSchema from '@/forms/profile/uiSchema';
 

import { Button } from '@progress/kendo-vue-buttons';

const { fetchUser } = useAuth();

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  birthDate?: string;
}

const renderer: JsonFormsRendererRegistryEntry[] = [
  kendoInputEntry,
  kendoDatePickerEntry,
  ...vanillaRenderers
];

const customAjv = createAjv({ allErrors: true });

const formData = ref<ProfileData>({
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  birthDate: '',
});

const formDataOutput = ref<null | object>(null)

const isNextButtonEnabled = ref<boolean>(false);

const renderers = ref<object>(Object.freeze(renderer));

onMounted(async () => {
  const user: ProfileData = await fetchUser();
  formData.value = {
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: user.birthDate,
    email: user.email
  } 
});

const onChange = (event: JsonFormsChangeEvent) => {
  formData.value = !event.data ? {} : event.data;
  formData.value.age = calculateAge(formData.value.birthDate)
  isNextButtonEnabled.value = formData.value.age == 18;
};

const onNextClick = () => {
  formDataOutput.value = formData.value;
};
</script>
<template>
    <div>
        <div class="text-jacarta-300 dark:text-white mt-8 ">Current Age: {{ formData.age }}</div>
        <div class="text-jacarta-300 dark:text-white mt-8 ">{{ formDataOutput }}</div>
        <JsonForms
            :schema="schema"
            :uischema="uiSchema"
            :data="formData"
            :renderers="renderers"
            :ajv="customAjv"
            @change="onChange"
        />
        <button class="mt-10 text-center items-center relative bg-blue hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:bg-indigo-300 disabled:opacity-20 disabled:cursor-not-allowed" @click="onNextClick" :disabled="!isNextButtonEnabled">Next</button>
    </div>
</template>