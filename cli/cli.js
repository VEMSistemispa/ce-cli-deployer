import arg from "arg";
import inquirer from "inquirer";
import { macro } from ".";
import path from "path";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--yes": Boolean,
      "--publish": Boolean,
      "--minify": Boolean,
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
    minify: args["--minify"] || true,
    source: args["--source"] || false,
    //template: args._[0],
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

  if (!options.source) {
    questions.push({
      type: "confirm",
      name: "publish",
      message: "Publish script to the remote",
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  
  return {
    ...options,
    source: options.source || answers.source,
    publish: options.publish || answers.publish,
  };
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await macro(options);
  process.exit(1)
}
