<template>
    <div class="h-full w-full p-5">
        <div class="xl:w-1/3 md:w-2/3 w-full mx-auto">
            <h1 class="font-bold text-center text-2xl w-full pb-3">
                Flight Carbon Calculator
            </h1>
            <div class="flex space-x-4 w-full">
                <label class="flex-1" for="origin">Origin Airport:</label>
                <dropdown-search
                    id="origin"
                    class="p-1 flex-3"
                    v-model="startAirport"
                    :options="airportOptions"
                />
            </div>
            <div class="flex space-x-3 w-full">
                <label class="flex-1" for="destination"
                    >Destination Airport:</label
                >
                <dropdown-search
                    id="destination"
                    class="p-1 flex-2"
                    v-model="endAirport"
                    :options="airportOptions"
                />
            </div>

            <div class="p-1">
                <button
                    class="rounded bg-green-300 px-2 py-1"
                    @click="handleSubmit()"
                >
                    Calculate
                </button>
            </div>
            <p>
                Select two airports in the dropdown to calculate the distance*
                and carbon generated** by the flight.
            </p>
        </div>
        <div class="w-full lg:w-4/5 h-2/3 mx-auto p-2">
            <div id="map" class="h-full w-full border rounded"></div>
        </div>

        <div class="xl:w-1/3 md:w-2/3 w-full mx-auto p-2 pb-4">
            <p class="p-1">
                An African forest elephant would cause
                <strong>{{ ELEPHANT_PER_YEAR_CARBON.toFixed(2) }} kg</strong>
                of carbon to be sequestered per year by keeping the forests
                healthy.
            </p>
            <template v-if="totalDistance">
                <table class="table-auto w-full border-collapse text-left">
                    <tbody class="divide-y">
                        <tr>
                            <th class="p-2 border">Flight distance:</th>
                            <td class="p-2 border">
                                {{ totalDistance.toLocaleString() }} kilometers
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border">Carbon emmitted:</th>
                            <td class="p-2 border">
                                {{ (totalCarbon / 1000).toFixed(2) }} kg of
                                carbon
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border">
                                Suggested donation amount:
                            </th>
                            <td class="p-2 border">
                                ${{
                                    Math.ceil(
                                        (totalCarbon / 1000) * 0.41
                                    ).toFixed(2)
                                }}
                            </td>
                        </tr>
                        <tr>
                            <th class="p-2 border">
                                Support a ranger for a day:
                            </th>
                            <td class="p-2 border">
                                $25
                            </td>
                        </tr>
                    </tbody>
                </table>
                <p class="p-1">
                    An African forest elephant would need to live for
                    <strong
                        >{{
                            (
                                totalCarbon /
                                (1000 * ELEPHANT_PER_YEAR_CARBON)
                            ).toFixed(2)
                        }}
                        years</strong
                    >
                    to sequester that amount of carbon.
                </p>
            </template>
            <p class="p-1">
                *Due to mapping limitations, the line drawn on the map may not
                be the actual flight path of the plane. Regardless, the distance
                calculated is the shortest distance between the two airports.
            </p>
            <p class="p-1">
                **Our carbon emmision values use methods from the UK National
                Energy Foundation's
                <a
                    class="text-blue-400"
                    href="http://www.carbon-calculator.org.uk/"
                    >Carbon Calculator</a
                >
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue"
import L, { Curve, Map } from "leaflet"
import "leaflet-curve"
import Axios from "axios"
import { isEqual } from "lodash"
import { MAPBOX_TOKEN, RAPID_API_KEY } from "@/config"
import DropdownSearch, { SelectOption } from "@/components/DropdownSearch.vue"
import { AirportInfo, GeoCoords } from "@/models"
import { calcVertex } from "@/calc"
//                               kg of C / years
const ELEPHANT_PER_YEAR_CARBON = 26_000 / 65

