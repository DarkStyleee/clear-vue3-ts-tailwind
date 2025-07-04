import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// PrimeVue imports
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';

// PrimeVue components
import Button from 'primevue/button';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import ColorPicker from 'primevue/colorpicker';
import Knob from 'primevue/knob';
import Rating from 'primevue/rating';
import ToggleButton from 'primevue/togglebutton';
import InputNumber from 'primevue/inputnumber';
import ProgressBar from 'primevue/progressbar';
import Dial from 'primevue/speeddial';
import Carousel from 'primevue/carousel';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: 'colored'
} as ToastContainerOptions);

// Configure PrimeVue with new theme system
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
});

// Register PrimeVue components globally
app.component('PrimeButton', Button);
app.component('PrimeSlider', Slider);
app.component('PrimeInputText', InputText);
app.component('PrimeCard', Card);
app.component('PrimeColorPicker', ColorPicker);
app.component('PrimeKnob', Knob);
app.component('PrimeRating', Rating);
app.component('PrimeToggleButton', ToggleButton);
app.component('PrimeInputNumber', InputNumber);
app.component('PrimeProgressBar', ProgressBar);
app.component('PrimeDial', Dial);
app.component('PrimeCarousel', Carousel);

app.mount('#app');
