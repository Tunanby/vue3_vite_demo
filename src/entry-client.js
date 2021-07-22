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
    // next();
  let diffed = false;
  const matched = router.resolve(to).matched;
  const prevMatched = router.resolve(from).matched;

  if (from && !from.name) {
    return next();
  } else {
    window.document.title = (to.meta.title || '首页');
  }

  const activated = matched.filter((c, i) => {
    return diffed || (diffed = prevMatched[i] !== c);
  });

  if (!activated.length) {
    return next();
  }

  const matchedComponents = [];
  matched.map((route) => {
    matchedComponents.push(...Object.values(route.components));
  });
  const asyncDataFuncs = matchedComponents.map((component) => {
    const asyncData = component.asyncData || null;
    if (asyncData) {
      const config = {
        store,
        route: to
      };

      return asyncData(config);
    }
  });
  try {
    Promise.all(asyncDataFuncs).then(() => {
      next();
    });
  } catch (err) {
    next(err);
  }
});

// // router.onReady() 已经替换为 router.isReady()
router.isReady().then(() => {
    app.mount('#app', true);
});

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}
