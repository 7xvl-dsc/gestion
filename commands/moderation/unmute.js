
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Retirer le timeout d\'un membre')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur à démuter')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MODERATE_MEMBERS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const member = interaction.options.getMember('utilisateur');
    
    try {
      await member.timeout(null);
      await interaction.reply(`${member.user.tag} n'est plus en timeout.`);
    } catch (error) {
      await interaction.reply('Impossible de retirer le timeout de ce membre.');
    }
  },
};
