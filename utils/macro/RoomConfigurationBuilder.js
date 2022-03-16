const conf = require("../../webpack.config");
const {EnvironmentPlugin} = require("webpack");
const path = require("path");


const roomData = (rooms, publishGuid, nodeEnvironment) => {
  nodeEnvironment = nodeEnvironment || 'production';
  let confs = rooms
    .filter((e) => e.Deploy)
    .map((e) => {
      const p =  path.resolve(__dirname, "../../dist/" + e.Room.split("/").join("__"));
      const fileName = `main.${publishGuid}.js`;
      return {
        c: {
          ...conf,
          output: {
            filename: fileName,
            path: p,
          },
          plugins: [
            new EnvironmentPlugin({
              NODE_ENV: nodeEnvironment, // use 'development' unless process.env.NODE_ENV is defined
              PUBLISH_IDENTIFIER: publishGuid,
              ROOM_NAME: e.NormalizedName
            }),
          ],
        },
        roomInfo: {
          ...e,
          path: path.resolve(p, fileName),
        },
      };
    });
    return confs;
};


module.exports = {
    getRoomBuildConfiguration: roomData
}