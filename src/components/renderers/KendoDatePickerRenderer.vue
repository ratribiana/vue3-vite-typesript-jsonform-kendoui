<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { ControlElement, JsonFormsRendererRegistryEntry, rankWith, isDateControl } from '@jsonforms/core'
import { useJsonFormsControl, RendererProps, rendererProps } from '@jsonforms/vue'
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useKendoControl } from '@/utils/composition';

import { DatePicker } from "@progress/kendo-vue-dateinputs";

import '@progress/kendo-theme-default/dist/all.css';


const kendoDatePicker = defineComponent({
    name: 'kendo-picker',
    components: {
        ControlWrapper,
        DatePicker
    },    
    props: {
        ...rendererProps<ControlElement>(),
    },
    setup(props: RendererProps<ControlElement>) {
        const data = useKendoControl(
            useJsonFormsControl(props),
            (target) => target.value || undefined
        );
        const { control, appliedOptions, controlWrapper, isFocused, onChange} = data

        const updatedControlData = ref(control.value.data ? new Date(control.value.data) : null);
        const newControlWrapper = ref({})

        watch(() => control.value.data, (newValue) => {
            updatedControlData.value = newValue ? new Date(newValue) : null;
        });
        newControlWrapper.value = controlWrapper.value
 
        return {
            control,
            appliedOptions,
            controlWrapper,
            isFocused,
            onChange,
            updatedControlData
        } 
    },
})

export default kendoDatePicker

export const entry: JsonFormsRendererRegistryEntry = {
    renderer: kendoDatePicker,
    tester: rankWith(2, isDateControl),
}
</script>
<template>
  <control-wrapper
    v-bind="controlWrapper"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <DatePicker      
      :id="control.id + '-input'"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      :value="updatedControlData"
      :format="'dd/MM/yyyy'"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
    >
    </DatePicker>
  </control-wrapper>
</template>