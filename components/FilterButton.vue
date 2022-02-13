<template>
  <div class="button" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props: {
        option: {
            type: String,
            required: false,
            default: 'Опция'
        }
    },

    methods: {
        handleClick() {
            this.$emit('click', this.option)
        }
    }
})
</script>

<style lang="scss" scoped>
.button {
  flex: auto;
  padding: 15px;
  text-align: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  background-color: white;
  cursor: pointer;
//   transition: all .1s ease-in;

  &:hover {
      background-color: $hover-color;
  }

  &__checked {
      background-color: $checked-color;
      color: white;

      &:hover {
          background-color: $checked-color;
      }
  }
}
</style>
