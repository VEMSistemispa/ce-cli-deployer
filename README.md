# Cisco Telepresence macro deployer CLI

**CLI tool** for Cisco collaboration endpoint macro deployment

# Technical challenge

The macros within Cisco's system for Telepresence rooms represent a great opportunity for companies to create **custom software** for a variety of needs. However, managing and deploying macros is neither *quick nor easy*, especially if you need to configure **custom features** based on the room where the telepresence station is located.

# Proposed solution

A command line interface software that is able to deploy a javascript macro **on all** Cisco Telepresence stations within the company. 

**Automating the process** based on a configuration file that holds all the information we need. 

The CLI will also take care of creating a **bundle of all** the javascript files necessary for the correct execution of the macro, allowing the developer to create an architecturally correct software and giving the possibility to use also **external libraries**.

# Technologies and tools

Main technologies:

- [Cisco jsxapi](https://github.com/cisco-ce/jsxapi)
- [NodeJs](https://nodejs.org/it/)
- [yarn](https://yarnpkg.com/)

Main npm packages:

- [webpack](https://webpack.js.org/)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [chalk](https://github.com/chalk/chalk)
- [pinojs](https://github.com/pinojs/pino)

# Installation

open cmd:

    git clone https://github.com/VEMSistemispa/ce-cli-deployer.git
    cd ce-cli-deployer
    yarn install

> If you don't have yarn installed you may follow [this guide](https://yarnpkg.com/getting-started/install) to install it

To start the project after installing the packages with yarn:

    npm start

This will start the script and you will be prompted with questions to configure the current deployment

> Don't delete the **logs** folder. Pino need it to run correctly. You may be prompted with `process exited with 1` otherwise

# Ho2 to use

The repo provide the structure to develop your own macro. The folder structure: 

    .
    ├── cli                    # the cli implementaion         
    ├── data
    │   ├── rooms.json         # rooms configuration
    ├── logs                   # needed for pinojs to work
    ├── src                    # your macro implementation
    │   ├── environmentData.js # here you have your injected configuration
    │   ├── index.js           # entry point for the macro! this will be built by webpack
    ├── utils                  # utils for macro deployer
    ├── execute.js             # entry point of the cli
    └── README.md

### Configuration

Inside `data\rooms.json` there is the structure used by the macro deployer for room configuration. 

```javascript
[
    {
        // if we should consider this room in this build
        "deploy": true,

        // readable name of the room 
        // (will be injected inside the script)
        "name": "Room beautiful name",

        // room identifier
        "normalizedName": "room_name_or_id",

        // Cisco Telepresence station data
        // DO NOT STORE REAL CREDENTIALS INSIDE A REPO
        "ip": "1.1.1.1",
        "ciscoUser": "JhonDoe",
        "ciscoPassword": "SuperSecretPassword",

        // Fields you can customize to inject inside the script
        "additionalDetails": {
            "field1": true,
            "field2": false
        }
    }
]

```

You can customize everything inside `additionalDetails` to suit your own needs.

We can configure next webpack to take those details and inject them inside the `process.env`, you can do that inside `\src\environmentData.js` there's a method you can customize:

```javascript
    // inside environment configuration we can put every custom field we want
    export const  getCustomRoomEnvironmentData = (element, publishGuid) => {
        return {
            PUBLISH_IDENTIFIER: publishGuid,
            ROOM_NAME: element.normalizedName,

            // those fields are the same one that are passed from your configuration file
            FIELD_1: element.additionalDetails.field1,
            FIELD_2: element.additionalDetails.field2,
        };
    }
```

`FIELD_1` and `FIELD_2` are custom fields we take from our `additionalDetails` object inside our configuration file.


### Develop your macro

Inside `\src\index.js` you can develop your custom macro. In the same folder you'll find a file named `environmentData.js`.

```javascript
    export const PUBLISH_IDENTIFIER = process.env.PUBLISH_IDENTIFIER;
    export const ROOM_NAME = process.env.ROOM_NAME;

    export const AMAZING_FEATURE_ENABLED_ONE = process.env.FIELD_1;
    export const AMAZING_FEATURE_ENABLED_TWO = process.env.FIELD_2;

    export const dev = process.env.NODE_ENV != 'production';
```

Inside this file you'll find some standard variables and also you can configure your own based on what you have inside the `additionalDetails`. In this particular example we have:

```javascript
    export const AMAZING_FEATURE_ENABLED_ONE = process.env.FIELD_1;
    export const AMAZING_FEATURE_ENABLED_TWO = process.env.FIELD_2;
```

Those are plain simple javscript const so we can use them inside our macro inside `\src\index.js`:

```javascript
    setInterval(() => {
        // We don't see it because we pass field2 equal to false
        if (AMAZING_FEATURE_ENABLED_TWO) {
            displayRoomOsAlert(ROOM_NAME, "The feature number two is disabled");
        }
    }, 5000);

    setInterval(() => {
        // We see it because we pass field1 equal to true
        if (AMAZING_FEATURE_ENABLED_ONE) {
            displayRoomOsAlert(ROOM_NAME, "The feature number one is enabled!!!");
        }
    }, 5000);
```
> Remember to import your own consts inside the `index.js` file!

# Deploy your macro

Once we have developed the macro and configured the project to inject the correct variables we can run the software that will deploy the macro to the Cisco Telepresence.

Open the cmd inside the project:

    npm start

> This is just a shorthand to run `execute.js`

At this point you'll be prompted for some information:

    ? File with room data (\..\data\rooms.json)
    ? Would you like to publish script to the remote (y/N)
    ? Would you like to minify the script? (y/N)

> By default the path to the configuration is inside data\room.js but you can customize it.

> The default answers to second and third questions are `No`.

Eventually you can also run the script with `--yes` to skip all the question and execute everything with the default configuration:

    npm start --yes
    or
    node execute.js --yes

At this point we will find the logs inside the folder and all the info will be also logged inside the console:

    [1647510321368] INFO (18312 on USERNAME): Process started

    [1647510321369] INFO (18312 on USERNAME): Rooms to configure: ["Room beautiful name 0","Room beautiful name 1"]
    
    [1647510321369] INFO (18312 on USERNAME): Processing room: Room beautiful name 0
    
    [1647510321369] INFO (18312 on USERNAME): Runnining webpack for: Room beautiful name 0

    ... Omitted for brevity