<template>
    <div class="h-full w-full p-5">
        <div id="map" class="h-full w-full border rounded mx-auto">
            <font-awesome-icon
                v-if="mapDataState === 'waiting'"
                class="block h-full w-full mx-auto animate-spin"
                icon="spinner"
                size="3x"
            ></font-awesome-icon>
        </div>

        <div
            v-show="selectedCountry"
            id="graph"
            class="h-full w-full rounded mx-auto"
        ></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import {
    Maps,
    Legend as MapLegend,
    DataLabel,
    Selection,
    MapsTooltip,
    IShapeSelectedEventArgs,
} from "@syncfusion/ej2-maps"
import {
    Chart,
    Legend as ChartLegend,
    Category,
    LineSeries,
} from "@syncfusion/ej2-charts"
import Axios from "axios"
import { filter, flatMap, groupBy, isArray, map, max, maxBy } from "lodash"
import { CountryRecord, ProcessState } from "@/models"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

async function loadAfricaShapes(): Promise<object> {
    return (await Axios.get("/africa.geojson")).data
}

async function loadPoachingData(): Promise<CountryRecord[]> {
    const res = (await Axios.get("/api/countryrecords")).data
    if (isArray(res)) {
        return res as CountryRecord[]
    } else {
        throw new Error()
    }
}

function getLatestDataPerCountry(
    poachingData: CountryRecord[]
): CountryRecord[] {
    const countries = Object.values(groupBy(poachingData, (x) => x.countryName))
    return flatMap(countries, (x) => maxBy(x, (y) => y.year) || x[0])
}

export default defineComponent({
    name: "ElephantMapPage",
    components: { FontAwesomeIcon },
    setup() {
        const graphShowing = ref<boolean>(false)
        const mapDataState = ref<ProcessState>("not started")
        const mapData: CountryRecord[] = []
        const poachingData: CountryRecord[] = []
        const selectedCountry = ref<string>("")
        let elephantMap: Maps | null = null
        let elephantChart: Chart | null = null
        Maps.Inject(DataLabel, MapLegend, Selection, MapsTooltip)
        Chart.Inject(Category, LineSeries, ChartLegend)

        function initChart(data: CountryRecord[]) {
            elephantChart = new Chart({
                title: `${selectedCountry.value} Poaching Numbers Over Time`,
                primaryXAxis: { name: "years", valueType: "Category" },
                primaryYAxis: { name: "deathsPerYear", valueType: "Double" },
                series: [
                    {
                        dataSource: data,
                        xName: "year",
                        yName: "illegalCarcasses",
                        type: "Line",
                        xAxisName: "years",
                        yAxisName: "deathsPerYear",
                    },
                ],
            })
            elephantChart.appendTo("#graph")
        }

        function handleCountrySelection(
            shape: IShapeSelectedEventArgs | undefined
        ) {
            const data = shape?.data
            if (data) {
                selectedCountry.value = (data as CountryRecord).countryName
                initChart(
                    filter(
                        poachingData,
                        (x) => x.countryName === selectedCountry.value
                    )
                )
            }
        }

        async function initMap() {
            mapDataState.value = "waiting"
            const africaShapes = await loadAfricaShapes()
            poachingData.push(...(await loadPoachingData()))
            mapData.push(...getLatestDataPerCountry(poachingData))
            const maxPoaching =
                max(map(mapData, (x) => x.illegalCarcasses)) || 1
            elephantMap = new Maps({
                layers: [
                    {
                        selectionSettings: {
                            enable: true,
                            border: { color: "#B3E5FC", width: 3 },
                        },
                        shapeData: africaShapes,
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
                            colorValuePath: "illegalCarcasses",
                            border: { color: "#FFFFFF", width: 1 },
                            fill: "#EEEEEE",
                            colorMapping: [
                                {
                                    from: 0,
                                    to: Math.floor(maxPoaching * 0.1),
                                    color: "#4CAF50", // Like Flutter's colors.red
                                    minOpacity: 0.8,
                                    maxOpacity: 0.2,
                                },
                                {
                                    from: Math.floor(maxPoaching * 0.1) + 1,
                                    to: maxPoaching,
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
            })
            elephantMap.shapeSelected = handleCountrySelection
            mapDataState.value = "done"

            elephantMap.appendTo("#map")
        }
        onMounted(initMap)

        return { graphShowing, mapDataState, selectedCountry }
    },
})
</script>
