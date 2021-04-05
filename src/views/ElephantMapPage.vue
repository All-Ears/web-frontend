<template>
    <div class="h-9/10 w-full py-5 flex flex-row justify-evenly">
        <div class="border rounded h-full w-9/20">
            <highmaps
                v-if="mapDataState === 'done'"
                :options="mapOptions"
                class="h-full w-full p-1"
            />
            <font-awesome-icon
                v-else-if="mapDataState === 'waiting'"
                class="block h-full w-full mx-auto animate-spin"
                icon="spinner"
                size="3x"
            />
        </div>
        <div v-if="selectedCountryCode" class="border rounded h-full w-9/20">
            <div class="h-full w-full p-1 rounded mx-auto">
                <highcharts :options="chartOptions" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, Ref } from "vue"
import Axios from "axios"
import { flatMap, groupBy, isArray, map, max, maxBy } from "lodash"
import { CountryRecord, ProcessState } from "@/models"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import Highcharts from "highcharts"

interface MapModel extends Highcharts.SeriesMapDataOptions {
    code: string
    value: number
    countryName: string
}

async function loadAfricaShapes(): Promise<object> {
    return (await Axios.get("/africa-map.json")).data
}

async function loadPoachingData(): Promise<CountryRecord[]> {
    const res = (await Axios.get("/api/countryrecords")).data
    if (isArray(res)) {
        return res as CountryRecord[]
    } else {
        throw new Error("Could not load poaching data")
    }
}

function getLatestDataPerCountry(poachingData: CountryRecord[]): MapModel[] {
    const countries = Object.values(groupBy(poachingData, (x) => x.countryName))
    return flatMap(countries, (x) => maxBy(x, (y) => y.year) || x[0]).map(
        (x) => ({
            code: x.countryCode,
            value: x.illegalCarcasses,
            countryName: x.countryName,
        })
    )
}

function generateMapOptions(
    geoJson: object | null,
    data: MapModel[],
    selectedString: Ref<string>,
    selectedCountryName: Ref<string>
): Highcharts.Options {
    return {
        chart: {
            map: geoJson as Highcharts.GeoJSON,
            spacingTop: 20,
            spacingBottom: 0,
            spacingLeft: 0,
            spacingRight: 0,
            marginLeft: 10,
            marginRight: 10,
        },
        title: {
            text: "African Forest Elephant Poaching",
        },
        mapNavigation: {
            enabled: true,
        },

        series: [
            {
                type: "map",
                color: "#EEEEEE",
                borderColor: "#FFFFFF",
                allowPointSelect: true,
                data: data,
                joinBy: "code",
                dataLabels: {
                    enabled: true,
                    color: "#000000",
                    format: "{point.countryName}",
                    style: {
                        fontFamily: "sans-serif",
                        fontSize: ".9rem",
                        fontWeight: "normal",
                        textDecoration: "none",
                        textOutline: "none",
                    },
                },
                events: {
                    // Select a country and if it
                    click(event) {
                        const model = (event.point as unknown) as MapModel
                        if (selectedString.value === model.code) {
                            selectedString.value = ""
                        } else {
                            selectedString.value = model.code
                            selectedCountryName.value = model.countryName
                        }
                    },
                },
                name: "Illegal Carcasses",
                tooltip: {
                    pointFormat:
                        "{point.name}: {point.value} forest elephants poached",
                },
            },
        ],
        colorAxis: {
            type: "linear",
            stops: [
                [0, "rgba(52, 211, 153, .8)"],
                [0.5, "rgba(252, 211, 77, .8)"],
                [1, "rgba(239, 68, 68, .8)"],
            ],
        },
    }
}

function generateChartOptions(
    poachingData: CountryRecord[],
    chartCountryName: string
): Highcharts.Options {
    return {
        chart: {
            spacingTop: 20,
            spacingBottom: 20,
            height: "90%",
            showAxes: true,
        },
        title: {
            text: `${chartCountryName} Poaching Values Over Time`,
        },
        xAxis: {
            allowDecimals: false,
            type: "linear",
            title: {
                text: "Years",
                style: {
                    fontFamily: "sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    textDecoration: "none",
                    textOutline: "none",
                },
            },
        },
        yAxis: {
            allowDecimals: false,
            type: "linear",
            title: {
                text: "Elephants Poached",
                style: {
                    fontFamily: "sans-serif",
                    fontSize: "1rem",
                    fontWeight: "normal",
                    textDecoration: "none",
                    textOutline: "none",
                },
            },
            gridLineWidth: 1,
            floor: 0,
        },
        tooltip: {
            followPointer: true,
            followTouchMove: true,
            pointFormat:
                "{point.illegalCarcasses} out of {point.carcasses} forest elephant deaths were poached",
        },
        series: [
            {
                type: "line",
                name: `Forest Elephant Poaching Deaths per Year`,
                data: poachingData.map((r) => ({
                    x: r.year,
                    y: r.illegalCarcasses,
                    ...r,
                })),
            },
        ],
    }
}

export default defineComponent({
    name: "ElephantMapPage",
    components: { FontAwesomeIcon },
    setup() {
        const graphShowing = ref<boolean>(false)
        const mapDataState = ref<ProcessState>("not started")
        const mapData = ref<MapModel[]>([])
        const poachingData = ref<CountryRecord[]>([])
        const selectedCountryCode = ref<string>("")
        const selectedCountryName = ref<string>("")
        const africaMap = ref<object | null>(null)
        const maxPoaching = ref<number>(0)

        async function initMap() {
            mapDataState.value = "waiting"
            africaMap.value = await loadAfricaShapes()
            poachingData.value.push(...(await loadPoachingData()))
            mapData.value.push(...getLatestDataPerCountry(poachingData.value))
            maxPoaching.value = max(map(mapData.value, (x) => x.value)) || 1
            mapDataState.value = "done"
        }

        const mapOptions = computed(() =>
            generateMapOptions(
                africaMap.value,
                mapData.value,
                selectedCountryCode,
                selectedCountryName
            )
        )

        onMounted(initMap)

        const chartOptions = computed(() =>
            generateChartOptions(
                poachingData.value.filter(
                    (x) => x.countryCode === selectedCountryCode.value
                ),
                selectedCountryName.value
            )
        )

        return {
            graphShowing,
            mapDataState,
            selectedCountryCode,
            mapOptions,
            chartOptions,
        }
    },
})
</script>

<style>
.highcharts-container {
    margin: 0 auto;
}
</style>
