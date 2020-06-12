import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import index from '../pages/index'
import child from '../pages/child'
import order from '../pages/order'
import login from '../pages/login'
// import cs from '../pages/Commodity Statistics'
//引入token
import { TOKEN } from "@/api/apis";

const router = new VueRouter({

    routes: [
        {
            path: '/',
            name: 'login',
            component: login
        }
        ,

        {
            path: '/index',
            name: 'index',
            component: index,
            children: [
                {
                    path: '/index/ch',
                    name: 'ch',
                    component: child,
                    meta: {
                     
                        role: ['super', 'normal']
                    }
                }, {
                    path: '/index/order',
                    name: 'order',
                    component: order,
                    meta: { role: ['super', 'normal'] }
                }, {
                    path: '/index/cs',
                    name: 'cs',
                    component: () => import('../pages/Commodity Statistics'),
                    meta: { role: ['super', 'normal'] }
                },
                {
                    path: '/index/os',
                    name: 'os',
                    component: () => import('../pages/Order statistics'),
                    meta: { role: ['super'] }
                },
                {
                    path: '/index/al',
                    name: 'al',
                    component: () => import('../pages/Account list'),
                    meta: { role: ['super'] }
                },
                {
                    path: '/index/an',
                    name: 'an',
                    component: () => import('../pages/Add number'),
                    meta: { role: ['super'] }
                },
                {
                    path: '/index/cp',
                    name: 'cp',
                    component: () => import('../pages/Change pwd'),
                    meta: { role: ['super'] }
                },
                {
                    path: '/index/pl',
                    name: 'pl',
                    component: () => import('../pages/Product list'),
                    meta: { role: ['super'] }
                },
                {
                    path: '/index/pa',
                    name: 'pa',
                    component: () => import('../pages/Product add'),
                    meta: { role: ['super'] }
                },

                {
                    path: '/index/class',
                    name: 'class',
                    component: () => import('../pages/Class'),
                    meta: { role: ['super'] }
                },


                {
                    path: '/index/shop',
                    name: 'shop',
                    component: () => import('../pages/Shop'),
                    meta: { role: ['super'] }
                },


                {
                    path: '/index/admin',
                    name: 'admin',
                    component: () => import('../pages/Admin'),
                    meta: { role: ['super', 'normal'] }
                },



            ], 
        },

    ],






})

// 暴露 router
export default router



//路由守卫
//  to 要前往的路由
// from 前往之前的路由
// next 放行前往目标路由
router.beforeEach((to, from, next) => {


    if (to.path != '/') {

        //   发送token看token是否过期
        TOKEN(localStorage.token).then(res => {
            if (res.data.code == 0) {
                if (to.meta.role.includes(localStorage.role)) {
                    next()
                }
                else {
                    next(from.path)
                }



            } else {

                next('/')
            }
        })






    } else {
        next()
    }





})

