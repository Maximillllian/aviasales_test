<template>
  <div class="form-item">
    <label class="container"> {{ label }}
        <input :value="inputValue" type="radio" name="radio" @input="onChange" />
        <span class="checkmark"></span>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    label: {
      type: String,
      required: true,
      default: 'Опция',
    },

    value: {
      type: String,
      default: ''
    },

    inputValue: {
      type: String,
      default: ''
    }
  },

  methods: {
    onChange(e: Event) {
      const target = e.target as HTMLInputElement
      this.$emit('input', target.value)
    }
  }
})
</script>

<style lang="scss" scoped>
input:checked {
  ~ .checkmark {

    &:after {
      content: '';
      width: 12px;
      height: 12px;
      background: $checked-color;
      border-radius: 50%;
    }
  }
}

.checkmark {
  border-radius: 50%;
}
</style>
