import chalk from 'chalk';
import fs from 'fs';
import process from './macro.deploy';


export async function macro(options) {
    console.log(options);
    let rooms = [];

    try {
        
        const data = fs.readFileSync(options.source);
        rooms = JSON.parse(data);    

    } catch (error) {
        console.error("%s Can't read the room file", chalk.red.bold('ERROR'));
    }
    
    options = {
        ...options,
        rooms: rooms
    }
    
    await process(options);
}