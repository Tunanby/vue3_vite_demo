// 将应用挂载到一个 DOM 元素上
// 跟原有的 main.js 一样做挂载
import { createSSRApp } from 'vue';
import App from './App.vue';
import createStore from './store'
import createRouter from './router'
import { sync } from 'vuex-router-sync';
import './utils/rem'
const [store, router] = [createStore(), createRouter()];
sync(store, router);

const app = createSSRApp(App);
app.use(store).use(router);

// 全局守卫 组件解析后进行下一步
router.beforeResolve((to, from, next) => {
    next();
});

// router.onReady() 已经替换为 router.isReady()
router.isReady().then(() => {
    app.mount('#app', true);
});