<template>
    <div :class="{ arrow__expanded: expanded }" class="arrow"></div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
.arrow {
  width: 15px;
  height: 15px;
  transform: rotate(135deg);
  
  &__expanded {
    opacity: .3;
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    border-width: 0.8vmin 0.8vmin 0 0;
    border-style: solid;
    border-color: #E5E5E5;
    transition: 0.2s ease;
    display: block;
    transform-origin: 100% 0;
  }
}
</style>
