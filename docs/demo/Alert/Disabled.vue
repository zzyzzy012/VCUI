<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <!-- 禁用 -->
    <Alert title="Success" type="primary" disabled>Primary Message</Alert>
    <Alert title="Success" type="success" disabled>Success Message</Alert>
    <Alert title="Success" type="warning" disabled>Warning Message</Alert>
    <Alert title="Success" type="danger" disabled>Danger Message</Alert>
    <Alert title="Success" type="info" disabled>Info Message</Alert>
  </div>
</template>
<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue'
</script>