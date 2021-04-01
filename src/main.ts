import { createApp } from "vue"
import App from "./App.vue"
import "@/assets/css/main.sass"
import "leaflet/dist/leaflet.css"
import router from "./router"
import store from "./store"
import Highcharts from "highcharts"
import loadMap from "highcharts/modules/map"
import VueHighcharts from "vue-highcharts"
import { library } from "@fortawesome/fontawesome-svg-core"
import {
    faTimesCircle,
    faSave,
    faPlus,
    faFileCsv,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons"

loadMap(Highcharts)

library.add(faTimesCircle, faPlus, faSave, faFileCsv, faSpinner)
createApp(App)
    .use(store)
    .use(router)
    .use(VueHighcharts, { Highcharts })
    .mount("#app")
