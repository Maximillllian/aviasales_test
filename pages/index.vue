<template>
  <div class="container">
    <div class="wrapper">
      <header>
        <img src="img/logo.svg" alt="" />
      </header>
      <main>
        <aside class="aside-filters">
          <filter-card
            id="transfer-filter"
            input-type="checkbox"
            :title="transfersFilter.title"
            :options="transfersFilter.options"
            @filter-change="setTransferFilter"
          />
          <filter-card
            input-type="radio"
            :title="companiesFilter.title"
            :options="companiesFilter.options"
            @filter-change="setCompaniesFilter"
          />
        </aside>
        <div class="content">
          <div class="flat-filters">
            <flat-filter
              :options="flatFilter.options"
              @choose-option="changeFilterMode"
            />
          </div>
          <div class="tickets">
            <ticket-card
              v-for="ticket in paginatedTickets"
              :key="ticket.id"
              :ticket="ticket"
            />
            <full-width-button @click="showMoreTickets"
              >Показать еще 5 билетов</full-width-button
            >
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

import FilterCard from '../components/FilterFormCard.vue'
import TicketCard from '../components/TicketCard.vue'
import FlatFilter from '../components/FlatFilter.vue'
import FullWidthButton from '../components/FullWidthButton.vue'

import { ModifiedTicket } from '../api/interfaces'

export default Vue.extend({
  name: 'IndexPage',

  components: {
    FilterCard,
    TicketCard,
    FlatFilter,
    FullWidthButton,
  },

  data() {
    return {
      shownTickets: 5,
    }
  },

  computed: {
    ...mapGetters('tickets', [
      'filteredTickets',
      'transfersFilter',
      'companiesFilter',
      'flatFilter',
    ]),
    paginatedTickets(): Array<ModifiedTicket> {
      return this.filteredTickets.slice(0, this.shownTickets)
    },
  },

  watch: {
    filters: {
      handler() {
        this.resetShownTicketsCount()
      },
      deep: true,
    },
  },

  created() {
    this.loadFiltersOptions()
    this.loadTickets()
  },

  methods: {
    ...mapActions('tickets', [
      'loadTickets',
      'loadFiltersOptions',
      'selectTransferFilterOptions',
      'selectCompaniesFilterOptions',
      'selectFilterMode'
    ]),
    showMoreTickets() {
      this.shownTickets += 5
    },

    changeFilterMode(mode: string) {
      this.selectFilterMode(mode)
    },

    resetShownTicketsCount() {
      this.shownTickets = 5
    },

    setTransferFilter(filters: Array<string>) {
      this.selectTransferFilterOptions(filters)
    },

    setCompaniesFilter(filters: string) {
      this.selectCompaniesFilterOptions(filters)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '~/assets/scss/_spaces.scss';

.container {
  background-color: #e5e5e5;
  min-height: 100vh;
  padding: 50px 0;

  @media screen and (max-width: $medium-screen) {
    padding: 15px;
  }
}

.wrapper {
  max-width: 754px;
  margin: 0 auto;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 50px 0;

  @media screen and (max-width: $medium-screen) {
    padding-bottom: $default-gap;
  }
}

main {
  margin: auto 0%;
  display: grid;
  column-gap: $default-gap;
  grid-auto-rows: min-content min-content;
  grid-template-areas: 'aside-filters content';

  @media screen and (max-width: 767.98px) {
    row-gap: $default-gap;
    grid-template-areas:
      'aside-filters'
      'content';
  }

  .content {
    grid-area: content;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .aside-filters {
    grid-area: aside-filters;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media screen and (max-width: $medium-screen) {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    @media screen and (max-width: $mobile-screen) {
      grid-template-columns: 1fr;
    }
  }
}

.tickets {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
