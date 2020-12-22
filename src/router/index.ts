import {
    createRouter,
    createWebHistory,
    RouteRecordRaw,
    RouteMeta,
} from "vue-router"
import EditData from "@/views/EditData.vue"
import UploadData from "@/views/UploadData.vue"
import Login from "@/views/Login.vue"
import { isLoggedIn } from "@/auth"

function restrictAccess(to: RouteMeta, from: RouteMeta, next: Function) {
    if (!isLoggedIn()) {
        next({ name: "Login" })
    }
    next()
}

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Root",
        component: EditData,
    },
    {
        path: "/admin/upload",
        name: "Admin.Upload",
        component: UploadData,
        beforeEnter: restrictAccess,
    },
    {
        path: "/admin/edit",
        name: "Admin.Edit",
        component: EditData,
        beforeEnter: restrictAccess,
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

export default router
