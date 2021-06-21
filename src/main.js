import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css'

const app = createApp(App);

app.use(router);
app.mount('#app');
