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

> NB: if you don't have yarn installed you may follow [this guide](https://yarnpkg.com/getting-started/install) to install it

To start the project after installing the packages with yarn:

    npm start

This will start the script and you will be prompted with questions to configure the current deployment

> NB: don't delete the **logs** folder. Pino need it to run correctly. You may be prompted with `process exited with 1` otherwise

# Usage

The repo provide the structure to develop your own macro. The folder structure: 

    .
    ├── cli                    # the cli implementaion         
    ├── data
    │   ├── rooms.json         # rooms configuration
    ├── logs                   # needed for pinojs to work
    ├── src                    # your macro implementation
    │   ├── EnvironmentData.js # here you have your inject configuration
    │   ├── index.js           # entry point for the macro! this will be built by webpack
    ├── utils                  # utils for macro deployer
    ├── execute.js             # entry point of the cli
    └── README.md

Inside `data\rooms.json` there is the structure used by the macro deployer for room configuration. 

```json
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