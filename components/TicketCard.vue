<template>
  <app-card>
    <div class="card-content">
      <header>
        <div class="price">{{ formatedPrice }}</div>
        <img :src="`img/${ticket.companyLogo}`" alt="" class="logo" />
      </header>
      <main>
        <div
          v-for="segment in ticket.segments"
          :key="segment.id"
          class="segment"
        >
          <div class="trail">
            <h6 class="points">
              {{ formatPoints(segment.origin, segment.destination) }}
            </h6>
            <div class="times description">
              {{ parseTime(segment.dateStart) }} -
              {{ parseTime(segment.dateEnd) }}
            </div>
          </div>
          <div class="duration">
            <h6>В пути</h6>
            <div class="time description">
              {{ parseDuration(segment.duration) }}
            </div>
          </div>
          <div class="stops">
            <h6>{{ parseStopsCount(segment.stops) }}</h6>
            <div class="points description">
              {{ parseStops(segment.stops) }}
            </div>
          </div>
        </div>
      </main>
    </div>
  </app-card>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { declensyTransfer, addSpacesToNumber } from '../api/utils'
import { ModifiedTicket } from '../api/interfaces'
import AppCard from './AppCard.vue'

export default Vue.extend({
  components: {
    AppCard,
  },

  props: {
    ticket: {
      type: Object as () => ModifiedTicket,
      required: true
    },
  },

  computed: {
    formatedPrice(): string {
      const price = addSpacesToNumber(this.ticket.price)
      return `${price} Р`
    },
  },

  methods: {
    formatPoints(origin: string, destination: string) {
      return `${origin} - ${destination}`
    },

    parseTime(timestamp: number) {
      return moment(timestamp).format('kk:mm')
    },

    parseDuration(timestamp: number) {
      const time = moment.duration(timestamp)
      return `${time.hours()}ч ${time.minutes()}м`
    },

    parseStops(stops: Array<string>) {
      return stops.join(', ')
    },

    parseStopsCount(stops: Array<string>) {
      const stopsCount = stops.length
      return `${declensyTransfer(stopsCount)}`
    },
  },
})
</script>

<style lang="scss" scoped>
h6 {
  margin: 0;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #a0b0b9;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px;
}

.card-content {
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .price {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: $blue;
  }
}

main {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .segment {
    display: flex;
    justify-content: space-between;

    > div {
      min-width: 140px;

      @media screen and (max-width: 767.98px) {
        max-width: 140px;
        min-width: 0;
      }
    }

    .description {
      font-weight: 600;
      font-size: 14px;
      line-height: 21px;
      color: #4A4A4A;
    }
  }
}
</style>