async function loadAirports(): Promise<AirportInfo[]> {
    const data = (await Axios.get("/airports.json")).data
    if (data && Array.isArray(data)) {
        return data
    } else {
        return []
    }
}

async function getLatLong(airport: AirportInfo): Promise<GeoCoords> {
    const res = (
        await Axios.get("https://airport-info.p.rapidapi.com/airport", {
            headers: {
                "x-rapidapi-key": RAPID_API_KEY,
                "x-rapidapi-host": "airport-info.p.rapidapi.com",
                useQueryString: true,
            },
            params: { iata: airport.iataCode },
        })
    ).data
    return { latitude: res.latitude, longitude: res.longitude }
}

function calculateDistance(pointA: GeoCoords, pointB: GeoCoords) {
    const p = 0.017453292519943295
    const a =
        0.5 -
        Math.cos((pointB.latitude - pointA.latitude) * p) / 2 +
        (Math.cos(pointA.latitude * p) *
            Math.cos(pointB.latitude * p) *
            (1 - Math.cos((pointB.longitude - pointA.longitude) * p))) /
            2
    return Math.round(12742 * Math.asin(Math.sqrt(a)))
}

function calculateCarbonEmmission(distance: number) {
    return Math.round(distance * (12 / 44) * 49.1) // outputs grams of carbon
}

export default defineComponent({
    name: "CarbonCalculator",
    components: { DropdownSearch },
    setup() {
        const startAirport = ref<AirportInfo | null>(null)
        const endAirport = ref<AirportInfo | null>(null)
        const airportList = ref<AirportInfo[]>([])
        let map: Map | null = null
        let flightLine: Curve | null = null
        const airportOptions = computed<SelectOption[]>(() => {
            return airportList.value.map((x) => {
                return {
                    display: `${x.location} (${x.iataCode}) - ${x.city}`,
                    value: x,
                }
            })
        })
        const totalDistance = ref(0)
        const totalCarbon = ref(0)

        function drawLineOnMap(start: GeoCoords, end: GeoCoords) {
            if (flightLine) {
                map?.removeLayer(flightLine)
            }
            const vertex = calcVertex(start, end, 0.3)
            flightLine = L.curve(
                [
                    "M",
                    [start.latitude, start.longitude],
                    "Q",
                    [vertex.latitude, vertex.longitude],
                    [end.latitude, end.longitude],
                ],
                {
                    color: "black",
                    dashArray: [8, 4, 2, 4],
                    weight: 1.5,
                }
            )
            if (map) {
                flightLine.addTo(map)
                map.setView([28, 3], 2)
            }
        }

        async function handleSubmit() {
            if (
                startAirport.value &&
                endAirport.value &&
                !isEqual(startAirport.value, endAirport.value)
            ) {
                const [startCoords, endCoords] = await Promise.all([
                    getLatLong(startAirport.value),
                    getLatLong(endAirport.value),
                ])
                drawLineOnMap(startCoords, endCoords)
                totalDistance.value = calculateDistance(startCoords, endCoords)
                totalCarbon.value = calculateCarbonEmmission(
                    totalDistance.value
                )
            }
        }

        onMounted(() => {
            loadAirports().then(
                (airportInfos) => (airportList.value = airportInfos)
            )
            map = L.map("map").setView([28, 3], 2)
            const mapId = navigator.language.startsWith("fr")
                ? "all-ears-nau/ckmk4bu1i2vp217og1ytpkz3w"
                : "mapbox/light-v10"

            L.tileLayer(
                "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
                {
                    maxZoom: 8,
                    minZoom: 2,
                    id: mapId,
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: MAPBOX_TOKEN,
                }
            ).addTo(map)
        })
        onUnmounted(() => map?.remove())

        return {
            airportOptions,
            startAirport,
            endAirport,
            handleSubmit,
            totalDistance,
            totalCarbon,
            ELEPHANT_PER_YEAR_CARBON,
        }
    },
})
</script>
