<template>
    <div id="map" class="h-80 w-80">
    </div>
</template>

<script lang="ts">

import{defineComponent, onMounted} from "vue"
import {Maps} from "@syncfusion/ej2-maps"
import Axios from "axios"
import {isArray} from "lodash"
import {CountryRecord} from "@/models"

export default defineComponent({
    name: "ElephantMapPage",
    setup() {
        onMounted(async () => {
            const africaMap = (await Axios.get("/africa.geojson")).data
            console.log(africaMap)
            const poachingData = (await Axios.get("/api/countryrecords")).data as CountryRecord[]
            if(!isArray(poachingData)) {
                throw new Error()
            }


            const map = new Maps({
                layers: [
                    {
                        shapeData: africaMap,
                        shapeDataPath: "countryName",
                        shapePropertyPath: "name_long",
                        dataSource: poachingData
                    }
                ]
            })

            map.appendTo("#map")
        })
    }
})
</script>