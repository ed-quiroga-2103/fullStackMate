import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Redir from '../views/Redir.vue'
import Login from '../views/Login.vue'
import topicGraph from '../components/graph/topicGraph.vue'
import contact from '../views/Contact.vue'
import evaluation from '../components/evaluation/evaluation.vue'
import Registration from '../views/Registration.vue'


Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/',
        name: 'Redir',
        component: Redir
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/registration',
        name: 'Registration',
        component: Registration
    },
    {
        path: '/topicGraph',
        name: 'topicGraph',
        component: topicGraph
    },
    {
        path: '/contact',
        name: 'contact',
        component: contact
    },
    {
        path: '/evaluation',
        name: 'evaluation',
        component: evaluation
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router