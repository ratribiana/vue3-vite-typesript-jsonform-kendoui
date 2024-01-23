<script lang="ts">
import { defineComponent } from 'vue'
import { ControlElement, JsonFormsRendererRegistryEntry, rankWith, isStringControl } from '@jsonforms/core'
import { useJsonFormsControl, RendererProps, rendererProps } from '@jsonforms/vue'
import { default as ControlWrapper } from './ControlWrapper.vue';
import { useKendoControl } from '@/utils/composition';

import { Input } from "@progress/kendo-vue-inputs";

import '@progress/kendo-theme-default/dist/all.css';


const kendoInput = defineComponent({
    name: 'kendo-input',
    components: {
        ControlWrapper,
        kinput: Input
    },    
    props: {
        ...rendererProps<ControlElement>(),
    },
    setup(props: RendererProps<ControlElement>) {
        return useKendoControl(
            useJsonFormsControl(props),
            (target) => target.value || undefined
        );
    },
})

export default kendoInput

export const entry: JsonFormsRendererRegistryEntry = {
    renderer: kendoInput,
    tester: rankWith(1, isStringControl),
}
</script>
<template>
  <control-wrapper
    v-bind="controlWrapper"
    :is-focused="isFocused"
    :applied-options="appliedOptions"
  >
    <kinput
      :id="control.id + '-input'"
      :name="control.id"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @input="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="normal-case"
    />
  </control-wrapper>
</template>