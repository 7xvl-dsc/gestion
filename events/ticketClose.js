
const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId !== 'close_ticket') return;

    await interaction.reply('Fermeture du ticket dans 5 secondes...');
    setTimeout(() => interaction.channel.delete(), 5000);
  }
};
