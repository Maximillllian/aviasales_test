import * as api from './api'
import { declensyTransfer, getNormalizeRatio } from './utils'
import {  ModifiedTicket } from './interfaces'

function compareByCheap(a: ModifiedTicket, b: ModifiedTicket) {
  if (a.price < b.price) {
    return -1
  } else if (a.price > b.price) {
    return 1
  }
  return 0
}

function compareByFast(a: ModifiedTicket, b: ModifiedTicket) {
  // Сравниваем по сумме длительности поездки
  const aDurations = a.segments.flatMap((segment) => segment!.duration)
  const aDurationSum = aDurations.reduce((i, j) => i + j)
  const bDurations = b.segments.flatMap((segment) => segment!.duration)
  const bDurationSum = bDurations.reduce((i, j) => i + j)

  if (aDurationSum < bDurationSum) {
    return -1
  } else if (aDurationSum > bDurationSum) {
    return 1
  }
  return 0
}

function compareByOptiomal(
  a: ModifiedTicket,
  b: ModifiedTicket,
  priceRatio: number,
  durationRatio: number
) {
  // Нормализуем каждую величину
  const aNormalizedPrice = a.price / priceRatio
  // У длительности нормализуем самое самое маленькое маленькое значение
  const aNormalizedDuration =
    Math.min(...a.segments.flatMap((segment) => segment!.duration)) /
    durationRatio
  // Делаем среднее значение
  const aMeanValue = (aNormalizedPrice + aNormalizedDuration) / 2

  const bNormalizedPrice = b.price / priceRatio
  const bNormalizedDuration =
    Math.min(...b.segments.flatMap((segment) => segment!.duration)) /
    durationRatio
  const bMeanValue = (bNormalizedPrice + bNormalizedDuration) / 2

  if (aMeanValue < bMeanValue) {
    return -1
  } else if (aMeanValue > bMeanValue) {
    return 1
  }
  return 0
}

export function getCompaniesFilterOptions() {
  // Смотрим какие компании у нас есть и заносим их в filterOptions
  const companies = api.getCompaniesNames()
  const filterOptions = [{ text: 'Все компании', option: 'all' }]
  companies.forEach((company) => {
    const companyOption = { text: company, option: company }
    filterOptions.push(companyOption)
  })
  return filterOptions
}

export function getTransferFilterOptions() {
  // Смотрим, какие занчения пересадок у нас есть и заносим их в объект transferCountOptionsArray
  const segments = api.getModifiedSegments()
  const transfersCountOptionsSet: Set<number> =
    api.getUniqueTransfersCount(segments)
  const transfersCountOptionsArray: Array<{ option: number; text: string }> = []

  transfersCountOptionsSet.forEach((num) => {
    const transferObject = { option: num, text: '' }
    if (num === 0) {
      transferObject.text = 'Без пересадок'
    } else {
      const declensionedWordWithNumber = declensyTransfer(num)
      transferObject.text = declensionedWordWithNumber
    }
    transfersCountOptionsArray.push(transferObject)
  })

  return transfersCountOptionsArray.sort((a, b) => {
    return a.option - b.option
  })
}

export function sortByCheapest(tickets: Array<ModifiedTicket>) {
  return tickets.sort(compareByCheap)
}

export function sortByFastest(tickets: Array<ModifiedTicket>) {
  return tickets.sort(compareByFast)
}

export function sortByOptiomal(tickets: Array<ModifiedTicket>) {
  // Будем сравнивать по среднему между ценой и длительностью
  // Чтобы сравнивать две несравнимые величины, нормализуем их

  // Получаем коэффециент нормализации для каждой величины
  const priceRatio = getNormalizeRatio(
    tickets.flatMap((ticket) => ticket.price)
  )
  const durationRatio = getNormalizeRatio(
    tickets
      .flatMap((ticket) => ticket.segments)
      .flatMap((ticket) => ticket!.duration)
  )

  return tickets.sort((a, b) =>
    compareByOptiomal(a, b, priceRatio, durationRatio)
  )
}

export function filterByTransfers(
  tickets: Array<ModifiedTicket>,
  transferOptions: Array<string>
) {
  if (!transferOptions.length) {
    return tickets
  }
  const numberTransferOptions = transferOptions.map((option) =>
    parseInt(option)
  )
  return tickets.filter((ticket) => {
    const allStopsCount = ticket.segments.flatMap(
      (segment) => segment?.stopsCount
    )
    return allStopsCount.some((el) => numberTransferOptions.includes(el))
  })
}

export function filterByCompany(
  tickets: Array<ModifiedTicket>,
  company: string
) {
  if (company === 'all') {
    return tickets
  }
  return tickets.filter((ticket) => ticket.companyName === company)
}
