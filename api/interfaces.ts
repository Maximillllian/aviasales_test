// сам билет, включает в себя остальные сущности
export interface Ticket {
  id: string
  // Цена в рублях
  price: number
  // идентификатор компании которая осуществляет перевозку
  companyId: string
  // Массив идентификаторов перелётов
  segments: string[]
}

export interface FilterOption {
  option: string,
  text: string
}

export interface ModifiedSegment {
    id: string
    dateStart: number
    dateEnd: number
    origin: string
    destination: string
    stops: string[]
    stopsCount: number | undefined
    duration: number
}

export interface ModifiedTicket {
  id: string
  companyLogo: string | undefined
  companyName: string | undefined
  price: number
  segments: (
    | ModifiedSegment
    | undefined
  )[]
}

export interface Filters {
  filterMode: string,
  filtersOptions: {
    transferOptions: Array<string>,
    company: string
  }
}

// Список кодов городов. Мы в каждом билете будем лететь с MOW в EKT
type CityCodes =
  | 'MOW'
  | 'HKT'
  | 'HKG'
  | 'JNB'
  | 'PTB'
  | 'ARH'
  | 'TRN'
  | 'KRS'
  | 'SRT'
  | 'LOS'
  | 'EKV'
  | 'EKT'

// список перелётов
export interface Segment {
  id: string
  // Код города откуда вылет
  origin: CityCodes
  // Код города куда летим
  destination: CityCodes
  // Дата и время вылета в unix времени
  dateStart: string
  // Дата и время прибытия в unix времени
  dateEnd: string
  // Массив кодов городов с пересадками
  stops: CityCodes[]
  // Длительность полета в миллисекундах
  duration: number
}

// компания
export interface Company {
  id: string
  // Название компании
  name: string
  // Имя логотипа
  // Т.к. картинки пока храниться будут у Вас локально - имя и путь к картинке можете замапить на те что будут у вас
  logo: string
}
