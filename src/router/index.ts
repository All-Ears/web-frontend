import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouteMeta,
} from "vue-router"
import EditData from "@/views/EditData.vue"
import ElephantMapPage from "@/views/ElephantMapPage.vue"
import CarbonCalculator from "@/views/CarbonCalculator.vue"
import About from "@/views/About.vue"
import DonationPage from "@/views/DonationPage.vue"
import UploadData from "@/views/UploadData.vue"
import Login from "@/views/Login.vue"
import Home from "@/views/Home.vue"
import { isLoggedIn } from "@/auth"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Root",
        component: Home,
    },
    {
        path: "/admin/upload",
        name: "Admin.Upload",
        component: UploadData,
    },
    {
        path: "/admin/edit",
        name: "Admin.Edit",
        component: EditData,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/elephantmap",
        name: "ElephantMap",
        component: ElephantMapPage,
    },
    {
        path: "/carboncalculator",
        name: "CarbonCalculator",
        component: CarbonCalculator,
    },
    {
        path: "/about",
        name: "About",
        component: About,
    },
    {
        path: "/donate",
        name: "Donate",
        component: DonationPage,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

router.beforeEach((to: RouteMeta) => {
    if (!isLoggedIn() && to.name?.toString().startsWith("Admin")) {
        router.push({ name: "Login" })
    }
})

export default router
