<template>
  <div class="basic block">
    <div>
      <Icon icon="fa-solid fa-user-secret" class="icon-margin" />
      <Icon icon="fa-solid fa-user-secret" type="primary" class="icon-margin" />
      <Icon icon="fa-solid fa-user-secret" type="success" class="icon-margin" />
      <Icon icon="fa-solid fa-user-secret" type="warning" class="icon-margin" />
      <Icon icon="fa-solid fa-user-secret" type="danger" class="icon-margin" />
      <Icon icon="fa-solid fa-user-secret" type="info" class="icon-margin" />
    </div>
    <!-- 颜色 -->
    <div>
      <Icon icon="fa-solid fa-heart" class="icon-margin" color="#8076a3" />
      <Icon icon="fa-solid fa-heart" class="icon-margin" color="#322f3b" />
    </div>
    <!-- 尺寸 -->
    <div>
      <Icon icon="fa-solid fa-street-view" class="icon-margin" color="#eea2a4" />
      <Icon icon="fa-solid fa-street-view" class="icon-margin" color="#eea2a4" size="xs" />
      <Icon icon="fa-solid fa-street-view" class="icon-margin" color="#eea2a4" size="lg" />
      <Icon icon="fa-solid fa-street-view" class="icon-margin" color="#eea2a4" size="3x" />
    </div>
    <!-- 动画 -->
    <div>
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" beat />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" beat-fade />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" bounce />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" fade />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" flip />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" shake />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" spin />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" spin spin-reverse />
      <Icon icon="fa-solid fa-thumbs-up" class="icon-margin" spin-pulse />
    </div>
  </div>
</template>

<script setup lang="ts">
import Icon from '@/components/Icon/Icon.vue'
</script>

<style scoped>
.icon-margin {
  margin-right: 10px;
}
</style>