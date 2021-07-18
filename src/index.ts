// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import fs from "fs";
import path from "path";

import { ClientEvents } from "discord.js";
import { CommandoClient } from "discord.js-commando";

import { prefix } from "./config/config.json";

(async () => {
  // Commando
  const client = new CommandoClient({
    owner: "228880116699103232", // Your user ID goes here
    commandPrefix: prefix,
    disableMentions: "everyone",
    partials: ["REACTION", "MESSAGE"],
  });

  // Events
  const eventFolderPath = __dirname + "/events/";

  fs.readdir(eventFolderPath, async (err, files) => {
    if (err) return console.error(err);
    for (const file of files) {
      const event = await import(eventFolderPath + file);
      const eventName = file.split(".")[0];
      client.on(<keyof ClientEvents>eventName, event.default.bind(null, client));
    }
  });

  client.registry
    .registerGroups([
      ["fun", "Fun"],
      ["util", "Utility"],
      ["commands", "Command Debug"],
    ])
    .registerDefaultTypes()
    .registerDefaultCommands({ ping: false })
    .registerCommandsIn({
      filter: /^([^.].*)\.(js|ts)$/,
      dirname: path.join(__dirname, "./commands"),
    });

  // Start
  await client.login(process.env.CLIENT_TOKEN);
})();
