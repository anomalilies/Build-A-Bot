import { MessageEmbed } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";

import { colour } from "../../config/config.json";

export default class PingCommand extends Command {
  constructor(client: CommandoClient) {
    super(client, {
      name: "ping",
      group: "fun",
      memberName: "ping",
      description: "Pong!",
    });
  }

  async run(message: CommandoMessage) {
    const embed = new MessageEmbed({
      author: { name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) },
      description: `Pong! 🏓`,
      color: colour,
    });

    return await message.channel.send(embed);
  }
}
