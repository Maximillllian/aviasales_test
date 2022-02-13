<template>
  <app-card>
    <header @click="toggleBody">
      <h6>{{ title }}</h6>
      <app-arrow :expanded="bodyShowed" />
    </header>
    <main>
      <form ref="form" class="filter-form">
        <template v-if="inputType === 'checkbox'">
          <checkbox-input
            v-for="(option, idx) in options"
            :key="idx"
            v-model="selectedOptions"
            :label="option.text"
            :input-value="option.option"
          />
        </template>
        <template v-else-if="inputType === 'radio'">
          <radio-input
            v-for="(option, idx) in options"
            :key="idx"
            v-model="selectedOptions"
            :label="option.text"
            :input-value="option.option"
          />
        </template>
      </form>
    </main>
  </app-card>
</template>

<script lang="ts">
import Vue from 'vue'
import AppCard from './AppCard.vue'
import CheckboxInput from './form_inputs/CheckboxInput.vue'
import RadioInput from './form_inputs/RadioInput.vue'
import AppArrow from './AppArrow.vue'

export default Vue.extend({
  components: {
    AppCard,
    CheckboxInput,
    RadioInput,
    AppArrow,
  },

  props: {
    title: {
      type: String,
      required: false,
      default: 'Фильтр',
    },
    options: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
    inputType: {
      type: String,
      required: true,
      default: 'checkbox',
    },
  },

  data() {
    return {
      selectedOptions: [],
      bodyShowed: false,
    }
  },

  watch: {
    selectedOptions() {
      this.$emit('filter-change', this.selectedOptions)
    },
  },

  methods: {
    toggleBody() {
      const gsap = this.$gsap
      if (this.bodyShowed) {
        gsap.to(this.$refs.form, { height: 0, marginTop: 0, duration: 0.3 })
      } else {
        gsap.to(this.$refs.form, {
          height: 'auto',
          marginTop: '20px',
          duration: 0.3,
        })
      }
      this.bodyShowed = !this.bodyShowed
    },
  },
})
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 20px;
  position: relative;

  @media screen and (max-width: $mobile-screen) {
    margin-bottom: 0;
  }
}

h6 {
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  margin: 0 20px;
  text-transform: uppercase;
}

.filter-form {
  overflow: hidden;
  transition: none;

  @media screen and (max-width: $mobile-screen) {
    height: 0;
  }
}

.arrow {
  position: absolute;
  right: 20px;
  bottom: 5px;
  display: none;

  @media screen and (max-width: $mobile-screen) {
    display: block;
  }
}
</style>
