import Vue from 'vue'; // Ensure Vue is imported first
import Router from 'vue-router';
import App from '@/App.vue'; // Adjust path if necessary

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
