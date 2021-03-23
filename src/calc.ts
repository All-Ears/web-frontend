import { GeoCoords } from "@/models"

function subtract(a: GeoCoords, b: GeoCoords): GeoCoords {
    return {
        latitude: a.latitude - b.latitude,
        longitude: a.longitude - b.longitude,
    }
}
function add(a: GeoCoords, b: GeoCoords): GeoCoords {
    return {
        latitude: a.latitude + b.latitude,
        longitude: a.longitude + b.longitude,
    }
}

function divideScalar(a: GeoCoords, b: number): GeoCoords {
    return {
        latitude: a.latitude / b,
        longitude: a.longitude / b,
    }
}

function multiplyScalar(a: GeoCoords, b: number): GeoCoords {
    return {
        latitude: a.latitude * b,
        longitude: a.longitude * b,
    }
}

function norm(a: GeoCoords): number {
    return Math.sqrt(Math.pow(a.latitude, 2) + Math.pow(a.longitude, 2))
}

function normalize(a: GeoCoords): GeoCoords {
    return divideScalar(a, norm(a))
}

function calcDistance(a: GeoCoords, b: GeoCoords): number {
    return norm(subtract(a, b))
}

function ortho(a: GeoCoords): GeoCoords {
    if (a.longitude < 0) {
        return {
            latitude: -a.longitude,
            longitude: a.latitude,
        }
    } else {
        return {
            latitude: a.longitude,
            longitude: -a.latitude,
        }
    }
}

function calcMidPoint(a: GeoCoords, b: GeoCoords): GeoCoords {
    return {
        latitude: (a.latitude + b.latitude) / 2,
        longitude: (a.longitude + b.longitude) / 2,
    }
}

export function calcVertex(
    a: GeoCoords,
    b: GeoCoords,
    omega: number
): GeoCoords {
    const d = calcDistance(a, b)
    const midPoint = calcMidPoint(a, b)
    const v = subtract(a, midPoint)
    const u = ortho(normalize(v))
    return add(midPoint, multiplyScalar(u, (d / 2) * omega))
}
