import arg from "arg";
import inquirer from "inquirer";
import { macro } from ".";
import path from "path";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      // skips everything and keep default values defined below
      "--yes": Boolean,

      // if set to true it publish the macro to the remote station
      "--publish": Boolean,

      // if set to true minify the code
      "--minify": Boolean,

      // file json with the stations infos you want to publish on
      "--source": String,
      "-s": "--source",
      "-m": "--minify",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skip: args["--yes"] || false,
    publish: args["--publish"] || false,
    minify: args["--minify"] || false,
    source: args["--source"] || false,
  };
}

async function promptForMissingOptions(options) {
  if (options.skip) {
    return {
      options,
    };
  }

  const questions = [];
  if (!options.source) {
    questions.push({
      type: "input",
      name: "source",
      message: "File with room data",
      default: path.join(__dirname, "../", "/data/rooms.json"),
    });
  }

  if (!options.publish) {
    questions.push({
      type: "confirm",
      name: "publish",
      message: "Would you like to publish script to the remote",
      default: false,
    });
  }

  if (!options.minify) {
    questions.push({
      type: "confirm",
      name: "minify",
      message: "Would you like to minify the script?",
      default: false,
    });

  }

  const answers = await inquirer.prompt(questions);
  
  return {
    ...options,
    source: options.source || answers.source,
    publish: options.publish || answers.publish,
    minify: options.minify || answers.minify
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await macro(options);
  process.exit(1)
}
