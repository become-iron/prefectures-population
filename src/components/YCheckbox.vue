<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: null,
  },
  label: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(["update:modelValue"])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit("update:modelValue", value)
  },
})
</script>

<template>
  <label class="y-checkbox">
    <input v-model="value" type="checkbox" />
    {{ label }}
  </label>
</template>

<style lang="scss" scoped>
.y-checkbox {
  display: grid;
  grid-template-columns: 20px auto;
  gap: 8px;

  input[type="checkbox"] {
    display: grid;
    place-content: center;
    appearance: none;
    background-color: white;
    margin: 0;
    width: 20px;
    height: 20px;
    border: 1px solid currentColor;
    border-radius: 4px;
    transform: translateY(1px);

    &::before {
      content: "";
      width: 12px;
      height: 12px;
      transform: scale(0);
      transition: 0.1s transform;
      box-shadow: inset 12px 12px #0490e5;
      border-radius: 3px;
    }

    &:checked::before {
      transform: scale(1);
    }
  }
}
</style>
