import { CommandoClient } from "discord.js-commando";

export default async function (client: CommandoClient) {
  let plural = "";
  if (client.guilds.cache.size > 1) {
    plural = "s";
  }

  client.user.setActivity(`${client.guilds.cache.size} server${plural}!`, { type: "WATCHING" });

  console.log(`${client.user.tag} activated!`);
  client.guilds.cache.forEach((guild) => {
    console.log(`${guild.name} | ${guild.id}`);
  });
}
