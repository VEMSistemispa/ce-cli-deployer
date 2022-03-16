const jsaxpi = require("jsxapi");
const fs = require("fs");

async function readMacroAsync(file, log) {
  var text = "";

  try {
    text = fs.readFileSync(file, "utf8");
  } catch (e) {
    log && log.error("Error:", e.stack);
  }

  return text;
}

class MacroManager {
  constructor(ip, user, pwd, log) {
    this.ip = ip;
    this.user = user;
    this.pwd = pwd;
    this.log = log;
  }

  async sendMacroAsync(name, macro) {
    // TODO: gestire whitelist hostname sala, nel caso in cui l'host name non sia valido
    // viene sollevato un: URL not allowed by rule

    const xapi = jsaxpi.connect("wss://" + this.ip, {
      username: this.user,
      password: this.pwd,
    });

    try {
      await xapi.Command.Macros.Macro.Get({ Name: name });
      const deactivate = await xapi.Command.Macros.Macro.Deactivate({
        Name: name,
      });
      this.log.info("DEACTIVATED ", deactivate);
    } catch (error) {
      this.log.info("MACRO FOR " + name + " TILL HAVE TO BE CREATED", error);
    }

    try {
      const status = await xapi.Command.Macros.Macro.Save({
        Name: name,
        Overwrite: true,
        body: macro,
      });

      this.log.info("STATUS SAVE: " + status);
    } catch (error) {
      this.log.info("MACRO FOR " + name + " SHOULD HAVE BEEN PUBLISHED", error);
    }

    try {
      await xapi.Command.Macros.Macro.Get({ Name: name });
      const activate = await xapi.Command.Macros.Macro.Activate({ Name: name });
      this.log.info("STATUS ACTIVATE: " + activate.status);
    } catch (error) {
      this.log.info(
        "MACRO FOR " + name + " HAS NOT BEEN ACTIVATED DUE TO AN ERROR", error
      );
    }

    xapi.close();
  }

  async restartMacrosAsync(){
    const xapi = jsaxpi.connect("wss://" + this.ip, {
      username: this.user,
      password: this.pwd,
    });

    try {
      // restartiamo tutte le macro
      const restart = await xapi.Command.Macros.Runtime.Restart({});
      this.log.info("MACROS RESTARTED ON TARGET SITE", restart);

    } catch (error) {
      this.log.info("CAN'T RESTART MACROS", error);
    }
    
    xapi.close();
  }
}

module.exports = {
    MacroManager: MacroManager,
    readMacroAsync: readMacroAsync,
};
