<script setup lang="ts">
import { computed, ref, unref } from "vue"
import YCheckbox from "@/components/YCheckbox.vue"
import type { PrefectureModel } from "@/pages/ChartPage/ChartPage.vue"
import { useMobile } from "@/utils/composables"

const props = defineProps<{
  prefectures: PrefectureModel[]
}>()
defineEmits(["togglePrefecture"])

const loading = computed(() => !unref(props.prefectures).length)
const isMobile = useMobile()
const isOpened = ref(false)
</script>

<template>
  <div class="prefecture-list y-card" :class="{ 'prefecture-list_mobile': isMobile }">
    <div v-if="loading" class="prefecture-list__loading-message">読み込み中。。。</div>

    <template v-else>
      <div v-if="!isMobile || isOpened" class="list-wrapper">
        <div class="prefecture-list__list">
          <YCheckbox
            v-for="prefecture of prefectures"
            :key="prefecture.code"
            :model-value="prefecture.visible"
            :label="prefecture.name"
            @update:model-value="$emit('togglePrefecture', $event, prefecture.code)"
          />
        </div>

        <button v-if="isMobile" class="y-btn" @click="isOpened = !isOpened">次</button>
      </div>

      <button v-if="isMobile" class="y-btn" @click="isOpened = !isOpened">選ぶを都道府県</button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.prefecture-list {
  display: flex;
  justify-content: center;

  .list-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &.prefecture-list_mobile .list-wrapper {
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 16px;
    background: #fafafa;
    overflow: scroll;

    button {
      margin-top: 16px;
      font-size: 24px;
    }
  }

  .prefecture-list__list {
    display: grid;
    gap: 8px;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    grid-auto-rows: max-content;
  }

  .prefecture-list__loading-message {
    font-size: 20px;
  }
}
</style>
