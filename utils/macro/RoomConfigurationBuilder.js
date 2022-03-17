import { EnvironmentPlugin } from "webpack";

export const getConfiguration = (
  { path, fileName, minify },
  envConfiguration
) => {
  return {
    mode: "production",
    entry: "./src/index.js",
    output: {
      filename: fileName,
      path: path,
    },
    externalsType: "commonjs",
    externals: {
      xapi: "xapi",
    },
    plugins: [new EnvironmentPlugin(envConfiguration)],
    optimization: {
      minimize: minify,
    },
  };
};

