<template>
    <div class="h-full w-full p-5">
        <div class="lg:w-1/3 md:w-1/2 sm:w-full m-auto">
            <dropdown-search
                class="p-1"
                v-model="startAirport"
                :options="airportOptions"
            />
            <dropdown-search
                class="p-1"
                v-model="endAirport"
                :options="airportOptions"
            />
            <div class="p-1">
                <button
                    class="rounded bg-green-300 px-2 py-1"
                    @click="handleSubmit()"
                >
                    Search
                </button>
            </div>
        </div>

        <div id="map" class="w-full h-4/5"></div>
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

        async function handleSubmit() {
            if (startAirport.value && endAirport.value) {
                const [startCoords, endCoords] = await Promise.all([
                    getLatLong(startAirport.value),
                    getLatLong(endAirport.value),
                ])

                maps.layers[0].navigationLineSettings = [
                    {
                        visible: true,
                        latitude: [startCoords.latitude, endCoords.latitude],
                        longitude: [startCoords.longitude, endCoords.longitude],
                        color: "black",
                        angle: 0.1,
                        width: 2,
                        dashArray: "4",
                    },
                ]
                maps.refresh()
            }
        }

        onMounted(async () => {
            airportList.value = await loadAirports()
            maps.appendTo("#map")
        })

        return { airportOptions, startAirport, endAirport, handleSubmit }
    },
})
</script>
