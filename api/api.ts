import { filterByCompany, filterByTransfers, sortByCheapest, sortByFastest, sortByOptiomal } from './filters'
import companies from './companies.json'
import segments from './segments.json'
import tickets from './tickets.json'
import { ModifiedSegment, ModifiedTicket, Filters } from './interfaces'

export function getUniqueTransfersCount(segments: Array<ModifiedSegment>) {
    const transfersCountOptionsSet:Set<number> = new Set()
    segments.forEach((segment: ModifiedSegment) => {
        const stopsCount = segment.stops.length;
        transfersCountOptionsSet.add(stopsCount)
    })
    return transfersCountOptionsSet
}

function getCompanyLogo(companyID: string) {
    const logo = companies.find(company => company.id === companyID)?.logo
    return logo
}

function getCompanyName(companyID: string) {
    const companyName = companies.find(company => company.id === companyID)?.name
    return companyName
}

function getSegment(segmentID: string) {
    const segments = getModifiedSegments()   
    const segment = segments.find(segment => segment.id === segmentID)!
    return segment
}

function getSegments() {
    return segments
}

export function getModifiedSegments() {
    const segments = getSegments()
    const modifiedSegments: Array<ModifiedSegment> = []
    segments.forEach(segment => {
        const modifiedSegment = {...segment, stopsCount: segment.stops.length}
        modifiedSegments.push(modifiedSegment)
    })
    return modifiedSegments
}

export function getCompanies() {
    return companies
}

export function getCompaniesNames() {
    const companies = getCompanies()
    return companies.flatMap(company => company.name)
}

function getTickets() {
    return tickets
}

export function getModifiedTickets() {
    const tickets = getTickets()
    const modifiedTickets: Array<ModifiedTicket> = []
    tickets.forEach(ticket => {
        const segments = ticket.segments.map(segment => getSegment(segment))
        const ticketData = {
            id: ticket.id,
            companyName: getCompanyName(ticket.companyId),
            companyLogo: getCompanyLogo(ticket.companyId),
            price: ticket.price,
            segments
        }
        modifiedTickets.push(ticketData)
    })
    return modifiedTickets
}

export function filterTickets(tickets: Array<ModifiedTicket>,filters: Filters) {
    const { filterMode, filtersOptions } = filters
    const { transferOptions, company } = filtersOptions
    // Скопируем array билетов, чтобы не было ссылки на array из vuex и 
    // не допустить изменение стейта в обход мутаций 
    let filteredTickets = tickets.slice()

    if (transferOptions.length) {
        filteredTickets = filterByTransfers(filteredTickets, transferOptions)
    }
    if (company) {
        filteredTickets = filterByCompany(filteredTickets, company)
    }

    if (filterMode === "cheapest") {
        return sortByCheapest(filteredTickets)
    } else if (filterMode === "fastest") {
        return sortByFastest(filteredTickets)
    } else if (filterMode === "optimal") {
        return sortByOptiomal(filteredTickets)
    }
    return filteredTickets
}