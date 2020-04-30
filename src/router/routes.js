
const routes = [
    // {
    //     path: '/about',
    //     name: 'about',
    //     meta: {title: '关于我们'},
    //     component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    // },
    {
        path: '*',
        redirect: {
            path: '/follow'
        }
    },
    {
        path: '/follow',
        component: () => import(/* webpackChunkName: "follow" */ '@/views/follow/follow')
    },
    {
        path: '/follow/details',
        meta: {title: '详情'},
        props: route => ({uid: route.query.uid}),
        component: () => import(/* webpackChunkName: "details" */ '@/views/follow/details')
    },
    {
        path: '/follow/search',
        component: () => import(/* webpackChunkName: "search" */ '@/views/follow/search')
    },
    {
        path: '/follow/mine',
        component: () => import(/* webpackChunkName: "mine" */ '@/views/follow/mine')
    },
    {
        path: '/follow/setting',
        props: route => ({id: route.query.id}),
        component: () => import(/* webpackChunkName: "setting" */ '@/views/follow/setting')
    },
    {
        path: '/follow/time',
        props: route => ({id: route.query.id}),
        component: () => import(/* webpackChunkName: "time" */ '@/views/follow/time')
    },
    {
        path: '/follow/action',
        props: route => ({id: route.query.id}),
        component: () => import(/* webpackChunkName: "time" */ '@/views/follow/action')
    },
];


export default routes
