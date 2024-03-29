const path = require("path");
const { override, disableEsLint, babelInclude } = require("customize-cra");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// https://github.com/arackaf/customize-cra

const configWebpackPlugins = () => config => {
  // 太卡关闭一些插件
  // 关闭`ESLINT`的插件 -> 在`VSCode`校验
  // 关闭`CaseSensitivePathsPlugin`插件
  // 关闭`IgnorePlugin`插件
  config.plugins = config.plugins.filter(
    plugin =>
      plugin.constructor.name !== "ESLintWebpackPlugin" &&
      plugin.constructor.name !== "CaseSensitivePathsPlugin" &&
      plugin.constructor.name !== "IgnorePlugin"
  );
  // 添加插件
  process.env.NODE_ENV === "production" &&
    config.plugins.push(
      new UglifyJsPlugin({
        uglifyOptions: { compress: { drop_debugger: true, drop_console: true } },
      })
    );
  return config;
};

module.exports = {
  paths: function (paths) {
    paths.appIndexJs = path.resolve(__dirname, "src/example");
    paths.appSrc = path.resolve(__dirname, "src");
    return paths;
  },
  webpack: override(
    babelInclude([path.resolve("src"), /@maxgraph\/core/]),
    disableEsLint(),
    configWebpackPlugins()
  ),
};
