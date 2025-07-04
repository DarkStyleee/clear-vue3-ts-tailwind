export enum RouteName {
  HOME = 'home',
  PHONE_SLIDER = 'phone-slider',
  CHAOS_VOLUME = 'chaos-volume', 
  CREATIVE_FORMS = 'creative-forms',
  NAVIGATION_HELL = 'navigation-hell',
  GESTURE_PASSWORD = 'gesture-password',
  LUNAR_CALCULATOR = 'lunar-calculator',
  EMOTION_MUSIC = 'emotion-music',
  QUEST_FILES = 'quest-files',
  ALCHEMY_SEARCH = 'alchemy-search'
}

export const RouteNames: Record<RouteName, string> = {
  [RouteName.HOME]: '/',
  [RouteName.PHONE_SLIDER]: '/phone-slider',
  [RouteName.CHAOS_VOLUME]: '/chaos-volume',
  [RouteName.CREATIVE_FORMS]: '/creative-forms',
  [RouteName.NAVIGATION_HELL]: '/navigation-hell',
  [RouteName.GESTURE_PASSWORD]: '/gesture-password',
  [RouteName.LUNAR_CALCULATOR]: '/lunar-calculator',
  [RouteName.EMOTION_MUSIC]: '/emotion-music',
  [RouteName.QUEST_FILES]: '/quest-files',
  [RouteName.ALCHEMY_SEARCH]: '/alchemy-search'
};
