// 使用某框架的 SSR API 渲染该应用
import { createSSRApp } from 'vue';
import App from './App.vue';
import { renderToString } from '@vue/server-renderer';
// import './utils/rem'
import { sync } from 'vuex-router-sync';
import createStore from './store'
import createRouter from './router'
const [store, router] = [createStore(), createRouter()];
sync(store, router);


export async function render(url, manifest) {
  const app = createSSRApp(App);
  app.use(store).use(router);
  router.push(url);

  await router.isReady();

  const context = {};
  const appHtml = await renderToString(app, context);
  return { appHtml };
}

