import { GuidFactory } from "../utils/guidFactory";
import { getNewLogger } from "../utils/logFactory";
import { webPackPromise } from "../utils/webpack.promise";
import { MacroManager, readMacroAsync } from "../utils/macro/macroManager";
import * as path from "path";

import {
  getConfiguration,
} from "../utils/macro/roomConfigurationBuilder";
import { getCustomRoomEnvironmentData } from "../src/EnvironmentData";

const publishGuid = GuidFactory.newGuid();
const log = getNewLogger(publishGuid);

const createMacro = async (roomConfiguration, roomName) => {
  log.info("Runnining webpack for: %s", roomName);
  const stats = await webPackPromise(roomConfiguration);

  if (stats.hasErrors()) {
    console.log(stats);
    return false;
  }

  log.info("Webpack script was successfull for: %s", roomName);
  return true;
};

const processMacroAsync = async (
  { ip, ciscoUser, ciscoPassword, normalizedName },
  path
) => {
  const macro = await readMacroAsync(path);

  const m = new MacroManager(ip, ciscoUser, ciscoPassword, log);

  await m.sendMacroAsync("AutomaticDeploy_" + normalizedName, macro);
  await m.restartMacrosAsync();

  return;
};

const process = async (options) => {
  log.info("Process started");

  const rooms = options.rooms.filter((e) => e.deploy);

  log.info(
    "Rooms to configure: %o",
    rooms.map((e) => e.name)
  );

  for (let i = 0; i < rooms.length; i++) {
    const element = rooms[i];

    log.info("Processing room: %s", element.name);

    const p = path.resolve(__dirname, "../dist/" + element.normalizedName);
    const fileName = `main.${publishGuid}.js`;

    var conf = getConfiguration(
      {
        fileName: fileName,
        path: p,
        minify: options.minify,
      },
      getCustomRoomEnvironmentData(element, publishGuid)
    );

    // create macro at file system
    await createMacro(conf, element.name);

    if (options.publish) {
      log.info("Publishing room %s on the remote", element.name);
      // publish macro on remote
      await processMacroAsync(element, path.resolve(p, fileName));
      log.info("Done publishing room %s on the remote", element.name);
    }

    log.info("Done processing %s", element.name);
  }
};

export default process;
