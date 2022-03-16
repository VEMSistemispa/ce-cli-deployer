const pino = require('pino');
let logger = null;

export const getNewLogger = (guid) => {
  if (logger) {
    return logger;
  } else {
    var date = new Date().toISOString().substring(0, 17).replace(/[^a-zA-Z0-9 ]/g, "");
    const transport = pino.transport({
      targets: [
        {
          target: 'pino-pretty'
        },
        {
          target: 'pino/file',
          options: { destination: `./logs/${date}_${guid}.log` }
        }
      ]
    });

    logger = pino(transport);
    return logger;
  }
};

