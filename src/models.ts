export interface CountryRecord {
    unRegion: string
    subregionName: string
    subregionId: string
    countryName: string
    countryCode: string
    year: number
    carcasses: number
    illegalCarcasses: number
}
export function getCountryPrimaryKey({ countryCode, year }: MikeRecord) {
    return { countryCode, year }
}

export interface MikeRecord extends CountryRecord {
    mikeSiteId: string
    mikeSiteName: string
}

export function getMikePrimaryKey({ mikeSiteId, year }: MikeRecord) {
    return { mikeSiteId, year }
}

export type ProcessState = "not started" | "waiting" | "done" | "failed"
