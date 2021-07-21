const fs = require("fs");
const path = require("path");
const express = require("express");
const { createServer: createViteServer } = require("vite");
const { log } = require("console");

async function createServer() {
  const app = express();

  // 以中间件模式创建 vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  // 使用 vite 的 Connect 实例作为中间件
  app.use(vite.middlewares);

  app.use("*", async (req, res) => {
    // 服务 index.html - 下面我们来处理这个问题
    const url = req.originalUrl;

    try {
      // 1. 读取 index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. 应用 vite HTML 转换。这将会注入 vite HMR 客户端，and
      //    同时也会从 Vite 插件应用 HTML 转换。
      //    例如：@vitejs/plugin-react-refresh 中的 global preambles
      template = await vite.transformIndexHtml(url, template);

      // 3. 加载服务器入口。vite.ssrLoadModule 将自动转换
      //    你的 ESM 源码将在 Node.js 也可用了！无需打包
      //    并提供类似 HMR 的根据情况随时失效。
      const { render } = await vite.ssrLoadModule("/src/entry-server.js");

      // 4. 渲染应用的 HTML。这假设 entry-server.js 导出的 `render`
      //    函数调用了相应 framework 的 SSR API。
      //    例如 ReactDOMServer.renderToString()
      const { appHtml, state } = await render(url);

      // 5. 注入应用渲染的 HTML 到模板中。
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml) // 拿取模板
        // .replace(`'<!--vuex-state-->'`, JSON.stringify(state)) // 拿取state
        // .replace("<!--title-->", state.route.meta.title || "Index"); // 拿取title

      // 6. 将渲染完成的 HTML 返回
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // 如果捕获到了一个错误，让 vite 来修复该堆栈，这样它就可以映射回
      // 你的实际源码中。
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  app.listen(3999, () => {
    console.log("http://localhost:3999");
  });
}

createServer();
