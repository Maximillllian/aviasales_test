<template>
  <div class="card">
      <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({})
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px 0;
}
</style>
