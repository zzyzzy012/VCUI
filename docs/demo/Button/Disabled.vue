<template>
  <div class="disabled block">
    <Button disabled> hello </Button>
    <Button type="primary" disabled> Primary </Button>
    <Button type="success" disabled> Success </Button>
    <Button type="warning" disabled> Warning </Button>
    <Button type="danger" disabled> Danger </Button>
    <Button type="info" disabled> Info </Button>
  </div>
</template>

<script setup lang="ts">
import Button from '@/components/Button/Button.vue'
</script>