<script setup lang="ts">
import { ref } from "vue"

defineEmits(["entered"])

const apiKey = ref()
</script>

<template>
  <div class="credentials-form">
    <p>
      このアプリを使うには、<a href="https://opendata.resas-portal.go.jp/docs/api/v1/index.html" target="_blank"
        >RESAS APIキー</a
      >を記入する必要があります。
    </p>

    <div class="credentials-form__inputs">
      <input v-model="apiKey" type="text" />

      <button class="y-btn" @click="$emit('entered', apiKey)">次</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.credentials-form {
  font-size: 24px;

  .credentials-form__inputs {
    display: flex;
    gap: 16px;
    width: 100%;

    input {
      flex-grow: 1;
      flex-shrink: 1;
      min-width: 0;
      width: 0;
    }
  }
}
</style>
