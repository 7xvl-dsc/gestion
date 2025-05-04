
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Mettre un membre en timeout')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur à mettre en timeout')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('minutes')
        .setDescription('Durée du timeout en minutes')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MODERATE_MEMBERS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const member = interaction.options.getMember('utilisateur');
    const minutes = interaction.options.getInteger('minutes');
    
    try {
      await member.timeout(minutes * 60 * 1000);
      await interaction.reply(`${member.user.tag} a été mis en timeout pendant ${minutes} minutes.`);
    } catch (error) {
      await interaction.reply('Impossible de mettre ce membre en timeout.');
    }
  },
};
