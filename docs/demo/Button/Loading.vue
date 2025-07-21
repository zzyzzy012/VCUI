<template>
  <div class="loading block">
    <Button loading> hello </Button>
    <Button type="primary" loading> Primary </Button>
    <Button type="success" loading> Success </Button>
    <Button type="warning" loading> Warning </Button>
    <Button type="danger" loading> Danger </Button>
    <Button type="info" loading> Info </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
</script>