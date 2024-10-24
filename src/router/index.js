import Vue from 'vue';
import Router from 'vue-router';
import App from '@/App.vue'; // Make sure the path is correct

Vue.use(Router);

const router = new Router({
  mode: 'history', // Use 'hash' mode if you have issues with history mode
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: App, // Use App.vue directly
    },
  ],
});

export default router;
