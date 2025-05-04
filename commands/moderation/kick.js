
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulser un membre')
    .addUserOption(option =>
      option
        .setName('utilisateur')
        .setDescription('L\'utilisateur à expulser')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const member = interaction.options.getMember('utilisateur');
    
    try {
      await member.kick();
      await interaction.reply(`${member.user.tag} a été expulsé.`);
    } catch (error) {
      await interaction.reply('Impossible d\'expulser ce membre.');
    }
  },
};
