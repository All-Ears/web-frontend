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

export interface MikeRecord extends CountryRecord {
    mikeSiteId: string
    mikeSiteName: string
}

export type ProcessState = "not started" | "waiting" | "done" | "failed"
