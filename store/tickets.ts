import { GetterTree, ActionTree, MutationTree } from 'vuex'
import * as api from '../api/api'
import { ModifiedTicket, FilterOption } from '../api/interfaces'
import {
  getCompaniesFilterOptions,
  getTransferFilterOptions,
} from '../api/filters'

export const state = () => ({
  tickets: [] as Array<ModifiedTicket>,
  filters: {
    transfers: {
      title: 'Количество пересадок',
      options: [] as Array<FilterOption>,
      selectedOptions: [] as Array<string>,
    },
    companies: {
      title: 'Компания',
      options: [] as Array<FilterOption>,
      selectedOptions: 'all' as string,
    },
    flatFilter: {
      options: [
        { name: 'Самый дешевый', option: 'cheapest' },
        { name: 'Самый быстрый', option: 'fastest' },
        { name: 'Оптимальный', option: 'optimal' },
      ],
    },
  },
  filterMode: 'default',
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  setTickets(state: RootState, tickets: Array<ModifiedTicket>) {
    state.tickets = tickets
  },

  setTransferFilterOptions(state: RootState, options: Array<FilterOption>) {
    state.filters.transfers.options = options
  },

  setCompaniesFilterOptions(state: RootState, options: Array<FilterOption>) {
    state.filters.companies.options = options
  },

  setSelectedTransferOptions(state: RootState, options: Array<string>) {
    state.filters.transfers.selectedOptions = options
  },

  setSelectedCompaniesOptions(state: RootState, options: string) {
    state.filters.companies.selectedOptions = options
  },

  setFilterMode(state: RootState, mode: string) {
    state.filterMode = mode
  },
}

export const actions: ActionTree<RootState, RootState> = {
  loadTickets({ commit }) {
    const tickets = api.getModifiedTickets()
    commit('setTickets', tickets)
  },

  loadTransfersOptions({ commit }) {
    const options = getTransferFilterOptions()
    commit('setTransferFilterOptions', options)
  },

  loadCompaniesOptions({ commit }) {
    const options = getCompaniesFilterOptions()
    commit('setCompaniesFilterOptions', options)
  },

  loadFiltersOptions({ dispatch }) {
    dispatch('loadTransfersOptions')
    dispatch('loadCompaniesOptions')
  },

  selectTransferFilterOptions({ commit }, filters) {
    commit('setSelectedTransferOptions', filters)
  },

  selectCompaniesFilterOptions({ commit }, filters) {
    commit('setSelectedCompaniesOptions', filters)
  },

  selectFilterMode({ commit }, mode) {
    commit('setFilterMode', mode)
  },
}

export const getters: GetterTree<RootState, RootState> = {
  transfersFilter(state: RootState) {
    return state.filters.transfers
  },
  companiesFilter(state: RootState) {
    return state.filters.companies
  },
  flatFilter(state: RootState) {
    return state.filters.flatFilter
  },
  filterMode(state: RootState) {
    return state.filterMode
  },
  selectedFiltersOptions(_state: RootState, getters) {
    return {
      transferOptions: getters.transfersFilter.selectedOptions,
      company: getters.companiesFilter.selectedOptions,
    }
  },
  filteredTickets(state: RootState, getters) {
    return api.filterTickets(state.tickets, {
      filterMode: getters.filterMode,
      filtersOptions: getters.selectedFiltersOptions,
    })
  },
}
