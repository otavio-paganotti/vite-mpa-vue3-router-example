import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import mpaPlugin from 'vite-plugin-multiple-page';
import { posix } from 'path';

// https://vitejs.dev/config/
export default (config) => {
  const env = {...process.env, ...loadEnv(config.mode, process.cwd())};

  const app = env.VITE_APP_NAMES.split(',');
  const extensions = env.VITE_APP_EXTENSIONS.split(',');

  const rewrites = [];

  const pages = app.reduce<Record<string, any>>((_pages, pageName, currentIndex) => {
    _pages[pageName] = {
      entry: `packages/${pageName}/src/main.${extensions[currentIndex]}`,
      filename: `/${pageName}.html`,
      template: `packages/${pageName}/index.html`,
      inject: {
        data: {
          title: `mpa-${pageName}`
        }
      }
    };
    rewrites.push({
      from: `/${pageName}`,
      to: posix.join('/', `/packages/${pageName}/index.html`)
    });
    return _pages;
  }, {});

  return defineConfig({
    plugins: [
      vue(),
      mpaPlugin({
        pages,
        historyApiFallback: {
          rewrites
        }
      }),
    ],
    resolve: {
      alias: app.reduce<Record<string, any>>((_paths, pathName) => {
        _paths[`@${pathName}`] = require('path').resolve(__dirname, `./packages/${pathName}/src`)

        return _paths;
      }, {}),
    },
  });
}
