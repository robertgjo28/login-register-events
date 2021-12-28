import { createRouter, createWebHistory } from "vue-router";
import Events from "@/views/Events/Events.vue";
import Login from "@/views/Login/Login.vue";
import Register from "@/views/Register/Register.vue";

const NotFound = () => import("@/views/NotFound.vue");
const RegisterEvents = () => import("@/views/Events/RegisterEvents.vue");
const BusinessRegister = () => import("@/views/Register/BusinessRegister.vue");
const Individual = () => import("@/views/Register/Individual.vue");

const routes = [
  {
    path: "/",
    name: "Events",
    component: Events,
  },
  {
    path: "/events/register",
    name: "RegisterEvents",
    component: RegisterEvents,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/register/individual",
    name: "Individual",
    component: Individual,
  },
  {
    path: "/register/business",
    name: "BusinessRegister",
    component: BusinessRegister,
  },
  {
    path: "/:catchAll(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
