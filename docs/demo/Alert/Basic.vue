<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <!-- 浅色 -->
    <Alert title="Success" type="primary">Primary Message</Alert>
    <Alert title="Success" type="success">Success Message</Alert>
    <Alert title="Success" type="warning">Warning Message</Alert>
    <Alert title="Success" type="danger">Danger Message</Alert>
    <Alert title="Success" type="info">Info Message</Alert>
  </div>
</template>
<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue'
</script>
