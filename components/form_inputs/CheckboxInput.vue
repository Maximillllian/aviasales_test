<template>
  <div class="form-item">
    <label class="container">
      {{ label }}
      <input
        :value="inputValue"
        type="checkbox"
        @input="onChange"
      />
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

    inputValue: {
      type: String,
      default: '',
    },

    value: {
      type: Array,
      default() {
        return []
      },
    },
  },

  methods: {
    onChange(e: Event) {
      const target = e.target as HTMLInputElement
      let currentValue = [...this.value]
      if (target.checked) {
        currentValue.push(target.value)
      } else {
        currentValue = currentValue.filter((item) => item !== target.value)
      }
      this.$emit('input', currentValue)
    },
  },
})
</script>

<style lang="scss" scoped>
input:checked {
  ~ .checkmark {
    &:after {
      content: url('~/static/img/shape.svg');
    }
  }
}

.checkmark {
  border-radius: 2px;
}
</style>
