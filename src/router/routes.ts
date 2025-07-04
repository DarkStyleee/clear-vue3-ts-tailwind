export enum RouteName {
  HOME = 'home',
  PHONE_SLIDER = 'phone-slider',
  CHAOS_VOLUME = 'chaos-volume', 
  CREATIVE_FORMS = 'creative-forms',
  NAVIGATION_HELL = 'navigation-hell'
}

export const RouteNames: Record<RouteName, string> = {
  [RouteName.HOME]: '/',
  [RouteName.PHONE_SLIDER]: '/phone-slider',
  [RouteName.CHAOS_VOLUME]: '/chaos-volume',
  [RouteName.CREATIVE_FORMS]: '/creative-forms',
  [RouteName.NAVIGATION_HELL]: '/navigation-hell'
};
