<template>
  <div class="flat-filter">
    <filter-button
      v-for="(option, idx) in options"
      :key="idx"
      :option="option.option"
      :class="{ button__checked: selectedOption === option }"
      @click="selectOption(option)"
      >{{ option.name }}</filter-button
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FilterButton from '../components/FilterButton.vue'
import { FilterOption } from '../api/interfaces'

export default Vue.extend({
  components: {
    FilterButton,
  },

  props: {
    options: {
      type: Array,
      required: false,
      default() {
        return ['Самый дешевый', 'Самый быстрый', 'Оптимальный']
      },
    },
  },

  data() {
    return {
      selectedOption: {} as FilterOption,
    }
  },

  methods: {
    selectOption(option: FilterOption) {
      this.selectedOption = option
      this.$emit('choose-option', this.selectedOption.option)
    },
  },
})
</script>

<style lang="scss" scoped>
.flat-filter {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid $border-color;

  @media screen and (max-width: $mobile-screen) {
    flex-direction: column;
    align-items: stretch;
  }

  > *{
    @media screen and (max-width: $mobile-screen) {
      border-bottom: 1px solid $border-color;
    }
  }

  > *:first-child {
    border-radius: $border-radius 0 0 $border-radius;

    @media screen and (max-width: $mobile-screen) {
      border-radius: $border-radius $border-radius 0 0;
    }
  }

  > *:last-child {
    border-radius: 0 $border-radius $border-radius 0;

    @media screen and (max-width: $mobile-screen) {
      border-radius: 0 0 $border-radius $border-radius;
    }
  }
}

.flat-filter > *:not(:last-child) {
  border-right: 1px solid $border-color;
}
</style>
