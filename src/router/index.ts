import { createRouter, createWebHistory } from 'vue-router';
import { RouteName, RouteNames } from '@/router/routes';
import HomePage from '@/views/HomePage';
import PhoneSliderPage from '@/views/PhoneSliderPage';
import ChaosVolumePage from '@/views/ChaosVolumePage';
import CreativeFormsPage from '@/views/CreativeFormsPage';
import NavigationHellPage from '@/views/NavigationHellPage';
import GesturePasswordPage from '@/views/GesturePasswordPage';
import LunarCalculatorPage from '@/views/LunarCalculatorPage';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RouteNames[RouteName.HOME],
      name: RouteName.HOME,
      component: HomePage
    },
    {
      path: RouteNames[RouteName.PHONE_SLIDER],
      name: RouteName.PHONE_SLIDER,
      component: PhoneSliderPage
    },
    {
      path: RouteNames[RouteName.CHAOS_VOLUME],
      name: RouteName.CHAOS_VOLUME,
      component: ChaosVolumePage
    },
    {
      path: RouteNames[RouteName.CREATIVE_FORMS],
      name: RouteName.CREATIVE_FORMS,
      component: CreativeFormsPage
    },
    {
      path: RouteNames[RouteName.NAVIGATION_HELL],
      name: RouteName.NAVIGATION_HELL,
      component: NavigationHellPage
    },
    {
      path: RouteNames[RouteName.GESTURE_PASSWORD],
      name: RouteName.GESTURE_PASSWORD,
      component: GesturePasswordPage
    },
    {
      path: RouteNames[RouteName.LUNAR_CALCULATOR],
      name: RouteName.LUNAR_CALCULATOR,
      component: LunarCalculatorPage
    }
  ]
});

export default router;
