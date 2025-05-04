
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Définir le mode lent d\'un salon')
    .addIntegerOption(option =>
      option.setName('secondes')
        .setDescription('Délai en secondes (0 pour désactiver)')
        .setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has('MANAGE_CHANNELS')) {
      return interaction.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    const seconds = interaction.options.getInteger('secondes');
    
    try {
      await interaction.channel.setRateLimitPerUser(seconds);
      if (seconds === 0) {
        await interaction.reply('Le mode lent a été désactivé.');
      } else {
        await interaction.reply(`Le mode lent a été défini sur ${seconds} secondes.`);
      }
    } catch (error) {
      await interaction.reply('Impossible de modifier le mode lent.');
    }
  },
};
