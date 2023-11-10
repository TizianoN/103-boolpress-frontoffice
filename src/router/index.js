import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import BlogPage from '../pages/BlogPage.vue';
import PostPage from '../pages/PostPage.vue';
import BlogCategoryPage from '../pages/BlogCategoryPage.vue';
import AdvancedFilterPage from '../pages/AdvancedFilterPage.vue';
import ContactPage from '../pages/ContactPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      name: 'homepage',
      path: '/',
      component: HomePage,
    },
    {
      name: 'blog',
      path: '/blog',
      component: BlogPage,
    },
    {
      name: 'post-detail',
      path: '/blog/:slug',
      component: PostPage,
    },
    {
      name: 'blog-category',
      path: '/blog/category/:categoryId',
      component: BlogCategoryPage,
    },
    {
      name: 'advanced-filter',
      path: '/advanced-filter',
      component: AdvancedFilterPage,
    },
    {
      name: 'contacts',
      path: '/contacts',
      component: ContactPage,
    },

    // 404
    {
      name: 'not-found',
      path: '/:pathMatch(.*)*',
      component: NotFoundPage,
    },
  ],
});

export { router };
