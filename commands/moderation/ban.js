
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un membre')
    .addUserOption(option =>
      option
        .setName('utilisateur')
        .setDescription('L\'utilisateur à bannir')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const member = interaction.options.getMember('utilisateur');
    
    try {
      await member.ban();
      await interaction.reply(`${member.user.tag} a été banni.`);
    } catch (error) {
      await interaction.reply('Impossible de bannir ce membre.');
    }
  },
};
