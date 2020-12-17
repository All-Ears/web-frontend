import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import EditData from "@/views/EditData.vue"
import Login from "@/views/Login.vue"

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Edit Data",
        component: EditData,
    },
    {
        path: "/",
        name: "Edit Mike Records",
        component: EditData,
    },
    {
        path: "/login",
        name: "Login",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Login,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
