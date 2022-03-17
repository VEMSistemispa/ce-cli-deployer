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


