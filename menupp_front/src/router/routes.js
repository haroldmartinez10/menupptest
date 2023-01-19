
const routes = [

  { path: '/', component: () => import('../components/LoginUsers.vue') },
  { path: '/:catchAll(.*)*', component: () => import('../components/LoginUsers.vue') },
  { path: '/userimages', component: () => import('../components/UserImages.vue') }
]

export default routes
