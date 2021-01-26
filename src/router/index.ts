import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouteMeta,
} from "vue-router"
import EditData from "@/views/EditData.vue"
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
