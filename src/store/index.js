
import { createStore as _createStore } from 'vuex';

export default function createStore() {
  return _createStore({
    state: {
      message: 'Hello vite2 vue3 ssr',
    },
    mutations: {},
    actions: {
      fetchMessage: ({ state }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            state.message = ' asfafsfa111';
            resolve(0);
          }, 200);
        });
      },
    },
    modules: {},
  });
}
