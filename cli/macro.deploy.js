import { GuidFactory } from "../utils/GuidFactory";
import { getNewLogger } from "../utils/LogFactory";
import { webPackPromise } from "../utils/webpack.promise";
import { MacroManager, readMacroAsync } from "../utils/macro/MarcoManager";

import { getRoomBuildConfiguration } from "../utils/macro/RoomConfigurationBuilder";

const publishGuid = GuidFactory.newGuid();
const log = getNewLogger(publishGuid);

const createMacro = async (e) => {
  log.info('Runnining webpack for: %s', e.roomInfo.NormalizedName);
  const stats = await webPackPromise(e.c);

  if (stats.hasErrors()) {
    console.log(stats);
    return false;
  }

  log.info('Webpack script was successfull for: %s', e.roomInfo.NormalizedName);
  return true;
};

const processMacroAsync = async (e) => {
  const { Ip, CiscoUser, CiscoPassword, NormalizedName, path } = e.roomInfo;
  const macro = await readMacroAsync(path);
  const m = new MacroManager(Ip, CiscoUser, CiscoPassword, log);

  await m.sendMacroAsync("RoomAutomation_" + NormalizedName, macro);
  await m.restartMacrosAsync();

  return;
};

const process = async (options) => {
  log.info('Process started');

  const rooms = options.rooms;
  
  log.info('Get room configurations');
  const confs = getRoomBuildConfiguration(rooms, publishGuid, options.minify);

  log.info('Rooms to configure: %o', rooms.map(e => e.NormalizedName));

  for (let index = 0; index < confs.length; index++) {
    const element = confs[index];
    let name = element.roomInfo.NormalizedName;
    log.info('Processing room: %s', name);

    // create macro at file system
    await createMacro(element);
    

    if (options.publish) {
      log.info('Publishing room %s on the remote', name);
      // publish macro on remote
      await processMacroAsync(element);
      log.info('Done publishing room %s on the remote', name);
    }
    
    log.info('Done processing %s', name);
  }
};

export default process;
