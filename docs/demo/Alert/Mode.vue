<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="basic block">
    <!-- 深色 -->
    <Alert title="Success" type="primary" mode="dark">Primary Message</Alert>
    <Alert title="Success" type="success" mode="dark">Success Message</Alert>
    <Alert title="Success" type="warning" mode="dark">Warning Message</Alert>
    <Alert title="Success" type="danger" mode="dark">Danger Message</Alert>
    <Alert title="Success" type="info" mode="dark">Info Message</Alert>
  </div>
</template>
<script setup lang="ts">
import Alert from '@/components/Alert/Alert.vue'
</script>