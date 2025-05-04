
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Avertir un membre')
    .addUserOption(option =>
      option.setName('utilisateur')
        .setDescription('L\'utilisateur à avertir')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('raison')
        .setDescription('Raison de l\'avertissement')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MODERATE_MEMBERS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const member = interaction.options.getMember('utilisateur');
    const reason = interaction.options.getString('raison');
    
    try {
      await interaction.reply(`${member.user.tag} a été averti pour: ${reason}`);
      await member.send(`Vous avez reçu un avertissement sur ${interaction.guild.name} pour: ${reason}`);
    } catch (error) {
      await interaction.reply('Impossible d\'avertir ce membre.');
    }
  },
};
