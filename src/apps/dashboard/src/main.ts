import { createApp } from 'vue';
import { RouterView } from 'vue-router';
import router from './router';
// import App from './layouts/Default.vue';

const app = createApp(RouterView);
// const app = createApp(App);

app.use(router);

app.mount('#app');
