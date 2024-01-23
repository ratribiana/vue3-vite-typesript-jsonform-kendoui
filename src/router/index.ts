import { createRouter, createWebHistory } from 'vue-router';
import $bus, { eventTypes } from '@/eventBus/events';
import { auth } from '@/middlewares';

// Layouts
const Public = () => import(/* webpackChunkName: "Layout" */ 'layouts/Public');
const Secured = () => import(/* webpackChunkName: "Layout" */ 'layouts/Secured');

// GeneralViews
const PageNotFound = () => import(/* webpackChunkName: "Pages" */ 'views/public/NotFoundPage');

// Public Pages
const About = () => import(/* webpackChunkName: "Pages" */ 'views/public/About');

// Auth Pages
const Login = () => import(/* webpackChunkName: "AuthPages" */ 'views/auth/Login');
const Register = () => import(/* webpackChunkName: "AuthPages" */ 'views/auth/Register.vue');
const Verify = () => import(/* webpackChunkName: "AuthPages" */ 'views/auth/Verify.vue');

// Secured Pages
const Dashboard = () => import(/* webpackChunkName: "SecuredPages" */ 'views/dashboard/Dashboard.vue');
const CategoryPage = () => import(/* webpackChunkName: "SecuredPages" */ 'views/product/ProductCategory.vue');
const ProductPage = () => import(/* webpackChunkName: "SecuredPages" */ 'views/product/Product.vue');
const Profile = () => import(/* webpackChunkName: "SecuredPages" */ 'views/profile/Profile.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
  routes: [
    {
      path: '/',
      component: Public,
      redirect: '/login',
      children: [
        {
          path: 'login',
          name: 'Login',
          meta: {
            title: 'Login',
          },
          component: Login,
        },
        {
          path: 'register',
          name: 'Register',
          meta: {
            title: 'Registration',
          },
          component: Register,
        },
        {
          path: 'verify',
          name: 'VerifyUser',
          meta: {
            title: 'Verify User Email',
          },
          component: Verify,
        },
        {
          path: 'about',
          name: 'About',
          meta: {
            title: 'About us',
          },
          component: About,
        },
      ],
    },
    {
      path: '/dashboard',
      component: Secured,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          meta: {
            title: 'Dashboard',
            requiresAuth: true,
          },
          component: Dashboard,
        },
      ],
    },
    {
      path: '/',
      component: Secured,
      children: [
        {
          path: '/categories/:category',
          name: 'CategoryPage',
          meta: {
            title: 'Category Page',
            requiresAuth: true,
          },
          component: CategoryPage,
        },
        {
          path: '/:category/product/:productId',
          name: 'ProductPage',
          meta: {
            title: 'Product Page',
            requiresAuth: true,
          },
          component: ProductPage,
        },
        {
          path: '/profile',
          name: 'Profile',
          meta: {
            title: 'Profile Page',
            requiresAuth: true,
          },
          component: Profile,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: Public,
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'PageNotFound',
          meta: {
            title: 'Page Not Found',
          },
          component: PageNotFound,
        },
      ],
    },
  ],
});

router.beforeEach(async (from, to, next) => {
  return auth(from, to, next);
});

router.afterEach((to, from, failure) => {
  if (!failure) {
    $bus.$emit(eventTypes.viewed_page, {
      ...to,
      name: document.title,
    });
  }

  const defaultDocumentTitle = import.meta.env.VITE_APP_NAME;
  if (to.name) {
    document.title = `${String(to.meta.title)} — ${defaultDocumentTitle}`;
  } else {
    document.title = defaultDocumentTitle;
  }
});

export default router;
