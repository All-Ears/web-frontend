<template>
    <div class="h-full w-full p-5">
        <div class="lg:w-1/3 md:w-1/2 sm:w-full mx-auto">
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
                    Search
                </button>
            </div>
        </div>
        <div class="w-4/5 h-2/3 mx-auto p-2">
            <div id="map" class="h-full w-full border rounded"></div>
        </div>

        <div
            v-if="totalDistance"
            class="lg:w-1/3 md:w-1/2 sm:w-full mx-auto p-2 pb-4"
        >
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
                            {{ totalCarbon.toLocaleString() }} grams of carbon
                        </td>
                    </tr>
                    <tr>
                        <th class="p-2 border">Suggested donation amount:</th>
                        <td class="p-2 border">
                            ${{ Math.round(totalCarbon / 1000) }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue"
import { Maps, Zoom, NavigationLine } from "@syncfusion/ej2-maps"
import { MAPBOX_TOKEN, RAPID_API_KEY } from "@/config"
import DropdownSearch, { SelectOption } from "@/components/DropdownSearch.vue"
import { AirportInfo, GeoCoords } from "@/models"
import Axios from "axios"

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
    return Math.round(distance * (12 / 44) * 0.29) // outputs kg of carbon
}

export default defineComponent({
    name: "CarbonCalculator",
    components: { DropdownSearch },
    setup() {
        Maps.Inject(Zoom, NavigationLine)
        const startAirport = ref<AirportInfo | null>(null)
        const endAirport = ref<AirportInfo | null>(null)
        const airportList = ref<AirportInfo[]>([])
        const airportOptions = computed<SelectOption[]>(() => {
            return airportList.value.map((x) => {
                return {
                    display: `${x.location} (${x.iataCode}) - ${x.city}`,
                    value: x,
                }
            })
        })
        const maps = new Maps({
            zoomSettings: {
                enable: true,
                enablePanning: true,
                zoomFactor: 3,
            },
            layers: [
                {
                    layerType: "OSM",
                    urlTemplate:
                        "https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/level/tileX/tileY?access_token=" +
                        MAPBOX_TOKEN,
                },
            ],
        })
        const totalDistance = ref(0)
        const totalCarbon = ref(0)

        function drawLineOnMap(start: GeoCoords, end: GeoCoords) {
            maps.layers[0].navigationLineSettings = [
                {
                    visible: true,
                    latitude: [start.latitude, end.latitude],
                    longitude: [start.longitude, end.longitude],
                    color: "black",
                    angle: 0.1,
                    width: 2,
                    dashArray: "10",
                },
            ]
            maps.refresh()
        }

        async function handleSubmit() {
            if (startAirport.value && endAirport.value) {
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

        onMounted(async () => {
            airportList.value = await loadAirports()
            maps.appendTo("#map")
        })

        return {
            airportOptions,
            startAirport,
            endAirport,
            handleSubmit,
            totalDistance,
            totalCarbon,
        }
    },
})
</script>
