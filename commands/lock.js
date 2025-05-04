
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Verrouiller/déverrouiller un salon')
    .addChannelOption(option =>
      option.setName('salon')
        .setDescription('Le salon à verrouiller/déverrouiller')
        .setRequired(true))
    .addBooleanOption(option =>
      option.setName('verrouiller')
        .setDescription('true pour verrouiller, false pour déverrouiller')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const channel = interaction.options.getChannel('salon');
    const lock = interaction.options.getBoolean('verrouiller');
    
    try {
      await channel.permissionOverwrites.edit(interaction.guild.roles.everyone, {
        SendMessages: !lock
      });
      
      await interaction.reply(
        lock ? 
        `Le salon ${channel} a été verrouillé.` :
        `Le salon ${channel} a été déverrouillé.`
      );
    } catch (error) {
      await interaction.reply('Impossible de modifier les permissions du salon.');
    }
  },
};
