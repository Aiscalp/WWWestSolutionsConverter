import CurrencyConverter from "@/components/CurrencyConverter.vue";
import ExchangeRate from "@/components/ExchangeRate.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: ExchangeRate,
  },
  {
    path: "/converter",
    component: CurrencyConverter,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
