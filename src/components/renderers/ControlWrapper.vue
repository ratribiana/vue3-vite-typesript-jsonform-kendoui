<script lang="ts">
import { isDescriptionHidden, computeLabel } from '@jsonforms/core';
import { defineComponent, PropType } from 'vue';
import { FieldWrapper } from "@progress/kendo-vue-form";
import { Error, Hint, Label } from "@progress/kendo-vue-labels";

interface Options {
  showUnfocusedDescription?: boolean;
  hideRequiredAsterisk?: boolean;
  focus?: boolean;
  step?: number;
}

export default defineComponent({
  name: 'ControlWrapper',
  components: {
    fieldwrapper: FieldWrapper,
    error: Error,
    hint: Hint,
    klabel: Label,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as const,
      type: Object as PropType<Options>,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    }
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription
      );
    },
    computedLabel(): string {
      return computeLabel(
        this.label,
        this.required,
        !!this.appliedOptions?.hideRequiredAsterisk
      );
    },
  },
});
</script>
<template>
  <div v-if="visible" :id="id" >
    <fieldwrapper>
      <klabel :class="'k-form-label'" :for="id + '-input'">
        {{ computedLabel }}
      </klabel>
      <div>
        <slot></slot>
      </div>
      <error v-if="errors && label.toLowerCase().trim() != 'birthday'">
        {{errors}}
      </error>
      <hint v-else>{{ showDescription ? description : null }}</hint>
    </fieldwrapper>
  </div>
</template>