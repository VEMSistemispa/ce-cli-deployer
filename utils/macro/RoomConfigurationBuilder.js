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

// inside environment configuration we can put every custom field we want
export const  getCustomRoomEnvironmentData = (element, publishGuid) => {
  return {
    PUBLISH_IDENTIFIER: publishGuid,
    ROOM_NAME: element.normalizedName,
    FIELD_1: element.additionalDetails.field1,
    FIELD_2: element.additionalDetails.field2,
  };
}