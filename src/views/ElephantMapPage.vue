<template>
    <div class="h-full w-full">
        <div id="map" class="h-full w-full border rounded mx-auto">
            <font-awesome-icon
                v-if="mapDataState === 'waiting'"
                class="block h-full w-full mx-auto animate-spin"
                icon="spinner"
                size="3x"
            ></font-awesome-icon>
        </div>

        <div
            v-show="false"
            id="graph"
            class="h-full w-full rounded mx-auto"
        ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import {
    Maps,
    Legend,
    DataLabel,
    Selection,
    Zoom,
    MapsTooltip,
} from "@syncfusion/ej2-maps"
import Axios from "axios"
import { isArray, map, reduce } from "lodash"
import { CountryRecord, ProcessState } from "@/models"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

interface MapRecord {
    countryName: string
    poachingRatio: number
}

export default defineComponent({
    name: "ElephantMapPage",
    components: { FontAwesomeIcon },
    setup() {
        const graphShowing = ref<boolean>(false)
        const mapDataState = ref<ProcessState>("not started")
        let mapData: MapRecord[] = []
        let poachingData: CountryRecord[] = []
        const selectedCountry = ref<string>("")
        let elephantMap: Maps | null = null

        async function loadPoachingData() {
            poachingData = (await Axios.get("/api/countryrecords"))
                .data as CountryRecord[]
            if (!isArray(poachingData)) {
                throw new Error()
            }
            mapData = map<Record<string, CountryRecord>, MapRecord>(
                reduce<CountryRecord, Record<string, CountryRecord>>(
                    poachingData,
                    (aggr, x) => {
                        if (aggr[x.countryName]) {
                            aggr[x.countryName].carcasses += x.carcasses
                            aggr[x.countryName].illegalCarcasses +=
                                x.illegalCarcasses
                        } else {
                            aggr[x.countryName] = x
                        }
                        return aggr
                    },
                    {}
                ),
                ({ countryName, carcasses, illegalCarcasses }) => {
                    return {
                        countryName,
                        poachingRatio: 100 * (illegalCarcasses / carcasses),
                    }
                }
            )
        }
        onMounted(async () => {
            mapDataState.value = "waiting"
            const africaMap = (await Axios.get("/africa.geojson")).data

            await loadPoachingData()

            Maps.Inject(DataLabel, Legend, Zoom, Selection, MapsTooltip)
            elephantMap = new Maps({
                layers: [
                    {
                        selectionSettings: {
                            enable: true,
                            border: { color: "#B3E5FC", width: 3 },
                        },
                        shapeData: africaMap,
                        shapeDataPath: "countryName",
                        shapePropertyPath: "name",
                        dataSource: mapData,
                        dataLabelSettings: {
                            labelPath: "countryName",
                            visible: true,
                            smartLabelMode: "Trim",
                        },
                        tooltipSettings: {
                            visible: true,
                            valuePath: "name",
                        },
                        shapeSettings: {
                            colorValuePath: "poachingRatio",
                            border: { color: "#FFFFFF", width: 1 },
                            fill: "#EEEEEE",
                            colorMapping: [
                                {
                                    from: 0,
                                    to: 50,
                                    color: "#4CAF50", // Like Flutter's colors.red
                                    minOpacity: 0.8,
                                    maxOpacity: 0.2,
                                },
                                {
                                    from: 51,
                                    to: 100,
                                    color: "#F44336", // Like Flutter's colors.green
                                    minOpacity: 0.2,
                                    maxOpacity: 0.8,
                                },
                            ],
                        },
                    },
                ],
                legendSettings: {
                    visible: true,
                    position: "Top",
                },
                zoomSettings: {
                    enable: true,
                    enablePanning: true,
                },
            })
            elephantMap.shapeSelected = (elem) => {
                const data = elem?.data as MapRecord
                if (data) {
                    selectedCountry.value = data.countryName
                }
            }
            mapDataState.value = "done"

            elephantMap.appendTo("#map")
        })

        return { graphShowing, mapDataState, selectedCountry }
    },
})
</script>
